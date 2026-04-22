import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft, Clock, MapPin, Bookmark, Share2, Sparkles,
  CheckCircle2, CircleDot, Building2, Tag, AlertCircle,
} from "lucide-react"
import CvDropzone from "@/components/ui/CvDropzone"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// ─── Mock data ────────────────────────────────────────────────────────────────

const trabajos = {
  1: {
    id: 1, titulo: "Gerente de Ventas", empresa: "Casa Peñas", ubicacion: "Managua",
    categoria: "Marketing", tipo: "Full Time", experiencia: "3 años", fechaLimite: "15 de mayo, 2026",
    publicado: "hace 2 días", salario: "$1,200 - $1,600 mensuales",
    descripcion: "Buscamos un Gerente de Ventas apasionado por construir soluciones escalables y de alto rendimiento. Te unirás a un equipo ágil y dinámico, trabajando en el núcleo de nuestra plataforma. Serás responsable de diseñar, desarrollar y mantener características clave, colaborando estrechamente con diseñadores de producto y otros miembros del equipo para entregar valor continuo a nuestros clientes.",
    experiencia_desc: ["5+ años de experiencia profesional en ventas y gestión comercial.", "Dominio de metodologías ágiles y manejo de equipos de alto rendimiento.", "Conocimiento en herramientas CRM y análisis de datos de ventas."],
    requisitos: ["Experiencia sólida en gestión de equipos comerciales.", "Conocimiento en estrategias de ventas B2B y B2C.", "Experiencia trabajando con bases de datos de clientes y CRM.", "Habilidades de negociación y cierre de ventas.", "Capacidad para construir reportes y análisis de rendimiento.", "Nivel de inglés B2 o superior."],
    match: 85, matchLabel: "Excelente",
    matchItems: [
      { texto: "Tu perfil coincide fuertemente con los requisitos del puesto.", tipo: "ok" },
      { texto: "Tienes la experiencia requerida en gestión de equipos.",        tipo: "ok" },
      { texto: "Reforzar conocimientos en herramientas CRM avanzadas.",         tipo: "mejora" },
    ],
  },
  2: {
    id: 2, titulo: "Analista de Mercado", empresa: "Managua Co.", ubicacion: "Managua",
    categoria: "Marketing", tipo: "Full Time", experiencia: "2 años", fechaLimite: "30 de abril, 2026",
    publicado: "hace 1 día", salario: "$800 - $1,100 mensuales",
    descripcion: "Buscamos un Analista de Mercado con capacidad analítica y orientación a resultados. Trabajarás en estrecha colaboración con el equipo de marketing para identificar tendencias y oportunidades de crecimiento.",
    experiencia_desc: ["2+ años de experiencia en análisis de mercado o áreas relacionadas.", "Manejo de herramientas de análisis de datos.", "Conocimiento en investigación de mercados."],
    requisitos: ["Experiencia en análisis de datos y métricas de mercado.", "Manejo de Excel avanzado y herramientas de BI.", "Habilidad para presentar insights de forma clara.", "Conocimiento en marketing digital.", "Nivel de inglés intermedio."],
    match: 72, matchLabel: "Bueno",
    matchItems: [
      { texto: "Tu perfil coincide con los requisitos analíticos del puesto.", tipo: "ok"     },
      { texto: "Tienes experiencia relevante en marketing.",                   tipo: "ok"     },
      { texto: "Reforzar conocimientos en herramientas de BI.",                tipo: "mejora" },
    ],
  },
}

const fallback = {
  id: 0, titulo: "Desarrollador Full Stack Senior", empresa: "Empresa Demo", ubicacion: "Managua",
  categoria: "Tecnología", tipo: "Full Time", experiencia: "3 años", fechaLimite: "15 de abril, 2026",
  publicado: "hace 2 días", salario: "$1,200 - $1,600 mensuales",
  descripcion: "Buscamos un Desarrollador Full Stack Senior apasionado por construir soluciones escalables y de alto rendimiento. Te unirás a un equipo ágil y dinámico, trabajando en el núcleo de nuestra plataforma SaaS principal. Serás responsable de diseñar, desarrollar y mantener características clave, colaborando estrechamente con diseñadores de producto y otros ingenieros para entregar valor continuo a nuestros usuarios.",
  experiencia_desc: ["5+ años de experiencia profesional en desarrollo de software.", "Dominio de metodologías Ágiles (Scrum/Kanban) y flujo de trabajo GitFlow."],
  requisitos: ["Experiencia sólida en React.js y su ecosistema (Redux, Context API, Hooks).", "Dominio de Node.js y frameworks como Express o NestJS.", "Experiencia trabajando con bases de datos relacionales (PostgreSQL) y NoSQL (MongoDB).", "Conocimientos profundos en arquitectura de microservicios y despliegues en AWS.", "Capacidad para escribir código limpio, testeable y mantenible (TDD/BDD).", "Nivel de inglés B2 o superior."],
  match: 85, matchLabel: "Excelente",
  matchItems: [
    { texto: "Tu perfil coincide fuertemente con los requisitos de React y Node.js.", tipo: "ok"     },
    { texto: "Tienes la experiencia requerida en AWS.",                               tipo: "ok"     },
    { texto: "Reforzar conocimientos en NestJS.",                                     tipo: "mejora" },
  ],
}

// ─── Barra de progreso ────────────────────────────────────────────────────────

function MatchBar({ porcentaje }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100">
      <div
        className="h-1.5 rounded-full bg-violet-600 transition-all duration-700"
        style={{ width: `${porcentaje}%` }}
      />
    </div>
  )
}

// ─── Sidebar cards ────────────────────────────────────────────────────────────

function SidebarContent({ trabajo, aplicado, onAplicar }) {
  const matchColor = (trabajo.match ?? 0) >= 80 ? "text-teal-500" : "text-blue-500"

  return (
    <>
      {/* Match con tu perfil — solo si hay datos de match */}
      {trabajo.match != null && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-violet-500" />
            <span className="text-sm font-semibold text-slate-800">Match con tu perfil</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-slate-800">{trabajo.match}%</span>
            <span className={`mb-1 text-sm font-semibold ${matchColor}`}>{trabajo.matchLabel}</span>
          </div>
          <MatchBar porcentaje={trabajo.match} />
          {trabajo.matchItems?.length > 0 && (
            <ul className="mt-4 space-y-3">
              {trabajo.matchItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {item.tipo === "ok"
                    ? <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-teal-500" />
                    : <AlertCircle  className="size-3.5 shrink-0 mt-0.5 text-amber-400" />
                  }
                  <span className={`text-xs leading-relaxed ${item.tipo === "ok" ? "text-teal-600" : "text-amber-600"}`}>
                    {item.texto}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Job Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-slate-800">Job Overview</h3>
        <div className="space-y-3">
          {[
            { label: "Título",       valor: trabajo.titulo     },
            { label: "Categoría",    valor: trabajo.categoria  },
            { label: "Fecha límite", valor: trabajo.fechaLimite },
          ].filter(f => f.valor).map(({ label, valor }) => (
            <div key={label}>
              <p className="text-xs text-slate-400">{label}</p>
              <p className="text-sm font-medium text-slate-700">{valor}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function DetallesPuestoPage() {
  const navigate  = useNavigate()
  const { id }    = useParams()

  const [trabajo,   setTrabajo]   = useState(null)
  const [jobToken,  setJobToken]  = useState(null)
  const [cargando,  setCargando]  = useState(false)
  const [noDisp,    setNoDisp]    = useState(false)
  const [guardado,  setGuardado]  = useState(false)
  const [copiado,   setCopiado]   = useState(false)
  const [aplicado,  setAplicado]  = useState(false)

  useEffect(() => {
    if (UUID_RE.test(id)) {
      setJobToken(id)
      setCargando(true)
      fetch(`${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/jobs/public/${id}`)
        .then(r => { if (!r.ok) throw new Error("not found"); return r.json() })
        .then(data => {
          setTrabajo({
            titulo:           data.title,
            empresa:          data.Department?.name ?? "",
            ubicacion:        "Nicaragua",
            categoria:        data.Department?.name ?? "",
            publicado:        `hace ${Math.floor((Date.now() - new Date(data.createdAt)) / 86400000)} días`,
            fechaLimite:      data.closes_at ? new Date(data.closes_at).toLocaleDateString("es") : "Abierta",
            salario:          `${Number(data.salary_min).toLocaleString("es")} – ${Number(data.salary_max).toLocaleString("es")} ${data.currency ?? "NIO"}`,
            descripcion:      data.description,
            experiencia_desc: [],
            requisitos:       data.requirements ? data.requirements.split("\n").filter(Boolean) : [],
            match:            null,
          })
        })
        .catch(() => setNoDisp(true))
        .finally(() => setCargando(false))
    } else {
      setTrabajo(trabajos[Number(id)] ?? fallback)
    }
  }, [id])

  if (cargando) return (
    <div className="flex items-center justify-center py-32 text-sm text-slate-400">Cargando vacante...</div>
  )

  if (noDisp) return (
    <div className="pb-16 space-y-6">
      <button onClick={() => navigate("/trabajos")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors">
        <ArrowLeft className="size-4" /> Volver a todos los trabajos
      </button>
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-500 font-medium">Esta vacante no está disponible.</p>
        <p className="text-sm text-slate-400 mt-1">Es posible que haya sido cerrada o aún no esté publicada.</p>
      </div>
    </div>
  )

  const dataTrabajo = trabajo ?? fallback

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: dataTrabajo.titulo, text: `${dataTrabajo.titulo} en ${dataTrabajo.empresa}`, url: window.location.href })
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  return (
    <div className="pb-16 space-y-6">

      {/* ── Volver ── */}
      <button
        onClick={() => navigate("/trabajos")}
        className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-violet-600"
      >
        <ArrowLeft className="size-4" />
        Volver a todos los trabajos
      </button>

      {/* ── Cabecera ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
              <Clock className="size-3.5" />
              <span>Publicado {dataTrabajo.publicado}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 sm:text-3xl">{dataTrabajo.titulo}</h1>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Building2 className="size-3.5" /> {dataTrabajo.categoria}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {dataTrabajo.ubicacion}
              </span>
            </div>
          </div>
          {/* Acciones */}
          <div className="flex flex-col gap-2 sm:items-end sm:shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuardado(v => !v)}
                className={`flex size-8 items-center justify-center rounded-xl border transition-all ${
                  guardado
                    ? "border-violet-400 bg-violet-50 text-violet-500"
                    : "border-slate-200 text-slate-400 hover:border-violet-300 hover:text-violet-500"
                }`}
              >
                <Bookmark className={`size-4 ${guardado ? "fill-violet-500" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                title={copiado ? "¡Copiado!" : "Copiar enlace"}
                className={`flex size-8 items-center justify-center rounded-xl border transition-all ${
                  copiado
                    ? "border-teal-400 bg-teal-50 text-teal-500"
                    : "border-slate-200 text-slate-400 hover:border-violet-300 hover:text-violet-500"
                }`}
              >
                <Share2 className="size-4" />
              </button>
              <button
                onClick={() => setAplicado(true)}
                disabled={aplicado}
                className={`hidden sm:block rounded-xl px-5 py-2 text-sm font-semibold transition-all active:scale-[0.98] ${
                  aplicado
                    ? "bg-teal-50 text-teal-600 cursor-default"
                    : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5"
                }`}
              >
                {aplicado ? "✓ Aplicado" : "Aplicar"}
              </button>
            </div>
            <button
              onClick={() => setAplicado(true)}
              disabled={aplicado}
              className={`sm:hidden w-full rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                aplicado
                  ? "bg-teal-50 text-teal-600 cursor-default"
                  : "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5"
              }`}
            >
              {aplicado ? "✓ Aplicado" : "Aplicar"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Layout: contenido + sidebar ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Columna izquierda ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Descripción */}
          <section>
            <h2 className="mb-3 text-base font-bold text-slate-800">Descripción</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{dataTrabajo.descripcion}</p>
            </div>
          </section>

          {/* Experiencia */}
          {dataTrabajo.experiencia_desc?.length > 0 && (
            <section>
              <h2 className="mb-3 text-base font-bold text-slate-800">Experiencia</h2>
              <div className="space-y-1.5">
                {dataTrabajo.experiencia_desc.map((linea, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">{linea}</p>
                ))}
              </div>
            </section>
          )}

          {/* Requisitos */}
          {dataTrabajo.requisitos?.length > 0 && (
            <section>
              <h2 className="mb-3 text-base font-bold text-slate-800">Requisitos</h2>
              <ul className="space-y-2.5">
                {dataTrabajo.requisitos.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CircleDot className="size-4 shrink-0 mt-0.5 text-slate-400" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Rango salarial */}
          <section>
            <h2 className="mb-1 text-base font-bold text-slate-800">Rango salarial</h2>
            <p className="text-sm font-semibold text-slate-700">{dataTrabajo.salario}</p>
          </section>

          {/* ── CV Upload ── */}
          {jobToken && <section>
            <h2 className="mb-3 text-base font-bold text-slate-800">Aplicar a esta posición</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <CvDropzone
                jobToken={jobToken}
                onSuccess={() => setAplicado(true)}
              />
            </div>
          </section>}

          {/* Sidebar en mobile — debajo del contenido */}
          <div className="lg:hidden space-y-4">
            <SidebarContent trabajo={dataTrabajo} aplicado={aplicado} onAplicar={() => {}} />
          </div>
        </div>

        {/* ── Sidebar derecha — solo desktop ── */}
        <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
          <SidebarContent trabajo={dataTrabajo} aplicado={aplicado} onAplicar={() => {}} />
        </aside>

      </div>
    </div>
  )
}
