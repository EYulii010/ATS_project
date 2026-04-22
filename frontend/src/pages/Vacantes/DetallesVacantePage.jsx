import { useState } from "react"
import { ArrowLeft, Tag, Pencil, Globe, Link, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

function diasDesde(fecha) {
  const diff = Date.now() - new Date(fecha).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export default function DetallesVacantePage({ vacante, onBack, onEdit, onStatusChange }) {
  const [publicando,     setPublicando]     = useState(false)
  const [copiado,        setCopiado]        = useState(false)
  const [errorPublicar,  setErrorPublicar]  = useState("")
  const token = localStorage.getItem("applik_token")

  if (!vacante) return null

  const dias = diasDesde(vacante.createdAt)
  const reqLines = vacante.requirements
    ? vacante.requirements.split("\n").filter(Boolean)
    : []

  const handlePublicar = async () => {
    setPublicando(true)
    setErrorPublicar("")
    try {
      const res = await fetch(`${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/jobs/${vacante.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "published" }),
      })
      if (res.ok) {
        onStatusChange?.()
      } else if (res.status === 401) {
        setErrorPublicar("Sesión expirada — cierra sesión y vuelve a entrar.")
      } else {
        setErrorPublicar("No se pudo publicar. Intenta de nuevo.")
      }
    } catch {
      setErrorPublicar("Error de red. Verifica tu conexión.")
    } finally {
      setPublicando(false)
    }
  }

  const handleCopiarLink = () => {
    const url = `${window.location.origin}/trabajo/${vacante.public_token}`
    navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="min-h-screen bg-applik-bg p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Header card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-teal-light/20 px-3 py-0.5 text-xs text-teal-dark font-medium">
                {vacante.status === "published"
                  ? `Activa hace ${dias} días`
                  : vacante.status === "draft"
                  ? "Borrador"
                  : vacante.status === "paused"
                  ? "Pausada"
                  : "Cerrada"}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{vacante.title}</h1>
              {vacante.Department?.name && (
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Tag className="size-3.5" />{vacante.Department.name}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              {vacante.status !== "published" && (
                <div className="flex flex-col items-end gap-1">
                  <Button variant="primary" size="md" onClick={handlePublicar} disabled={publicando} className="w-full sm:w-auto shrink-0">
                    <Globe /> {publicando ? "Publicando..." : "Publicar"}
                  </Button>
                  {errorPublicar && <p className="text-xs text-red-500">{errorPublicar}</p>}
                </div>
              )}
              {vacante.status === "published" && (
                <Button variant="outline" size="md" onClick={handleCopiarLink} className="w-full sm:w-auto shrink-0">
                  {copiado ? <><Check className="size-4" /> Copiado</> : <><Link className="size-4" /> Copiar link</>}
                </Button>
              )}
              <Button variant="outline" size="md" onClick={onEdit} className="w-full sm:w-auto shrink-0">
                <Pencil /> Editar vacante
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Descripción</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{vacante.description}</p>
          </section>

          {reqLines.length > 0 && (
            <section className="space-y-2">
              <h2 className="font-semibold text-slate-800">Requisitos</h2>
              <ul className="space-y-1.5">
                {reqLines.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-dark" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Rango Salarial</h2>
            <p className="text-sm font-medium text-slate-700">
              {Number(vacante.salary_min).toLocaleString("es")} – {Number(vacante.salary_max).toLocaleString("es")} {vacante.currency ?? "NIO"} mensuales
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
