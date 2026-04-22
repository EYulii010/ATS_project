import { useState } from "react"
import { ArrowLeft, Download, CheckCircle2, Clock, Circle } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { StageBadge } from "@/components/ui/StageBadge"
import { Button } from "@/components/ui/button"
import { STAGES } from "@/components/ui/StageBadge"

// Genera historial mock realista hasta la etapa actual
function generarHistorial(etapaActual) {
  const hoy = new Date(2026, 3, 20) // 20 Abr 2026
  const offsetDias = [0, 3, 5, 9, 14, 19]
  const idxActual = STAGES.indexOf(etapaActual)
  return STAGES.slice(0, idxActual + 1).map((etapa, i) => {
    const fecha = new Date(hoy)
    fecha.setDate(hoy.getDate() - (offsetDias[idxActual] - offsetDias[i]))
    const diasEnEtapa = i < idxActual ? offsetDias[i + 1] - offsetDias[i] : null
    return {
      etapa,
      fecha: fecha.toLocaleDateString("es-NI", { day: "numeric", month: "short", year: "numeric" }),
      diasEnEtapa,
    }
  })
}

export default function DetallesCandidatoPage({ candidato, onBack, onActualizarEtapa, onDescartar }) {
  if (!candidato) return null
  const [notas,    setNotas]    = useState("")
  const [guardado, setGuardado] = useState(false)
  const historial = generarHistorial(candidato.etapa)

  const handleGuardarNotas = () => {
    if (!notas.trim()) return
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div className="min-h-screen bg-applik-bg p-6">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Header card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={candidato.nombre} size="lg" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">{candidato.nombre}</h1>
                <p className="text-sm text-slate-500">{candidato.posicion}</p>
                <p className="text-xs text-slate-400">{candidato.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:shrink-0">
              <Button variant="destructive" size="sm" onClick={onDescartar} className="flex-1 sm:flex-none">
                Descartar
              </Button>
              <Button variant="primary" size="md" onClick={onActualizarEtapa} className="flex-1 sm:flex-none">
                Manejar Aplicación
              </Button>
            </div>
          </div>

          {/* Match Score */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div>
              <p className="text-xs text-slate-400">Match Score</p>
              <p className="text-2xl font-bold text-blue-dark">{candidato.score}%</p>
            </div>
            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-dark to-teal-light"
                style={{ width: `${candidato.score}%` }}
              />
            </div>
            <StageBadge stage={candidato.etapa} />
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left — Experiencia + Educación + Notas */}
          <div className="space-y-6 lg:col-span-2">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-slate-800">Experiencia Laboral</h2>
              <div className="space-y-4">
                {[
                  { puesto: "Gerente de Ventas Senior",  empresa: "Empresa ABC",  periodo: "2022 – Presente" },
                  { puesto: "Ejecutivo de Ventas",       empresa: "Empresa XYZ",  periodo: "2019 – 2022"    },
                ].map((exp, i) => (
                  <div key={i} className="border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <p className="font-medium text-slate-800">{exp.puesto}</p>
                    <p className="text-sm text-slate-500">{exp.empresa}</p>
                    <p className="text-xs text-slate-400">{exp.periodo}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-slate-800">Educación</h2>
              <div>
                <p className="font-medium text-slate-800">Licenciatura en Administración de Empresas</p>
                <p className="text-sm text-slate-500">Universidad Nacional</p>
                <p className="text-xs text-slate-400">2015 – 2019</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-slate-800">Notas</h2>
              <textarea
                value={notas}
                onChange={(e) => { setNotas(e.target.value); setGuardado(false) }}
                placeholder="Agrega notas sobre este candidato..."
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
              />
              <div className="mt-3 flex items-center justify-end gap-3">
                {guardado && (
                  <p className="text-sm text-teal-dark font-medium">✓ Nota guardada</p>
                )}
                <Button variant="primary" size="sm" onClick={handleGuardarNotas} disabled={!notas.trim()}>
                  Guardar nota
                </Button>
              </div>
            </div>

          </div>

          {/* Right — Info + Habilidades + CV */}
          <div className="space-y-6">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-slate-800">Información</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ciudad</span>
                  <span className="text-slate-700">{candidato.ciudad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="text-slate-700 truncate ml-2">{candidato.email}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-slate-800">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {["Ventas B2B", "CRM", "Liderazgo", "Negociación", "Excel"].map((skill) => (
                  <span key={skill} className="rounded-full bg-blue-dark/10 px-3 py-1 text-xs text-blue-dark">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline de etapas */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-slate-800">Historial de Proceso</h2>
              <div className="relative">
                {STAGES.map((etapa, i) => {
                  const entrada = historial.find((h) => h.etapa === etapa)
                  const esActual = etapa === candidato.etapa
                  const completada = !!entrada && !esActual
                  const pendiente = !entrada

                  return (
                    <div key={etapa} className="flex gap-3">
                      {/* Línea + icono */}
                      <div className="flex flex-col items-center">
                        <div className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          esActual   ? "border-violet-500 bg-violet-500"
                          : completada ? "border-teal-500 bg-teal-500"
                          : "border-slate-200 bg-white"
                        }`}>
                          {esActual    && <div className="size-2 rounded-full bg-white" />}
                          {completada  && <CheckCircle2 className="size-3.5 text-white" />}
                          {pendiente   && <Circle className="size-3 text-slate-300" />}
                        </div>
                        {i < STAGES.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 min-h-[20px] ${completada ? "bg-teal-200" : "bg-slate-100"}`} />
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="pb-4 flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-tight ${
                          esActual ? "text-violet-700" : completada ? "text-slate-700" : "text-slate-300"
                        }`}>
                          {etapa}
                          {esActual && <span className="ml-2 text-xs font-normal text-violet-400">actual</span>}
                        </p>
                        {entrada && (
                          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                            <Clock className="size-3" /> {entrada.fecha}
                          </p>
                        )}
                        {entrada?.diasEnEtapa && (
                          <p className="text-xs text-amber-500 mt-0.5">{entrada.diasEnEtapa} días en esta etapa</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold text-slate-800">CV</h2>
              <Button variant="outline" size="md" className="w-full">
                <Download className="size-4" /> Descargar CV
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
