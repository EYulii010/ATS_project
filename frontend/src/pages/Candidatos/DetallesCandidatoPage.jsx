import { ArrowLeft, Download } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { StageBadge } from "@/components/ui/StageBadge"
import { Button } from "@/components/ui/button"

export default function DetallesCandidatoPage({ candidato, onBack, onActualizarEtapa, onDescartar }) {
  if (!candidato) return null

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
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={candidato.nombre} size="lg" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">{candidato.nombre}</h1>
                <p className="text-sm text-slate-500">{candidato.posicion}</p>
                <p className="text-xs text-slate-400">{candidato.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="destructive" size="sm" onClick={onDescartar}>
                Descartar
              </Button>
              <Button variant="primary" size="md" onClick={onActualizarEtapa}>
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
                placeholder="Agrega notas sobre este candidato..."
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
              />
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
