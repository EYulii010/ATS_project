import { ArrowLeft, MapPin, Tag, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

// datos de prueba — se reemplaza con props o llamada a API
const vacante = {
  titulo: "Desarrollador Full Stack Senior",
  categoria: "Tecnología",
  ubicacion: "Managua",
  diasActiva: 3,
  descripcion: `Buscamos un Desarrollador Full Stack Senior apasionado por construir soluciones escalables y de alto rendimiento. Te unirás a un equipo ágil y dinámico, trabajando en el núcleo de nuestra plataforma SaaS principal. Serás responsable de diseñar, desarrollar y mantener características clave, colaborando estrechamente con diseñadores de producto y otros ingenieros para entregar valor continuo a nuestros usuarios.`,
  experiencia: `5+ años de experiencia profesional en desarrollo de software.\nDominio de metodologías Ágiles (Scrum/Kanban) y flujo de trabajo GitFlow.`,
  requisitos: [
    "Experiencia sólida en React.js y su ecosistema (Redux, Context API, Hooks).",
    "Dominio de Node.js y frameworks como Express o NestJS.",
    "Experiencia trabajando con bases de datos relacionales (PostgreSQL y NoSQL (MongoDB).",
    "Conocimientos profundos en arquitectura de microservicios y despliegues en AWS.",
    "Capacidad para escribir código limpio, testeable y mantenible (TDD/BDD).",
    "Nivel de inglés B2 o superior.",
  ],
  salarioMin: "$1,200",
  salarioMax: "$1,900",
}

export default function DetallesVacantePage({ onBack, onEdit }) {
  return (
    <div className="min-h-screen bg-applik-bg p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="size-4" /> Volver
        </button>

        {/* Header card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-teal-light/20 px-3 py-0.5 text-xs text-teal-dark font-medium">
                Activa hace {vacante.diasActiva} días
              </span>
              <h1 className="text-2xl font-bold text-slate-800">{vacante.titulo}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Tag className="size-3.5" />{vacante.categoria}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3.5" />{vacante.ubicacion}</span>
              </div>
            </div>
            <Button variant="outline" size="md" onClick={onEdit}>
              <Pencil /> Editar vacante
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Descripción</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{vacante.descripcion}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Experiencia</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{vacante.experiencia}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Requisitos</h2>
            <ul className="space-y-1.5">
              {vacante.requisitos.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-dark" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-slate-800">Rango Salarial</h2>
            <p className="text-sm font-medium text-slate-700">
              {vacante.salarioMin} – {vacante.salarioMax} mensuales
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
