import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
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

export default function ActualizarEtapaModal({ candidato, onClose, onConfirm }) {
  const [etapaSeleccionada, setEtapa] = useState(candidato.etapa)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Back */}
        <button onClick={onClose} className="mb-4 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600">
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Actualizar Etapa</h2>
          <p className="text-sm text-slate-400">Selecciona una etapa en el proceso de reclutamiento</p>
        </div>

        {/* Candidato info */}
        <div className="mb-5 flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <Avatar name={candidato.nombre} size="sm" />
            <div>
              <p className="text-sm font-medium text-slate-800">{candidato.nombre}</p>
              <p className="text-xs text-slate-400">Aplicante ({candidato.posicion})</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Etapa Actual:</p>
            <p className={`text-sm font-semibold ${stageColors[candidato.etapa]}`}>{candidato.etapa}</p>
          </div>
        </div>

        {/* Stage list */}
        <div className="space-y-2">
          {STAGES.map((stage) => {
            const isActual    = stage === candidato.etapa
            const isSelected  = stage === etapaSeleccionada

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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSelected
                      ? <CheckCircle2 className="size-4 text-purple-dark" />
                      : <div className="size-4 rounded-full border-2 border-slate-300" />
                    }
                    <span className={`text-sm font-medium ${stageColors[stage]}`}>
                      {stage}
                    </span>
                    {isActual && (
                      <span className="rounded-full bg-teal-light/20 px-2 py-0.5 text-xs text-teal-dark">
                        Actual
                      </span>
                    )}
                  </div>
                </div>
                <p className="ml-6 text-xs text-slate-400">{stageDescriptions[stage]}</p>
              </button>
            )
          })}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onConfirm(etapaSeleccionada)}
          >
            Confirmar
          </Button>
        </div>

      </div>
    </div>
  )
}
