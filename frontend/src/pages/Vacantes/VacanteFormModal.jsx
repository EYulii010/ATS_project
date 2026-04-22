import { useState, useEffect } from "react"
import { Input, Textarea } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, Loader2 } from "lucide-react"

const tiposContrato = ["Full Time", "Part Time", "Contrato", "Temporal", "Prácticas"]

const rubrosLaborales = [
  "Administración",
  "Almacenamiento",
  "Apoyo de Oficina",
  "Banca | Servicios Financieros",
  "Call Center",
  "Compras",
  "Finanzas | Contabilidad | Auditoría",
  "Informática | Internet",
  "Mantenimiento",
  "Mercadeo | Ventas",
  "Operaciones | Logística",
  "Producción | Ingeniería | Calidad",
  "Publicidad | Comunicaciones | Servicios",
  "Puestos Profesionales",
  "Recursos Humanos",
  "Restaurantes",
  "Salud",
  "Telecomunicaciones",
  "Varios",
]

export default function VacanteFormModal({ vacante = null, onClose, onSave }) {
  const isEditing = vacante !== null

  const [titulo,        setTitulo]        = useState(vacante?.titulo       ?? "")
  const [departamento,   setDepartamento]   = useState(vacante?.departamento  ?? "")
  const [ubicacion,     setUbicacion]     = useState(vacante?.ubicacion    ?? "")
  const [contrato,      setContrato]      = useState(vacante?.tipoContrato ?? "")
  const [descripcion,   setDescripcion]   = useState(vacante?.descripcion  ?? "")
  const [experiencia,   setExperiencia]   = useState(vacante?.experiencia  ?? "")
  const [requisitos,    setRequisitos]    = useState(vacante?.requisitos   ?? "")
  const [salarioMin,    setSalarioMin]    = useState(vacante?.salarioMin   ?? "")
  const [salarioMax,    setSalarioMax]    = useState(vacante?.salarioMax   ?? "")

  const [departments,  setDepartments]  = useState([])
  const [urlEmpresa,   setUrlEmpresa]   = useState("")
  const [mostrarUrlIA, setMostrarUrlIA] = useState(false)
  const [generandoIA,  setGenerandoIA]  = useState(false)
  const [errorIA,      setErrorIA]      = useState("")

  const [guardando, setGuardando] = useState(false)
  const [error,     setError]     = useState("")

  const token = localStorage.getItem("applik_token")

  useEffect(() => {
    if (!token) return
    const DEPT_URL = `${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/departments`

    fetch(DEPT_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(async (data) => {
        const existing = Array.isArray(data) ? data : []
        setDepartments(existing)

        const existingNames = new Set(existing.map(d => d.name))
        const missing = rubrosLaborales.filter(r => !existingNames.has(r))

        if (missing.length > 0) {
          const created = await Promise.all(
            missing.map(name =>
              fetch(DEPT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name }),
              }).then(r => r.ok ? r.json() : null)
            )
          )
          const newDepts = created.filter(Boolean)
          setDepartments(prev => [...prev, ...newDepts])
        }
      })
      .catch(() => {})
  }, [])

  const handleGenerarIA = async () => {
    if (!titulo.trim()) {
      setMostrarUrlIA(true)
      return
    }
    setMostrarUrlIA(true)
    if (!urlEmpresa.trim()) return

    setGenerandoIA(true)
    setErrorIA("")
    try {
      const res = await fetch(`${import.meta.env.VITE_AI_SERVICE_URL}/api/v1/jobs/generate-description`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobTitle: titulo, companyUrl: urlEmpresa }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "Error al generar")
      setDescripcion(data.data)
    } catch (err) {
      setErrorIA(err.message ?? "No se pudo generar la descripción. Intenta de nuevo.")
    } finally {
      setGenerandoIA(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGuardando(true)
    setError("")

    let dept = departments.find(d => d.name === departamento)

    // Si el departamento no existe en el tenant aún, se crea automáticamente
    if (!dept) {
      const createRes = await fetch(`${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: departamento }),
      })
      if (!createRes.ok) {
        setError("No se pudo crear el departamento. Intenta de nuevo.")
        setGuardando(false)
        return
      }
      dept = await createRes.json()
      setDepartments(prev => [...prev, dept])
    }

    const body = {
      title:         titulo,
      description:   descripcion,
      requirements:  requisitos || undefined,
      salary_min:    parseFloat(salarioMin) || 0,
      salary_max:    parseFloat(salarioMax) || 0,
      department_id: dept.id,
    }

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/jobs/${vacante.id}`
        : `${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/jobs`
      const method = isEditing ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? data.message ?? "Error al guardar")

      onSave?.(data)
    } catch (err) {
      setError(err.message ?? "No se pudo guardar la vacante. Intenta de nuevo.")
    } finally {
      setGuardando(false)
    }
  }

  const handleDescartar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Editar Vacante" : "Crear Nueva Vacante"}
          </h2>
          <p className="text-sm text-slate-400">
            {isEditing ? "Editar información de vacante existente" : "Completa la información del nuevo puesto"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <Input
            label="Título del Puesto"
            required
            placeholder="Ej. Gerente de Ventas"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Departamento</label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800",
                  "focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-400/20",
                  "transition-colors"
                )}
              >
                <option value="" disabled>Selecciona...</option>
                {rubrosLaborales.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <Input
              label="Ubicación"
              placeholder="Ej. Managua"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </div>

          {/* Tipo de Contrato */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Tipo de Contrato</label>
            <select
              value={contrato}
              onChange={(e) => setContrato(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800",
                "focus:border-blue-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
              )}
            >
              <option value="" disabled>Selecciona...</option>
              {tiposContrato.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Descripción con botón IA */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Descripción del Puesto</label>
              <button
                type="button"
                onClick={handleGenerarIA}
                disabled={generandoIA}
                className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 transition-all hover:bg-violet-100 hover:border-violet-300 disabled:opacity-50"
              >
                {generandoIA
                  ? <><Loader2 className="size-3 animate-spin" /> Generando...</>
                  : <><Sparkles className="size-3" /> Generar con IA</>
                }
              </button>
            </div>

            {mostrarUrlIA && (
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="URL del sitio web de la empresa (ej. https://empresa.com)"
                  value={urlEmpresa}
                  onChange={(e) => setUrlEmpresa(e.target.value)}
                  className="flex-1 rounded-lg border border-violet-200 bg-violet-50/50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleGenerarIA}
                  disabled={generandoIA || !urlEmpresa.trim()}
                  className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-violet-700 disabled:opacity-40"
                >
                  {generandoIA ? <Loader2 className="size-3.5 animate-spin" /> : "Generar"}
                </button>
              </div>
            )}
            {errorIA && <p className="text-xs text-red-500">{errorIA}</p>}

            <Textarea
              placeholder="Describe las responsabilidades y objetivos del puesto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>

          <Textarea
            label="Experiencia Requerida"
            placeholder="Especifica los años y tipo de experiencia necesaria"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            rows={3}
          />

          <Textarea
            label="Requisitos"
            required
            placeholder="Lista los requisitos educativos, técnicos y habilidades necesarias"
            value={requisitos}
            onChange={(e) => setRequisitos(e.target.value)}
            rows={3}
          />

          {/* Rango Salarial */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Rango Salarial
              <span className="ml-1 text-xs text-slate-400">(NIO)</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Mínimo"
                type="number"
                min="0"
                value={salarioMin}
                onChange={(e) => setSalarioMin(e.target.value)}
              />
              <Input
                placeholder="Máximo"
                type="number"
                min="0"
                value={salarioMax}
                onChange={(e) => setSalarioMax(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleDescartar}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={guardando}>
              {guardando
                ? <><Loader2 className="size-3.5 animate-spin mr-1" /> Guardando...</>
                : isEditing ? "Guardar Cambios" : "Guardar Vacante"
              }
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
