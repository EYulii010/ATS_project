import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Users, Briefcase, UserPlus, Clock, ArrowRight } from "lucide-react"
import { StatCard, Card, CardContent } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { StageBadge } from "@/components/ui/StageBadge"
import { Button } from "@/components/ui/button"
import ActividadRecientePage from "./ActividadRecientePage"

const actividadReciente = [
  { texto: "Ana Martínez solicitó un cambio de etapa",           tiempo: "Hace 5 min"   },
  { texto: "Pedro Flores cumple los requisitos de la empresa",   tiempo: "Hace 23 min"  },
  { texto: "Nueva vacante publicada de Gerente de Ventas",       tiempo: "Hace 1 hora"  },
  { texto: "Entrevista programada para David Espinoza",          tiempo: "Hace 2 horas" },
]

const posicionesAbiertas = [
  { titulo: "Gerente de Ventas",      departamento: "Gerencia",   candidatos: 12, estado: "Activa"  },
  { titulo: "Marketing Specialist",   departamento: "Marketing",  candidatos: 8,  estado: "Activa"  },
  { titulo: "Contador Senior",        departamento: "Finanzas",   candidatos: 5,  estado: "Pausada" },
]

const topCandidatos = [
  { id: 1, nombre: "Osvaldo Rodriguez", posicion: "Gerente de Ventas",      score: 94, etapa: "Recibido"        },
  { id: 2, nombre: "Endy Gonzalez",     posicion: "Gerente de Operaciones", score: 86, etapa: "Analizado"       },
  { id: 3, nombre: "Martha Torres",     posicion: "Desarrollador Frontend", score: 89, etapa: "Seleccionado"    },
  { id: 4, nombre: "David Espinoza",    posicion: "Contador Senior",        score: 80, etapa: "Bajo Entrevista" },
]

function MatchScoreBar({ score }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 md:w-20 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-dark to-teal-light"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-700">{score}%</span>
    </div>
  )
}

export default function DashboardPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [vista, setVista] = useState("dashboard")

  useEffect(() => {
    setVista("dashboard")
  }, [location])

  if (vista === "actividad") {
    return <ActividadRecientePage onBack={() => setVista("dashboard")} />
  }

  return (
    <div className="space-y-6 bg-applik-bg min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Panel Principal</h1>
        <p className="text-sm text-slate-400">Bienvenido de vuelta, aquí está el resumen de hoy</p>
      </div>

      {/* StatCards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Candidatos"        value="12" icon={Users}    iconColor="text-blue-dark"    iconBg="bg-blue-dark/10"    />
        <StatCard label="Vacantes"          value="48" icon={Briefcase} iconColor="text-purple-dark" iconBg="bg-purple-dark/10"  />
        <StatCard label="Nuevos Candidatos" value="6"  icon={UserPlus} iconColor="text-teal-dark"    iconBg="bg-teal-dark/10"    />
        <StatCard label="En Proceso"        value="5"  icon={Clock}    iconColor="text-blue-light"   iconBg="bg-blue-light/10"   />
      </div>

      {/* Actividad Reciente + Posiciones Abiertas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Actividad Reciente */}
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Actividad Reciente</h2>
              <button onClick={() => setVista("actividad")} className="text-xs text-blue-dark hover:underline">Ver todo</button>
            </div>
            <div className="space-y-4">
              {actividadReciente.map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-dark/40" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700">{item.texto}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posiciones Abiertas */}
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Posiciones Abiertas</h2>
              <button onClick={() => navigate("/vacantes")} className="text-xs text-blue-dark hover:underline">Ver todo</button>
            </div>
            <div className="space-y-3">
              {posicionesAbiertas.map((pos, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{pos.titulo}</p>
                    <p className="text-xs text-slate-400">{pos.departamento} · {pos.candidatos} candidatos</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    pos.estado === "Activa"
                      ? "bg-teal-light/20 text-teal-dark"
                      : "bg-slate-200 text-slate-500"
                  }`}>
                    {pos.estado}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Priority Matching */}
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-800">Priority Matching</h2>
              <p className="text-xs text-slate-400">Candidatos con mayor compatibilidad</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate("/candidatos")}>
              Ver Candidatos <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Candidato</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Posición</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Match Score</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Etapa</th>
                </tr>
              </thead>
              <tbody>
                {topCandidatos.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.nombre} size="sm" />
                        <p className="font-medium text-slate-800 whitespace-nowrap">{c.nombre}</p>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 whitespace-nowrap">{c.posicion}</td>
                    <td className="py-3"><MatchScoreBar score={c.score} /></td>
                    <td className="py-3"><StageBadge stage={c.etapa} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
