import { cn } from "@/lib/utils"

const stageConfig = {
  Recibido: {
    label: "Recibido",
    className: "border border-slate-300 text-slate-600 bg-transparent",
  },
  Analizado: {
    label: "Analizado",
    className: "bg-blue-dark text-white border-transparent",
  },
  Seleccionado: {
    label: "Seleccionado",
    className: "bg-teal-light text-white border-transparent",
  },
  "Bajo Entrevista": {
    label: "Bajo Entrevista",
    className: "bg-purple-dark text-white border-transparent",
  },
  "Oferta Enviada": {
    label: "Oferta Enviada",
    className: "bg-blue-light text-white border-transparent",
  },
  Contratado: {
    label: "Contratado",
    className: "bg-teal-dark text-white border-transparent",
  },
}

export function StageBadge({ stage, className }) {
  const config = stageConfig[stage]

  if (!config) return null

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

// Exportamos el config por si otra parte del app necesita la lista de etapas
export const STAGES = Object.keys(stageConfig)
