import { useState } from "react"
import { Users, Briefcase, TrendingUp, Clock } from "lucide-react"
import { StatCard, Card, CardContent } from "@/components/ui/Card"
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"

const periodos = ["Trimestral", "Anual", "Por Fecha"]

const tendenciaData = [
  { mes: "Ene", candidatos: 30  },
  { mes: "Feb", candidatos: 45  },
  { mes: "Mar", candidatos: 38  },
  { mes: "Abr", candidatos: 60  },
  { mes: "May", candidatos: 52  },
  { mes: "Jun", candidatos: 75  },
  { mes: "Jul", candidatos: 68  },
  { mes: "Ago", candidatos: 90  },
  { mes: "Sep", candidatos: 82  },
  { mes: "Oct", candidatos: 95  },
  { mes: "Nov", candidatos: 88  },
  { mes: "Dic", candidatos: 110 },
]

const departamentosData = [
  { depto: "Gerencia",    candidatos: 12 },
  { depto: "Marketing",  candidatos: 8  },
  { depto: "Finanzas",   candidatos: 5  },
  { depto: "IT",         candidatos: 15 },
  { depto: "Operaciones", candidatos: 7 },
]

const deptoColores = ["#4F46E5", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"]

const matchData = [
  { name: "Match Alto",  value: 42, color: "#4F46E5" },
  { name: "Match Medio", value: 35, color: "#8B5CF6" },
  { name: "Match Bajo",  value: 23, color: "#E2E8F0" },
]

function CircularProgress({ percentage, color = "#4F46E5", size = 130 }) {
  const radius        = 45
  const circumference = 2 * Math.PI * radius
  const offset        = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-bold text-slate-800">{percentage}%</span>
      </div>
    </div>
  )
}

export default function EstadisticasPage() {
  const [periodoActivo, setPeriodo] = useState("Anual")

  return (
    <div className="space-y-6 p-6 bg-applik-bg min-h-screen">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Estadísticas</h1>
          <p className="text-sm text-slate-400">Resumen de métricas de reclutamiento</p>
        </div>
        <div className="flex gap-2">
          {periodos.map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`rounded-xl border px-4 py-2 text-sm transition-all ${
                periodoActivo === p
                  ? "border-blue-dark bg-blue-dark/5 text-blue-dark font-medium"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* StatCards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Activos Ahora"   value="12"  icon={Users}      iconColor="text-blue-dark"   iconBg="bg-blue-dark/10"   />
        <StatCard label="Vacantes"        value="48"  icon={Briefcase}  iconColor="text-purple-dark" iconBg="bg-purple-dark/10" />
        <StatCard label="Tasa de Match"   value="82%" icon={TrendingUp} iconColor="text-teal-dark"   iconBg="bg-teal-dark/10"   />
        <StatCard label="Tiempo Promedio" value="72h" icon={Clock}      iconColor="text-blue-light"  iconBg="bg-blue-light/10"  />
      </div>

      {/* Fila del medio */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Nuevos Candidatos + Porcentaje Contratación */}
        <div className="space-y-6">
          <Card>
            <CardContent>
              <p className="text-sm text-slate-400">Nuevos Candidatos</p>
              <div className="mt-1 flex items-end gap-3">
                <p className="text-3xl font-bold text-slate-800">24</p>
                <span className="mb-1 text-sm font-medium text-teal-dark">↑ +15%</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">vs. período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="mb-4 text-sm font-semibold text-slate-800">Porcentaje de Contratación</p>
              <div className="flex flex-col items-center gap-3">
                <CircularProgress percentage={84} color="#4F46E5" />
                <p className="text-center text-xs text-slate-400">
                  De los candidatos seleccionados fueron contratados
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calidad de Match — Donut */}
        <Card>
          <CardContent>
            <p className="mb-2 text-sm font-semibold text-slate-800">Calidad de Match</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={matchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {matchData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-2">
              {matchData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-700">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tendencia de Candidatos */}
        <Card>
          <CardContent>
            <p className="mb-4 text-sm font-semibold text-slate-800">Tendencia de Candidatos 2025</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={tendenciaData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCandidatos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#4F46E5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="candidatos"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fill="url(#gradCandidatos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Candidatos por Departamento — Barras */}
      <Card>
        <CardContent>
          <p className="mb-4 text-sm font-semibold text-slate-800">Candidatos por Departamento</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departamentosData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="depto" tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
              <Tooltip />
              <Bar dataKey="candidatos" radius={[6, 6, 0, 0]}>
                {departamentosData.map((entry, i) => (
                  <Cell key={i} fill={deptoColores[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  )
}
