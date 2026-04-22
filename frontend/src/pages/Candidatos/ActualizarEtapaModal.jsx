import { useState } from "react"
import { ArrowLeft, CheckCircle2, Clock, Sparkles, AlertTriangle, Info } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"
import { STAGES } from "@/components/ui/StageBadge"

const stageDescriptions = {
  "Recibido":        "Candidato recién recibido, pendiente de revisión inicial",
  "Analizado":       "CV y perfil revisados",
  "Seleccionado":    "Candidato cumple con los requisitos principales",
  "Bajo Entrevista": "Candidato en proceso activo de entrevistas",
  "Oferta Enviada":  "Propuesta laboral ha sido enviada al candidato",
  "Contratado":      "El candidato ha aceptado la oferta y fue contratado",
}

const stageColors = {
  "Recibido":        "text-slate-500",
  "Analizado":       "text-blue-dark",
  "Seleccionado":    "text-purple-dark",
  "Bajo Entrevista": "text-purple-light",
  "Oferta Enviada":  "text-blue-light",
  "Contratado":      "text-teal-dark",
}

// Días promedio por etapa (mock — reemplazar con endpoint)
const tiemposPorEtapa = [
  { etapa: "Recibido",        dias: 2  },
  { etapa: "Analizado",       dias: 4  },
  { etapa: "Seleccionado",    dias: 9  },
  { etapa: "Bajo Entrevista", dias: 12 },
  { etapa: "Oferta Enviada",  dias: 3  },
  { etapa: "Contratado",      dias: 1  },
]
const maxDias = Math.max(...tiemposPorEtapa.map((t) => t.dias))

function colorBarra(dias) {
  if (dias <= 4)  return "bg-teal-400"
  if (dias <= 7)  return "bg-amber-400"
  return "bg-red-400"
}

const sugerencias = [
  {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-50 border-red-100",
    titulo: "Cuello de botella: Bajo Entrevista",
    texto: "12 días promedio. Considera asignar un segundo entrevistador para reducir tiempos de espera.",
  },
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-100",
    titulo: "Demora en Seleccionado (9 días)",
    texto: "Establece un máximo de 5 días para mover candidatos seleccionados a entrevistas.",
  },
  {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100",
    titulo: "Riesgo de perder talento",
    texto: "Con 21 días promedio hasta la oferta, candidatos pueden recibir otras propuestas.",
  },
]

function fechaIngreso(etapa) {
  const hoy = new Date(2026, 3, 20)
  const offsets = { "Recibido": 10, "Analizado": 7, "Seleccionado": 5, "Bajo Entrevista": 3, "Oferta Enviada": 1, "Contratado": 0 }
  const d = new Date(hoy)
  d.setDate(hoy.getDate() - (offsets[etapa] ?? 0))
  return d.toLocaleDateString("es-NI", { day: "numeric", month: "short", year: "numeric" })
}

export default function ActualizarEtapaModal({ candidato, onClose, onConfirm }) {
  const [etapaSeleccionada, setEtapa] = useState(candidato.etapa)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100">
          <button onClick={onClose} className="mb-3 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600">
            <ArrowLeft className="size-4" /> Volver
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Actualizar Etapa</h2>
              <p className="text-sm text-slate-400">Selecciona una etapa en el proceso de reclutamiento</p>
            </div>
            {/* Candidato info */}
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 shrink-0">
              <Avatar name={candidato.nombre} size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-800">{candidato.nombre}</p>
                <p className="text-xs text-slate-400">Aplicante ({candidato.posicion})</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-xs text-slate-400">Etapa Actual:</p>
                <p className={`text-sm font-semibold ${stageColors[candidato.etapa]}`}>{candidato.etapa}</p>
                <p className="text-xs text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="size-3" /> desde {fechaIngreso(candidato.etapa)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body — dos columnas */}
        <div className="flex flex-col md:flex-row max-h-[70vh]">

          {/* Columna izquierda: selector de etapa */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2 border-r border-slate-100">
            {STAGES.map((stage) => {
              const isActual   = stage === candidato.etapa
              const isSelected = stage === etapaSeleccionada
              return (
                <button
                  key={stage}
                  onClick={() => setEtapa(stage)}
                  className={`w-full rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-purple-dark bg-purple-dark/5"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isSelected
                      ? <CheckCircle2 className="size-4 text-purple-dark shrink-0" />
                      : <div className="size-4 rounded-full border-2 border-slate-300 shrink-0" />
                    }
                    <span className={`text-sm font-medium ${stageColors[stage]}`}>{stage}</span>
                    {isActual && (
                      <span className="rounded-full bg-teal-light/20 px-2 py-0.5 text-xs text-teal-dark">Actual</span>
                    )}
                  </div>
                  <p className="ml-6 text-xs text-slate-400 mt-0.5">{stageDescriptions[stage]}</p>
                </button>
              )
            })}
          </div>

          {/* Columna derecha: diagrama + sugerencias IA */}
          <div className="w-full md:w-72 flex flex-col overflow-y-auto bg-slate-50">

            {/* Diagrama de tiempos */}
            <div className="p-5 border-b border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-3">Días promedio por etapa</p>
              <div className="space-y-2">
                {tiemposPorEtapa.map(({ etapa, dias }) => (
                  <div key={etapa}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-slate-500 truncate max-w-[110px]">{etapa}</span>
                      <span className={`text-xs font-semibold ${dias > 7 ? "text-red-500" : dias > 4 ? "text-amber-500" : "text-teal-600"}`}>
                        {dias}d
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full transition-all ${colorBarra(dias)}`}
                        style={{ width: `${(dias / maxDias) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-slate-400"><span className="size-2 rounded-full bg-teal-400 inline-block"/>≤ 4d</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><span className="size-2 rounded-full bg-amber-400 inline-block"/>5–7d</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><span className="size-2 rounded-full bg-red-400 inline-block"/>{">"} 7d</span>
              </div>
            </div>

            {/* Sugerencias IA */}
            <div className="p-5 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-4 text-violet-500" />
                <p className="text-xs font-semibold text-slate-700">Sugerencias IA</p>
              </div>
              <div className="space-y-2.5">
                {sugerencias.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className={`rounded-xl border p-3 ${s.bg}`}>
                      <div className="flex items-start gap-2">
                        <Icon className={`size-3.5 shrink-0 mt-0.5 ${s.color}`} />
                        <div>
                          <p className={`text-xs font-semibold ${s.color}`}>{s.titulo}</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.texto}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-white">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" className="flex-1" onClick={() => onConfirm(etapaSeleccionada)}>
            Confirmar
          </Button>
        </div>

      </div>
    </div>
  )
}
