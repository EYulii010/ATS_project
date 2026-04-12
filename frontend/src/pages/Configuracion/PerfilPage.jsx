import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"

export default function PerfilPage({ onBack }) {
  const [nombre,           setNombre]           = useState("Cristiana Espinoza")
  const [contrasena,       setContrasena]       = useState("")
  const [confirmar,        setConfirmar]        = useState("")
  const [verContrasena,    setVerContrasena]    = useState(false)
  const [verConfirmar,     setVerConfirmar]     = useState(false)
  const [error,            setError]            = useState("")
  const [guardado,         setGuardado]         = useState(false)

  const handleGuardar = () => {
    if (contrasena && contrasena !== confirmar) {
      setError("Las contraseñas no coinciden")
      return
    }
    setError("")
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div className="min-h-screen bg-applik-bg p-6">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Perfil</h1>
          <p className="text-sm text-slate-400">Administra las preferencias de tu cuenta y sistema</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Avatar */}
          <div className="rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center gap-4">
            <Avatar name="Cristiana Espinoza" size="lg" className="size-28 text-3xl" />
            <p className="font-semibold text-slate-800">Cristiana Espinoza</p>
            <Button variant="primary" size="sm" className="w-full">
              Editar foto de perfil
            </Button>
          </div>

          {/* Campos */}
          <div className="space-y-5 lg:col-span-2">

            {/* Nombre */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Empresa</label>
              <input
                value="Keiser University"
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Correo Electrónico</label>
              <input
                value="c.espinoza@gmail.com"
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                Nueva Contraseña
                <span className="text-xs font-normal text-slate-400">(dejar vacío para no cambiar)</span>
              </label>
              <div className="relative">
                <input
                  type={verContrasena ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => { setContrasena(e.target.value); setError("") }}
                  placeholder="••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-11 text-sm text-slate-800 focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
                />
                <button
                  type="button"
                  onClick={() => setVerContrasena(!verContrasena)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {verContrasena ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={verConfirmar ? "text" : "password"}
                  value={confirmar}
                  onChange={(e) => { setConfirmar(e.target.value); setError("") }}
                  placeholder="••••••••••"
                  className={`w-full rounded-xl border px-4 py-2.5 pr-11 text-sm text-slate-800 focus:outline-none focus:ring-2 bg-white ${
                    error
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      : "border-slate-200 focus:border-blue-dark focus:ring-blue-dark/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setVerConfirmar(!verConfirmar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {verConfirmar ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
            </div>

            <div className="flex items-center justify-end gap-3">
              {guardado && (
                <p className="text-sm text-teal-dark font-medium">✓ Cambios guardados</p>
              )}
              <Button variant="primary" size="md" onClick={handleGuardar}>
                Guardar cambios
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
