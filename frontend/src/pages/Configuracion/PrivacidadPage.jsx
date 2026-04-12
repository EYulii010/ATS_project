import { useState } from "react"
import { ArrowLeft, ChevronDown, Download, Upload } from "lucide-react"

const opcionesRetencion = ["3 meses", "6 meses", "1 año", "2 años", "Indefinido"]

export default function PrivacidadPage({ onBack }) {
  const [retencion,       setRetencion]       = useState("1 año")
  const [retencionAbierto, setRetencionAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-applik-bg p-6">
      <div className="mx-auto max-w-lg space-y-6">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Privacidad y Seguridad</h1>
          <p className="text-sm text-slate-400">Administra las preferencias de tu cuenta y sistema</p>
        </div>

        {/* Periodo de Retención */}
        <div className="relative">
          <button
            onClick={() => setRetencionAbierto(!retencionAbierto)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <span className="text-sm font-medium text-slate-700">Periodo de Retención de Datos</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{retencion}</span>
              <ChevronDown className={`size-4 text-slate-400 transition-transform ${retencionAbierto ? "rotate-180" : ""}`} />
            </div>
          </button>

          {retencionAbierto && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
              {opcionesRetencion.map((opcion) => (
                <button
                  key={opcion}
                  onClick={() => { setRetencion(opcion); setRetencionAbierto(false) }}
                  className={`flex w-full items-center px-5 py-2.5 text-sm transition-colors ${
                    retencion === opcion
                      ? "text-blue-dark bg-blue-dark/5 font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {opcion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Manejo de Datos */}
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-800">Manejo de Datos</p>
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <button className="flex flex-col items-center gap-2 rounded-xl p-4 text-slate-500 hover:bg-slate-50 transition-colors">
              <Download className="size-7 text-slate-400" />
              <span className="text-sm">Importar Datos</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-xl p-4 text-slate-500 hover:bg-slate-50 transition-colors">
              <Upload className="size-7 text-slate-400" />
              <span className="text-sm">Exportar Datos</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
