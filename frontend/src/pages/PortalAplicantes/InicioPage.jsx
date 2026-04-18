import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { Search, MapPin, Layers, Clock, ChevronLeft, ChevronRight, Building2, ChevronDown } from "lucide-react"

// ─── Mock data ────────────────────────────────────────────────────────────────

const coincidencias = [
  { id: 1, titulo: "Especialista Digital",  empresa: "Flor de Caña", ubicacion: "Managua" },
  { id: 2, titulo: "Community Manager",     empresa: "Tigo",         ubicacion: "Managua" },
  { id: 3, titulo: "Content Creator",       empresa: "Flor de Caña", ubicacion: "Managua" },
]

const ultimasOfertas = [
  { id: 4, titulo: "Especialista Digital",  empresa: "Flor de Caña", ubicacion: "Managua", tipo: "Full-Time" },
  { id: 5, titulo: "Ingeniero en Software", empresa: "Flor de Caña", ubicacion: "Managua", tipo: "Full-Time" },
  { id: 6, titulo: "Gerente de Proyectos",  empresa: "Flor de Caña", ubicacion: "Managua", tipo: "Full-Time" },
  { id: 7, titulo: "Diseñador Grafico",     empresa: "Flor de Caña", ubicacion: "Managua", tipo: "Full-Time" },
]

const empresas   = ["Claro", "Tigo", "Pepsi", "Flor de Caña", "Ogilvy", "BAC"]
const ubicaciones = ["Managua", "León", "Granada", "Masaya", "Remoto"]
const categorias  = ["Tecnología", "Marketing", "Finanzas", "Operaciones", "Diseño"]
const modalidades = ["Full-Time", "Part-Time", "Remoto", "Híbrido"]

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function EmpresaAvatar({ nombre }) {
  const colores = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-blue-700",
    "from-teal-500 to-teal-700",
    "from-amber-500 to-orange-600",
  ]
  const idx = nombre.charCodeAt(0) % colores.length
  return (
    <div className={`size-14 rounded-xl bg-gradient-to-br ${colores[idx]} flex items-center justify-center text-xl font-bold text-white shrink-0`}>
      {nombre.charAt(0)}
    </div>
  )
}

// Dropdown con portal — flota sobre todo, nunca se corta
function AnimatedDropdown({ icon: Icon, placeholder, options }) {
  const [valor,   setValor]   = useState("")
  const [abierto, setAbierto] = useState(false)
  const [pos,     setPos]     = useState({ top: 0, left: 0, width: 0 })
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setAbierto(false)
    }
    const handleScroll = () => setAbierto(false)

    document.addEventListener("mousedown", handleClick)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleToggle = () => {
    if (!abierto && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
    setAbierto(!abierto)
  }

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
      >
        <Icon className="size-4 shrink-0 text-slate-400" />
        <span className={`flex-1 text-left text-sm ${valor ? "text-violet-600 font-medium" : "text-slate-400"}`}>
          {valor || placeholder}
        </span>
        <ChevronDown className={`size-4 text-slate-300 transition-transform duration-200 ${abierto ? "rotate-180" : ""}`} />
      </button>

      {abierto && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-50 rounded-xl border border-slate-100 bg-white py-1 shadow-lg animate-dropdown"
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {options.map((o, i) => (
            <button
              key={o}
              onClick={() => { setValor(o); setAbierto(false) }}
              className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors animate-fadeItem ${
                valor === o ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {o}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────────

function useEmpresasVisibles() {
  const getVisibles = () =>
    window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4
  const [visibles, setVisibles] = useState(getVisibles)
  useEffect(() => {
    const onResize = () => setVisibles(getVisibles())
    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return visibles
}

export default function InicioPage() {
  const navigate    = useNavigate()
  const [busqueda,   setBusqueda]   = useState("")
  const [inputFocus, setInputFocus] = useState(false)
  const [empresaIdx, setEmpresaIdx] = useState(0)

  const empresasVisibles = useEmpresasVisibles()

  const handleBuscar = () => {
    const params = new URLSearchParams()
    if (busqueda) params.set("q", busqueda)
    navigate(`/trabajos?${params.toString()}`)
  }

  const maxIdx = Math.max(0, empresas.length - empresasVisibles)

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">

{/* ── Hero + Buscador ── */}
      <section className="relative text-center rounded-2xl">

        {/* Contenido encima del parallax */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Encuentra tu próximo trabajo
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Descubre oportunidades que coinciden con tu perfil.
          </p>

          {/* Buscador */}
          <div className={`mx-auto mt-6 max-w-lg rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
            inputFocus ? "border-violet-400 shadow-violet-100 shadow-md" : "border-slate-200"
          }`}>

            {/* Input texto */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Search className={`size-4 shrink-0 transition-colors duration-200 ${inputFocus ? "text-violet-500" : "text-slate-400"}`} />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                placeholder="Buscar tu trabajo ideal..."
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <AnimatedDropdown icon={MapPin} placeholder="Ubicación"  options={ubicaciones} />
            <AnimatedDropdown icon={Layers} placeholder="Categoría"  options={categorias}  />
            <AnimatedDropdown icon={Clock}  placeholder="Modalidad"  options={modalidades} />

            <div className="p-3">
              <button
                onClick={handleBuscar}
                className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coincidencias con tu perfil ── */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-800">Coincidencias con tu perfil</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coincidencias.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-violet-200"
            >
              <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
                ✓ Alta coincidencia
              </span>
              <h3 className="mt-3 font-semibold text-slate-800">{job.titulo}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <Building2 className="size-3.5 shrink-0" /> {job.empresa}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="size-3.5 shrink-0" /> {job.ubicacion}
              </div>
              <button
                onClick={() => navigate(`/trabajo/${job.id}`)}
                className="mt-4 w-full rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
              >
                Ver puesto
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {coincidencias.map((_, i) => (
            <div key={i} className={`size-1.5 rounded-full transition-all duration-300 ${i === 0 ? "bg-violet-600 w-4" : "bg-slate-300"}`} />
          ))}
        </div>
      </section>

      {/* ── Últimas Ofertas Publicadas ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-800">Ultimas Ofertas Publicadas</h2>
        <p className="mb-4 text-sm text-slate-400">Descubre las últimas oportunidades publicadas</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ultimasOfertas.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-violet-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <EmpresaAvatar nombre={job.empresa} />
                <div>
                  <h3 className="font-semibold text-slate-800">{job.titulo}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Building2 className="size-3" /> {job.empresa}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="size-3" /> {job.ubicacion}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="size-3" /> {job.tipo}
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/trabajo/${job.id}`)}
                className="w-full rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Empresas Destacadas ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-800">Empresas Destacadas</h2>
        <p className="mb-6 text-sm text-slate-400">Descubre oportunidades laborales en tus empresas favoritas</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setEmpresaIdx((i) => Math.max(0, i - 1))}
            disabled={empresaIdx === 0}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all hover:border-violet-300 hover:text-violet-600 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex flex-1 gap-4 overflow-hidden">
            {empresas.slice(empresaIdx, empresaIdx + empresasVisibles).map((e) => (
              <div
                key={e}
                className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md cursor-pointer"
              >
                <span className="text-sm font-semibold text-slate-700">{e}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setEmpresaIdx((i) => Math.min(maxIdx, i + 1))}
            disabled={empresaIdx >= maxIdx}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all hover:border-violet-300 hover:text-violet-600 disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </section>

    </div>
  )
}
