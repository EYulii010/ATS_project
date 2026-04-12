import { useState } from "react"
import { ArrowLeft, RefreshCw, Briefcase, Calendar, UserPlus, UserX } from "lucide-react"

const tiposFiltro = ["Todos", "Cambio de Etapa", "Nueva Vacante", "Entrevista", "Nuevo Candidato", "Descartado"]

const configuracionTipo = {
  "Cambio de Etapa":  { icon: RefreshCw, color: "text-blue-dark",   bg: "bg-blue-dark/10"   },
  "Nueva Vacante":    { icon: Briefcase, color: "text-purple-dark", bg: "bg-purple-dark/10" },
  "Entrevista":       { icon: Calendar,  color: "text-teal-dark",   bg: "bg-teal-dark/10"   },
  "Nuevo Candidato":  { icon: UserPlus,  color: "text-blue-light",  bg: "bg-blue-light/10"  },
  "Descartado":       { icon: UserX,     color: "text-red-400",     bg: "bg-red-50"         },
}

const actividades = {
  "Hoy": [
    { tipo: "Cambio de Etapa", texto: "Ana Martínez avanzó de etapa Recibido a Analizado",                hora: "10:42 AM" },
    { tipo: "Entrevista",      texto: "Entrevista programada para David Espinoza — Contador Senior",      hora: "09:15 AM" },
    { tipo: "Nuevo Candidato", texto: "Carlos Mendoza aplicó a la posición de Desarrollador Web",         hora: "08:30 AM" },
  ],
  "Ayer": [
    { tipo: "Nueva Vacante",   texto: "Nueva vacante publicada: Marketing Specialist — Depto. Marketing", hora: "04:10 PM" },
    { tipo: "Cambio de Etapa", texto: "Martha Torres avanzó a etapa Seleccionado",                        hora: "02:45 PM" },
    { tipo: "Nuevo Candidato", texto: "Pedro Flores aplicó a la posición de Gerente de Ventas",           hora: "11:20 AM" },
    { tipo: "Descartado",      texto: "Luis Ramírez fue descartado de la posición Contador Senior",       hora: "09:00 AM" },
  ],
  "Esta semana": [
    { tipo: "Nueva Vacante",   texto: "Nueva vacante publicada: Contador Senior — Depto. Finanzas",       hora: "Lun 09:00 AM" },
    { tipo: "Entrevista",      texto: "Entrevista completada con Endy Gonzalez — Gerente de Operaciones", hora: "Lun 03:30 PM" },
    { tipo: "Cambio de Etapa", texto: "Osvaldo Rodriguez avanzó a etapa Bajo Entrevista",                 hora: "Mar 11:00 AM" },
    { tipo: "Nuevo Candidato", texto: "Sofia Castillo aplicó a la posición de Marketing Specialist",      hora: "Mié 10:05 AM" },
    { tipo: "Descartado",      texto: "Roberto Núñez fue descartado de la posición Gerente de Ventas",    hora: "Mié 02:00 PM" },
  ],
}

export default function ActividadRecientePage({ onBack }) {
  const [filtroActivo, setFiltro] = useState("Todos")

  const actividadesFiltradas = Object.entries(actividades).reduce((acc, [grupo, items]) => {
    const filtrados = filtroActivo === "Todos"
      ? items
      : items.filter((item) => item.tipo === filtroActivo)
    if (filtrados.length > 0) acc[grupo] = filtrados
    return acc
  }, {})

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
          <h1 className="text-2xl font-bold text-slate-800">Actividad Reciente</h1>
          <p className="text-sm text-slate-400">Historial completo de actividad en el sistema</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {tiposFiltro.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`rounded-xl border px-4 py-2 text-sm transition-all ${
                filtroActivo === tipo
                  ? "border-blue-dark bg-blue-dark/5 text-blue-dark font-medium"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* Actividades agrupadas */}
        {Object.keys(actividadesFiltradas).length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-400">No hay actividad de este tipo</p>
          </div>
        ) : (
          Object.entries(actividadesFiltradas).map(([grupo, items]) => {
            return (
              <div key={grupo}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{grupo}</p>
                <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                  {items.map((item, i) => {
                    const config = configuracionTipo[item.tipo]
                    const Icon   = config.icon
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0"
                      >
                        <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                          <Icon className={`size-4 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{item.texto}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.tipo}</p>
                        </div>
                        <p className="text-xs text-slate-400 shrink-0">{item.hora}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}

      </div>
    </div>
  )
}
