import { useState } from "react"
import { Users, Briefcase, TrendingUp, Clock, Sparkles, AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import { StatCard, Card, CardContent } from "@/components/ui/Card"
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList,
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
  { depto: "Gerencia",     candidatos: 12 },
  { depto: "Marketing",   candidatos: 8  },
  { depto: "Finanzas",    candidatos: 5  },
  { depto: "IT",          candidatos: 15 },
  { depto: "Operaciones", candidatos: 7  },
]

const deptoColores = ["#4F46E5", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"]

// Días promedio por etapa — colores según urgencia
const embudo = [
  { etapa: "Recibido",        dias: 2,  color: "#10B981" },
  { etapa: "Analizado",       dias: 4,  color: "#10B981" },
  { etapa: "Seleccionado",    dias: 9,  color: "#F59E0B" },
  { etapa: "Bajo Entrevista", dias: 12, color: "#EF4444" },
  { etapa: "Oferta Enviada",  dias: 3,  color: "#10B981" },
  { etapa: "Contratado",      dias: 1,  color: "#10B981" },
]

const sugerenciasIA = [
  {
    tipo: "critico",
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    titulo: "Cuello de botella crítico: Bajo Entrevista",
    texto: "Los candidatos permanecen en promedio 12 días en esta etapa. Considera dividir las entrevistas en paralelo o asignar un segundo entrevistador para reducir el tiempo de espera.",
  },
  {
    tipo: "advertencia",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    titulo: "Demora en etapa Seleccionado (9 días)",
    texto: "El tiempo entre la revisión del CV y el inicio de entrevistas es elevado. Se recomienda establecer un máximo de 5 días para pasar candidatos seleccionados a entrevistas.",
  },
  {
    tipo: "info",
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    titulo: "Riesgo de pérdida de talento",
    texto: "Con un promedio de 21 días entre 'Recibido' y 'Oferta Enviada', existe alto riesgo de que candidatos calificados reciban otras ofertas. El mercado laboral en Tecnología tiene un tiempo de respuesta promedio de 10–14 días.",
  },
  {
    tipo: "positivo",
    icon: CheckCircle2,
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    titulo: "Proceso de oferta eficiente",
    texto: "Una vez enviada la oferta, el cierre ocurre en 1 día promedio. Esto indica buena alineación de expectativas salariales desde etapas tempranas.",
  },
]

function TooltipEmbudo({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-slate-700">{d.etapa}</p>
      <p className="text-slate-500">{d.dias} días promedio</p>
    </div>
  )
}

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
    <div className="space-y-6 bg-applik-bg min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Estadísticas</h1>
          <p className="text-sm text-slate-400">Resumen de métricas de reclutamiento</p>
        </div>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Activos Ahora"   value="12"  icon={Users}      iconColor="text-blue-dark"   iconBg="bg-blue-dark/10"   />
        <StatCard label="Vacantes"        value="48"  icon={Briefcase}  iconColor="text-purple-dark" iconBg="bg-purple-dark/10" />
        <StatCard label="Tasa de Match"   value="82%" icon={TrendingUp} iconColor="text-teal-dark"   iconBg="bg-teal-dark/10"   />
        <StatCard label="Tiempo Promedio" value="72h" icon={Clock}      iconColor="text-blue-light"  iconBg="bg-blue-light/10"  />
      </div>

      {/* Fila del medio */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Nuevos Candidatos + Porcentaje Contratación */}
        <div className="space-y-6 md:col-span-1">
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
        <Card className="md:col-span-2 lg:col-span-1">
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

      {/* Candidatos por Departamento */}
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

      {/* Embudo de tiempo por etapa */}
      <Card>
        <CardContent>
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm font-semibold text-slate-800">Tiempo Promedio por Etapa</p>
              <p className="text-xs text-slate-400 mt-0.5">Días que un candidato permanece en cada etapa del proceso</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-green-500"/>≤ 4 días</span>
              <span className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-amber-400"/>5–8 días</span>
              <span className="flex items-center gap-1"><span className="inline-block size-2.5 rounded-full bg-red-400"/>{">"} 8 días</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={embudo} layout="vertical" margin={{ top: 8, right: 48, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} unit=" días" />
              <YAxis type="category" dataKey="etapa" tick={{ fontSize: 11, fill: "#64748B" }} width={110} />
              <Tooltip content={<TooltipEmbudo />} />
              <Bar dataKey="dias" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {embudo.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}
                <LabelList dataKey="dias" position="right" formatter={(v) => `${v}d`} style={{ fontSize: 11, fill: "#64748B" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sugerencias IA */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex size-8 items-center justify-center rounded-xl bg-violet-100">
              <Sparkles className="size-4 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Sugerencias de la IA</p>
              <p className="text-xs text-slate-400">Basadas en los tiempos del proceso actual</p>
            </div>
            <span className="ml-auto text-xs text-slate-400 bg-slate-100 rounded-full px-2.5 py-1">Mock — conectar con AI service</span>
          </div>
          <div className="space-y-3">
            {sugerenciasIA.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className={`flex gap-3 rounded-xl border p-4 ${s.bg} ${s.border}`}>
                  <Icon className={`size-4 shrink-0 mt-0.5 ${s.color}`} />
                  <div>
                    <p className={`text-sm font-semibold ${s.color}`}>{s.titulo}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.texto}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
