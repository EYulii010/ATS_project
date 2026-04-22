import { useState } from "react"
import { ArrowLeft, Mail, Loader2, CheckCircle2, Users } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"

export default function EquipoPage({ onBack }) {
  const [email,    setEmail]    = useState("")
  const [enviando, setEnviando] = useState(false)
  const [exito,    setExito]    = useState(null)
  const [error,    setError]    = useState("")

  const token = localStorage.getItem("applik_token")

  const handleInvitar = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError("")
    setExito(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/v1/auth/invitations/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "Error al enviar la invitación")
      setExito(email)
      setEmail("")
    } catch (err) {
      setError(err.message ?? "No se pudo enviar la invitación. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="space-y-6 p-6 bg-applik-bg min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Equipo de Reclutadores</h1>
          <p className="text-sm text-slate-400">Invita nuevos reclutadores a tu empresa</p>
        </div>
      </div>

      <div className="max-w-lg space-y-6">

        {/* Info card */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <Users className="size-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-700 leading-relaxed">
            Al enviar una invitación, el reclutador recibirá un correo con un enlace para crear su cuenta.
            El enlace expira en 48 horas.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Invitar reclutador</h2>
          <form onSubmit={handleInvitar} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="correo@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            {exito && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5">
                <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                <p className="text-sm text-green-700">
                  Invitación enviada a <span className="font-medium">{exito}</span>
                </p>
              </div>
            )}

            <Button type="submit" variant="primary" disabled={enviando} className="w-full">
              {enviando
                ? <><Loader2 className="size-3.5 animate-spin mr-1" /> Enviando...</>
                : "Enviar invitación"
              }
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}
