import { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"

const opcionesReporte = ["Semanal", "15 días", "Mensual"]

export default function NotificacionesPage({ onBack }) {
  const [emailAlerts,      setEmailAlerts]      = useState(true)
  const [reporte,          setReporte]          = useState("Semanal")
  const [reporteAbierto,   setReporteAbierto]   = useState(false)

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
          <h1 className="text-2xl font-bold text-slate-800">Notificaciones</h1>
          <p className="text-sm text-slate-400">Administra las preferencias de tu cuenta y sistema</p>
        </div>

        {/* Email Alerts toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <span className="text-sm font-medium text-slate-700">Email Alerts</span>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              emailAlerts ? "bg-blue-dark" : "bg-slate-200"
            }`}
          >
            <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${
              emailAlerts ? "translate-x-6" : "translate-x-1"
            }`} />
          </button>
        </div>

        {/* Reportes dropdown */}
        <div className="relative">
          <button
            onClick={() => setReporteAbierto(!reporteAbierto)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <span className="text-sm font-medium text-slate-700">Reportes</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{reporte}</span>
              <ChevronDown className={`size-4 text-slate-400 transition-transform ${reporteAbierto ? "rotate-180" : ""}`} />
            </div>
          </button>

          {reporteAbierto && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
              {opcionesReporte.map((opcion) => (
                <button
                  key={opcion}
                  onClick={() => { setReporte(opcion); setReporteAbierto(false) }}
                  className={`flex w-full items-center px-5 py-2.5 text-sm transition-colors ${
                    reporte === opcion
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

      </div>
    </div>
  )
}
