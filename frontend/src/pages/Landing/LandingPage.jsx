import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Shield, BarChart2, Users, CheckCircle2, ArrowRight, Menu, X, ChevronDown } from "lucide-react"
import Logo from "@/components/ui/Logo"

import dominusCan    from "@/assets/sponsors/dominus-can.jpg.jpeg"
import elGolazo      from "@/assets/sponsors/el-golazo.jpg.jpeg"
import tlaLogistics  from "@/assets/sponsors/tla-logistics.jpg.jpeg"
import ucaSjrc       from "@/assets/sponsors/uca-sjrc.jpg.jpeg"
import silvioArtola  from "@/assets/sponsors/silvio-artola.png.jpeg"
import neuropasitos  from "@/assets/sponsors/neuropasitos.png.jpeg"
import clinicaSanta  from "@/assets/sponsors/clinica-santamaria.jpg.jpeg"
import nicashoe      from "@/assets/sponsors/nicashoe.png.jpeg"

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Sparkles,
    color: "from-purple-light to-purple-dark",
    title: "Match Score con IA",
    desc: "Nuestro puente de IA analiza cada CV y calcula automáticamente qué tan bien encaja cada candidato con la vacante. Sin sesgos, sin trabajo manual.",
  },
  {
    icon: Zap,
    color: "from-blue-light to-blue-dark",
    title: "Pipeline Visual",
    desc: "Mueve candidatos entre etapas con un clic. Recibe, analiza, entrevista y contrata desde un solo tablero.",
  },
  {
    icon: BarChart2,
    color: "from-teal-light to-teal-dark",
    title: "Dashboard Analítico",
    desc: "Métricas en tiempo real: tiempo promedio de contratación, etapas con cuellos de botella y sugerencias de la IA.",
  },
  {
    icon: Shield,
    color: "from-purple-dark to-blue-dark",
    title: "Cumplimiento Ley 787",
    desc: "Diseñado desde cero para la legislación nicaragüense. Aceptación explícita de privacidad, datos cifrados y auditoría completa.",
  },
]

const steps = [
  { n: "01", title: "Publica tu vacante", desc: "Describe el puesto en minutos. Applik genera automáticamente los criterios de evaluación." },
  { n: "02", title: "La IA evalúa los CVs", desc: "Cada candidato recibe un Match Score del 0–100 basado en habilidades, experiencia y compatibilidad." },
  { n: "03", title: "Contrata al mejor", desc: "Gestiona entrevistas, envía ofertas y registra el historial completo del proceso desde un solo lugar." },
]

const plans = [
  {
    name: "Básico",
    price: "$20",
    period: "/mes",
    desc: "Para empresas que están empezando a digitalizar su reclutamiento.",
    highlight: false,
    features: ["Hasta 10 vacantes activas", "Match Score con IA", "Dashboard estadístico", "Portal de candidatos incluido", "Soporte por correo"],
  },
  {
    name: "Pro",
    price: "$35",
    period: "/mes",
    desc: "Para equipos de RRHH que gestionan múltiples procesos simultáneos.",
    highlight: true,
    features: ["Vacantes ilimitadas", "Todo lo del plan Básico", "Análisis profundos por vacante", "Historial de etapas detallado", "Soporte prioritario"],
  },
  {
    name: "Empresarial",
    price: "Personalizado",
    period: "",
    desc: "Para organizaciones con necesidades específicas de integración y seguridad.",
    highlight: false,
    features: ["Todo lo del plan Pro", "Integraciones personalizadas", "Seguridad avanzada", "SLA garantizado", "Gestor de cuenta dedicado"],
  },
]

const stats = [
  { value: "2×", label: "más rápido que el proceso manual" },
  { value: "65%", label: "menos tiempo en el filtrado inicial" },
  { value: "100%", label: "cumplimiento con la Ley 787" },
]

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="w-7 h-7" />
          <span className="text-white font-bold text-lg tracking-tight">APPLIK</span>
        </Link>

        {/* Desktop nav — centered absolutely */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium text-white/70">
          <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
          <a href="#como-funciona" className="hover:text-white transition-colors">Cómo funciona</a>
          <a href="#producto" className="hover:text-white transition-colors">Producto</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/trabajos" className="text-sm font-semibold text-white rounded-xl px-4 py-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30"
            style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }}>
            Explorar vacantes
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/10 px-6 pb-6 space-y-4"
          >
            <a href="#caracteristicas" className="block text-white/70 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Características</a>
            <a href="#como-funciona" className="block text-white/70 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#producto" className="block text-white/70 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Producto</a>
            <a href="#precios" className="block text-white/70 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Precios</a>
            <hr className="border-white/10" />
            <Link to="/trabajos" className="block text-center text-white rounded-xl px-4 py-2.5 text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }} onClick={() => setMenuOpen(false)}>
              Explorar vacantes
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f1628 50%, #111827 100%)" }}>

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,108,246,0.15) 0%, transparent 70%)" }} />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(78,108,240,0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(186,77,240,0.08) 0%, transparent 70%)" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">

        {/* Badge */}
        <motion.div {...fadeIn(0.2)} className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-8">
          <Sparkles className="size-3.5 text-violet-400" />
          <span className="text-xs font-medium text-violet-300">Sistema de Gestión de Candidatos impulsado por AI · Hecho para Nicaragua</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
          Recluta mejor.{" "}
          <span className="block" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            backgroundImage: "linear-gradient(135deg, #BA4DF0, #7B6CF6, #4E6CF0)" }}>
            Contrata más rápido.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p {...fadeUp(0.2)} className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Applik transforma el reclutamiento de tu empresa con inteligencia artificial.
          Publica vacantes, recibe candidatos con Match Score automático y gestiona todo tu pipeline desde un solo lugar.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/registrar-empresa"
            className="group flex items-center gap-2 text-white font-semibold rounded-2xl px-7 py-3.5 text-base transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30"
            style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }}>
            Empieza gratis
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/trabajos"
            className="flex items-center gap-2 text-white/80 hover:text-white font-medium rounded-2xl px-7 py-3.5 text-base border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5">
            <Users className="size-4" />
            Buscar empleo
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  backgroundImage: "linear-gradient(135deg, #BA4DF0, #7B6CF6)" }}>
                {s.value}
              </p>
              <p className="text-xs text-white/50 mt-1 max-w-[130px]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div {...fadeIn(1)} className="mt-16 flex justify-center">
          <a href="#caracteristicas" className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors">
            <span className="text-xs">Ver más</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className="size-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ── Trusted By ───────────────────────────────────────────────────────────────
const sponsors = [
  { src: dominusCan,   name: "Dominus Can" },
  { src: elGolazo,     name: "Tienda El Golazo" },
  { src: tlaLogistics, name: "Grupo TLA Logistics" },
  { src: ucaSjrc,      name: "UCA SJRC R.L" },
  { src: silvioArtola, name: "Silvio Artola" },
  { src: neuropasitos, name: "Neuropasitos" },
  { src: clinicaSanta, name: "Clínica Santamaría" },
  { src: nicashoe,     name: "Nicashoe" },
]

function TrustedBy() {
  const track = [...sponsors, ...sponsors]

  return (
    <section className="py-14 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Empresas piloto que confían en Applik
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {track.map((s, i) => (
            <div key={i}
              className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm shrink-0 overflow-hidden"
              style={{ width: 140, height: 80 }}>
              <img
                src={s.src}
                alt={s.name}
                className="max-w-[110px] max-h-[60px] object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="caracteristicas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Características</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Todo lo que necesitas para reclutar con IA</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Diseñado específicamente para las PYMES nicaragüenses. Sin complicaciones, sin curva de aprendizaje.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(123,108,246,0.12)" }}
                className="group relative rounded-2xl border border-slate-100 bg-white p-6 transition-all cursor-default overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,108,246,0.05) 0%, transparent 70%)" }} />
                <div className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color}`}>
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24" style={{ background: "#f8f7ff" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Cómo funciona</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">De la vacante al contrato en 3 pasos</h2>
          <p className="text-slate-500">La IA hace el trabajo pesado. Tú tomas las decisiones.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px"
            style={{ background: "linear-gradient(90deg, transparent, #7B6CF6, #4E6CF0, transparent)" }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.12)} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative mb-6">
                  <div className="size-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                    style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }}>
                    {s.n}
                  </div>
                  <div className="absolute -inset-1 rounded-2xl opacity-30 blur-md -z-10"
                    style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Product Preview ───────────────────────────────────────────────────────────
const previewTabs = ["Pipeline", "Candidatos", "Dashboard"]

const pipelineStages = [
  { label: "Recibido",        count: 8,  color: "bg-slate-400" },
  { label: "Analizado",       count: 5,  color: "bg-blue-400" },
  { label: "Seleccionado",    count: 3,  color: "bg-violet-500" },
  { label: "Bajo Entrevista", count: 2,  color: "bg-purple-500" },
  { label: "Oferta Enviada",  count: 1,  color: "bg-teal-500" },
]

const mockCandidates = [
  { name: "Ana García",     role: "Diseñadora UX",       score: 94, color: "bg-violet-100 text-violet-700" },
  { name: "Carlos Méndez",  role: "Desarrollador Full-Stack", score: 88, color: "bg-blue-100 text-blue-700" },
  { name: "Sofía Ramírez",  role: "Diseñadora UX",       score: 81, color: "bg-teal-100 text-teal-700" },
  { name: "Luis Torres",    role: "Diseñador UI",         score: 73, color: "bg-amber-100 text-amber-700" },
]

const dashboardBars = [
  { label: "Ene", h: 40 }, { label: "Feb", h: 60 }, { label: "Mar", h: 50 },
  { label: "Abr", h: 80 }, { label: "May", h: 65 }, { label: "Jun", h: 90 },
]

function PipelinePreview() {
  return (
    <div className="space-y-2.5">
      {pipelineStages.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22,1,0.36,1] }}
          className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-sm">
          <div className={`size-2.5 rounded-full shrink-0 ${s.color}`} />
          <span className="text-sm text-slate-700 font-medium flex-1">{s.label}</span>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(s.count, 4) }).map((_, j) => (
              <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.07 + j * 0.04 }}
                className="size-5 rounded-full bg-slate-100 border-2 border-white shrink-0" />
            ))}
            {s.count > 4 && (
              <div className="size-5 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-violet-600">+{s.count - 4}</span>
              </div>
            )}
          </div>
          <span className="text-xs text-slate-400 w-4 text-right">{s.count}</span>
        </motion.div>
      ))}
    </div>
  )
}

function CandidatesPreview() {
  return (
    <div className="space-y-2.5">
      {mockCandidates.map((c, i) => (
        <motion.div key={c.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22,1,0.36,1] }}
          className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 px-3 py-3 shadow-sm">
          <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${c.color}`}>
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
            <p className="text-xs text-slate-400 truncate">{c.role}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #7B6CF6, #4E6CF0)" }}
                initial={{ width: 0 }}
                animate={{ width: `${c.score}%` }}
                transition={{ delay: i * 0.07 + 0.3, duration: 0.6, ease: "easeOut" }} />
            </div>
            <span className="text-xs font-bold text-violet-600">{c.score}</span>
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-1.5 pt-1">
        <Sparkles className="size-3 text-violet-400" />
        <p className="text-xs text-slate-400">Match Score calculado por IA · Ordenado por compatibilidad</p>
      </motion.div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Vacantes activas", value: "4", delta: "+1 este mes" },
          { label: "Candidatos totales", value: "31", delta: "+8 esta semana" },
          { label: "Tiempo promedio", value: "12d", delta: "−3d vs anterior" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
            <p className="text-xl font-black text-slate-800">{stat.value}</p>
            <p className="text-xs text-teal-600 mt-0.5">{stat.delta}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-600 mb-3">Candidatos por mes</p>
        <div className="flex items-end gap-2 h-20">
          {dashboardBars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div className="w-full rounded-t-md"
                style={{ background: "linear-gradient(180deg, #7B6CF6, #4E6CF0)" }}
                initial={{ height: 0 }}
                animate={{ height: `${b.h}%` }}
                transition={{ delay: i * 0.06 + 0.2, duration: 0.5, ease: "easeOut" }} />
              <span className="text-[10px] text-slate-400">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductPreview() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="producto" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Producto</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Diseñado para que lo entienda cualquiera</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Sin capacitaciones largas, sin manuales. Tu equipo empieza a reclutar el mismo día que se registra.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: description tabs — shown second on mobile, first on desktop */}
          <motion.div {...fadeUp(0.1)} className="space-y-4 order-2 lg:order-1 overflow-hidden">
            {[
              {
                icon: Zap,
                title: "Pipeline visual de candidatos",
                desc: "Ve el estado de todos tus candidatos de un vistazo. Arrastra, mueve y actualiza etapas en segundos.",
              },
              {
                icon: Sparkles,
                title: "Ranking con Match Score",
                desc: "La IA lee cada CV y te dice exactamente qué tan bien encaja con tu vacante. Tú decides, la IA filtra.",
              },
              {
                icon: BarChart2,
                title: "Métricas que importan",
                desc: "Tiempo por etapa, cuellos de botella y sugerencias de la IA para mejorar tu proceso en tiempo real.",
              },
            ].map((item, i) => {
              const Icon = item.icon
              const isActive = activeTab === i
              return (
                <motion.button key={i} onClick={() => setActiveTab(i)}
                  className={`w-full text-left rounded-2xl p-5 transition-all border ${
                    isActive
                      ? "border-violet-200 bg-violet-50 shadow-sm"
                      : "border-transparent hover:border-slate-100 hover:bg-slate-50"
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive ? "bg-violet-600" : "bg-slate-100"
                    }`}>
                      <Icon className={`size-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </div>
                    <div>
                      <p className={`font-semibold mb-1 ${isActive ? "text-violet-700" : "text-slate-700"}`}>{item.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Right: animated mock UI — shown first on mobile */}
          <motion.div {...fadeUp(0.2)} className="order-1 lg:order-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-xl shadow-slate-200/60">
              {/* Mock browser chrome */}
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="size-2.5 rounded-full bg-red-400" />
                  <div className="size-2.5 rounded-full bg-amber-400" />
                  <div className="size-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-slate-100 rounded-md h-5 flex items-center px-3">
                    <span className="text-[10px] text-slate-400">app.applik-ni.com</span>
                  </div>
                </div>
                <div className="p-4 min-h-[320px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}>
                      {activeTab === 0 && <PipelinePreview />}
                      {activeTab === 1 && <CandidatesPreview />}
                      {activeTab === 2 && <DashboardPreview />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="precios" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-3">Precios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Planes para cada etapa de tu empresa</h2>
          <p className="text-slate-500">Los candidatos siempre acceden gratis. Solo las empresas pagan por reclutar.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start">
          {plans.map((p, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}
              className={`relative rounded-2xl p-7 flex flex-col gap-5 ${
                p.highlight
                  ? "text-white shadow-2xl shadow-violet-500/25 md:scale-105"
                  : "bg-white border border-slate-100"
              }`}
              style={p.highlight ? { background: "linear-gradient(160deg, #1a1040, #0f1628)" } : {}}>

              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full px-4 py-1 text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #BA4DF0, #7B6CF6)" }}>
                    Más popular
                  </span>
                </div>
              )}

              <div>
                <p className={`text-sm font-semibold mb-1 ${p.highlight ? "text-violet-300" : "text-violet-600"}`}>{p.name}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}</span>
                  <span className={`text-sm mb-1.5 ${p.highlight ? "text-white/50" : "text-slate-400"}`}>{p.period}</span>
                </div>
                <p className={`text-sm mt-2 leading-relaxed ${p.highlight ? "text-white/60" : "text-slate-500"}`}>{p.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {p.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle2 className={`size-4 mt-0.5 shrink-0 ${p.highlight ? "text-violet-400" : "text-violet-500"}`} />
                    <span className={`text-sm ${p.highlight ? "text-white/80" : "text-slate-600"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link to={p.name === "Empresarial" ? "/contacto" : "/registrar-empresa"}
                className={`group flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-white text-violet-700 hover:shadow-lg"
                    : "border border-violet-200 text-violet-700 hover:bg-violet-50"
                }`}>
                {p.name === "Empresarial" ? "Contactar ventas" : "Empezar ahora"}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeIn(0.3)} className="text-center text-sm text-slate-400 mt-8">
          Todos los planes incluyen portal de candidatos gratuito · Sin costos de configuración · Cancela cuando quieras
        </motion.p>
      </div>
    </section>
  )
}

// ── CTA Final ─────────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f1628 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(123,108,246,0.15) 0%, transparent 65%)" }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div {...fadeUp()}>
          <div className="inline-flex size-16 items-center justify-center rounded-2xl mb-6"
            style={{ background: "linear-gradient(135deg, rgba(139,124,246,0.2), rgba(78,108,240,0.2))", border: "1px solid rgba(139,124,246,0.3)" }}>
            <Sparkles className="size-7 text-violet-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Empieza a reclutar con IA{" "}
            <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              backgroundImage: "linear-gradient(135deg, #BA4DF0, #7B6CF6)" }}>hoy mismo</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Únete a las empresas nicaragüenses que ya están contratando mejor y más rápido con Applik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/registrar-empresa"
              className="group flex items-center gap-2 text-white font-semibold rounded-2xl px-8 py-4 text-base transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30"
              style={{ background: "linear-gradient(135deg, #8B7CF6, #4E6CF0)" }}>
              Crear cuenta empresa
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/trabajos"
              className="flex items-center gap-2 text-white/70 hover:text-white font-medium rounded-2xl px-8 py-4 text-base border border-white/15 hover:border-white/30 transition-all">
              <Users className="size-4" />
              Buscar empleo como candidato
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#070c17] border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Logo className="w-6 h-6 opacity-70" />
          <span className="text-white/50 font-bold tracking-tight">APPLIK</span>
        </div>
        <p className="text-white/30 text-sm">© 2026 APPLIK. Todos los derechos reservados.</p>
        <div className="flex gap-6 text-sm text-white/40">
          <Link to="/privacidad" className="hover:text-white/70 transition-colors">Privacidad</Link>
          <Link to="/terminos" className="hover:text-white/70 transition-colors">Términos</Link>
          <Link to="/contacto" className="hover:text-white/70 transition-colors">Contacto</Link>
        </div>
      </div>
    </footer>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <Pricing />
      <CTAFinal />
      <Footer />
    </div>
  )
}
