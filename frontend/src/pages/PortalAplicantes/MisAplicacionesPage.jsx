import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const aplicaciones = [
  { id: 1, titulo: "Gerente de Ventas",    empresa: "Casa Peñas",  ubicacion: "Managua", fecha: "15/03/2026", estado: "En revisión"         },
  { id: 2, titulo: "Especialista Digital", empresa: "Casa del Cafe", ubicacion: "Managua", fecha: "27/02/2026", estado: "Rechazada"          },
  { id: 3, titulo: "Analista de Datos",    empresa: "Ogilvy",      ubicacion: "Managua", fecha: "05/03/2026", estado: "Entrevista Programada" },
]

const filtros = ["Todas", "En revisión", "Entrevista", "Rechazadas"]

const estadoConfig = {
  "En revisión":           { bg: "bg-blue-50",  text: "text-blue-600"  },
  "Rechazada":             { bg: "bg-red-50",   text: "text-red-400"   },
  "Entrevista Programada": { bg: "bg-teal-50",  text: "text-teal-600"  },
  "Aceptada":              { bg: "bg-green-50", text: "text-green-600" },
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function MisAplicacionesPage() {
  const navigate                        = useNavigate()
  const [filtroActivo, setFiltroActivo] = useState("Todas")

  const lista = aplicaciones.filter((a) => {
    if (filtroActivo === "Todas")       return true
    if (filtroActivo === "En revisión") return a.estado === "En revisión"
    if (filtroActivo === "Entrevista")  return a.estado === "Entrevista Programada"
    if (filtroActivo === "Rechazadas")  return a.estado === "Rechazada"
    return true
  })

  return (
    <div className="pb-16">

      {/* ── Header ── */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">Mis Aplicaciones</h1>
        <p className="mt-1 text-sm text-slate-400">Haz seguimiento del estado de tus aplicaciones.</p>
      </div>

      {/* ── Filtros ── */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltroActivo(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              filtroActivo === f
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Lista de aplicaciones ── */}
      <div className="space-y-3">
        {lista.length > 0 ? lista.map((ap) => {
          const config = estadoConfig[ap.estado] ?? { bg: "bg-slate-50", text: "text-slate-500" }
          return (
            <div
              key={ap.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              {/* Desktop: todo en una fila */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="size-12 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="size-5 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800">{ap.titulo}</h3>
                  <p className="text-xs text-slate-500">{ap.empresa} - {ap.ubicacion}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Aplicaste el {ap.fecha}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-center ${config.bg} ${config.text}`}>
                  {ap.estado}
                </span>
                <button
                  onClick={() => navigate(`/trabajo/${ap.id}`)}
                  className="shrink-0 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-violet-700 active:scale-[0.98]"
                >
                  Ver detalles
                </button>
              </div>

              {/* Mobile: apilado */}
              <div className="flex sm:hidden items-start gap-3">
                <div className="size-11 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="size-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{ap.titulo}</h3>
                    <p className="text-xs text-slate-500">{ap.empresa} - {ap.ubicacion}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Aplicaste el {ap.fecha}</p>
                  </div>
                  <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${config.bg} ${config.text}`}>
                    {ap.estado}
                  </span>
                  <button
                    onClick={() => navigate(`/trabajo/${ap.id}`)}
                    className="w-full rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white transition-all hover:bg-violet-700 active:scale-[0.98]"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          )
        }) : (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-slate-200 bg-white">
            <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-slate-100">
              <User className="size-6 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-700">No tienes aplicaciones en esta categoría</p>
            <p className="mt-1 text-sm text-slate-400">Explora los trabajos disponibles y aplica</p>
            <button
              onClick={() => navigate("/trabajos")}
              className="mt-4 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-700"
            >
              Ver trabajos
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
