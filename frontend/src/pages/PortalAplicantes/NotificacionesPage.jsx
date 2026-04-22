import { Bell, Briefcase, CheckCircle, Clock } from "lucide-react"

const mockNotificaciones = [
  {
    id: 1,
    tipo: "aplicacion",
    titulo: "Tu aplicación fue revisada",
    descripcion: "Flor de Caña revisó tu aplicación para Especialista Digital.",
    tiempo: "Hace 10 min",
    leida: false,
  },
  {
    id: 2,
    tipo: "vacante",
    titulo: "Nueva vacante que podría interesarte",
    descripcion: "Se publicó una nueva vacante de Ingeniero en Software en Claro.",
    tiempo: "Hace 1 hora",
    leida: false,
  },
  {
    id: 3,
    tipo: "aplicacion",
    titulo: "Avanzaste a la siguiente etapa",
    descripcion: "Tigo te movió a la etapa de entrevistas para Community Manager.",
    tiempo: "Hace 3 horas",
    leida: true,
  },
  {
    id: 4,
    tipo: "vacante",
    titulo: "Nueva vacante que podría interesarte",
    descripcion: "Se publicó una nueva vacante de Diseñador UX en Stripe.",
    tiempo: "Ayer",
    leida: true,
  },
  {
    id: 5,
    tipo: "aplicacion",
    titulo: "Tu aplicación fue recibida",
    descripcion: "BAC confirmó que recibió tu aplicación para Analista Financiero.",
    tiempo: "Hace 2 días",
    leida: true,
  },
]

const iconoTipo = {
  aplicacion: <CheckCircle className="size-5 text-violet-500" />,
  vacante: <Briefcase className="size-5 text-teal-500" />,
}

export default function NotificacionesPage() {
  const noLeidas = mockNotificaciones.filter((n) => !n.leida).length

  return (
    <div className="max-w-2xl mx-auto pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notificaciones</h1>
          {noLeidas > 0 && (
            <p className="text-sm text-slate-400 mt-0.5">{noLeidas} sin leer</p>
          )}
        </div>
        {noLeidas > 0 && (
          <button className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors">
            Marcar todas como leídas
          </button>
        )}
      </div>

      {mockNotificaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-slate-200 bg-white">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-100">
            <Bell className="size-7 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-700">Sin notificaciones</p>
          <p className="mt-1 text-sm text-slate-400">Cuando haya actividad en tu cuenta aparecerá aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockNotificaciones.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200 hover:shadow-sm ${
                n.leida
                  ? "border-slate-200 bg-white"
                  : "border-violet-100 bg-violet-50/50"
              }`}
            >
              <div className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl ${
                n.leida ? "bg-slate-100" : "bg-white shadow-sm"
              }`}>
                {iconoTipo[n.tipo]}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${n.leida ? "text-slate-600" : "text-slate-800"}`}>
                  {n.titulo}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{n.descripcion}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="size-3 text-slate-400" />
                  <span className="text-xs text-slate-400">{n.tiempo}</span>
                </div>
              </div>

              {!n.leida && (
                <div className="mt-1.5 size-2.5 shrink-0 rounded-full bg-violet-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
