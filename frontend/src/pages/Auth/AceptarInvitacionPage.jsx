import { useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import Logo from "@/components/ui/Logo"
import { useAuth } from "@/context/AuthContext"

export default function AceptarInvitacionPage() {
  const [searchParams]   = useSearchParams()
  const navigate         = useNavigate()
  const { login }        = useAuth()

  const token = searchParams.get("token") ?? ""
  const email = searchParams.get("email") ?? ""

  const [firstName,      setFirstName]      = useState("")
  const [lastName,       setLastName]       = useState("")
  const [password,       setPassword]       = useState("")
  const [mostrarPass,    setMostrarPass]    = useState(false)
  const [ley787,         setLey787]         = useState(false)
  const [loading,        setLoading]        = useState(false)
  const [error,          setError]          = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ley787) { setError("Debes aceptar los términos de privacidad para continuar."); return }
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/v1/auth/invitations/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password,
          first_name: firstName,
          last_name:  lastName,
          law_787_accepted: ley787,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "Error al activar la cuenta")

      await login(data.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message ?? "No se pudo activar la cuenta. El enlace puede haber expirado.")
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center space-y-3">
          <p className="text-slate-500 text-sm">Enlace de invitación inválido o incompleto.</p>
          <Link to="/login" className="text-sm text-violet-600 hover:underline">Ir a iniciar sesión</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Panel izquierdo */}
      <div className="hidden md:flex md:w-[55%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 60%, #1e3a65 100%)" }}>
        <div className="flex items-center gap-2.5">
          <Logo className="w-9 h-9" />
          <span className="text-white text-xl font-bold tracking-wide">APPLIK</span>
        </div>
        <div className="space-y-4 flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight w-full">
            Únete al equipo<br />de reclutamiento
          </h1>
          <p className="text-purple-200 text-sm lg:text-base leading-relaxed max-w-sm">
            Has sido invitado como reclutador. Crea tu cuenta para empezar a gestionar candidatos.
          </p>
        </div>
        <p className="text-purple-300 text-xs">© 2026 Applik. Plataforma de reclutamiento impulsada por IA.</p>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10 sm:px-10">

        <div className="flex md:hidden flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 100%)" }}>
            <div style={{ filter: "brightness(0) invert(1)" }}><Logo className="w-9 h-9" /></div>
          </div>
          <span className="text-slate-900 text-xl font-bold tracking-wide">APPLIK</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center md:text-left">Activa tu cuenta</h2>
          <p className="text-slate-500 text-sm mb-6 text-center md:text-left">
            Serás reclutador en <span className="font-medium text-slate-700">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                <input
                  type="text"
                  placeholder="Ana"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                <input
                  type="text"
                  placeholder="García"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={mostrarPass ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 pr-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                />
                <button type="button" onClick={() => setMostrarPass(!mostrarPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {mostrarPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Ley 787 */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={ley787}
                onChange={(e) => setLey787(e.target.checked)}
                className="mt-0.5 accent-violet-600"
              />
              <span className="text-xs text-slate-500 leading-relaxed">
                Acepto el tratamiento de mis datos personales conforme a la{" "}
                <Link to="/privacidad" className="text-violet-600 hover:underline" target="_blank">
                  Política de Privacidad
                </Link>{" "}
                y la Ley 787 de Nicaragua.
              </span>
            </label>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2">
              {loading
                ? <><Loader2 className="size-4 animate-spin" /> Activando...</>
                : <><CheckCircle2 className="size-4" /> Activar cuenta</>
              }
            </button>
          </form>

          <Link to="/login" className="flex items-center justify-center mt-6 text-sm text-slate-500 hover:text-violet-600 transition-colors">
            Ya tengo cuenta — Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
