import { useRef, useState, useEffect } from "react"
import { X, ScrollText } from "lucide-react"

const ARTICULOS = [
  {
    titulo: "Artículo 1 — Objeto de la Ley",
    texto:
      "La presente Ley tiene por objeto garantizar el derecho de toda persona natural o jurídica al acceso, rectificación, cancelación u oposición respecto de la información o datos personales que sobre ellas se hayan registrado o transmitido en ficheros, archivos, registros, bases o bancos de datos, ya sean de carácter público o privado.",
  },
  {
    titulo: "Artículo 4 — Principio de consentimiento",
    texto:
      "El tratamiento de datos personales requerirá el consentimiento libre, específico, informado e inequívoco del titular. El consentimiento podrá revocarse en cualquier momento sin efecto retroactivo.",
  },
  {
    titulo: "Artículo 5 — Principio de finalidad",
    texto:
      "Los datos personales sólo podrán ser recolectados para el cumplimiento de finalidades determinadas, explícitas y legítimas. No podrán ser utilizados para finalidades incompatibles con aquellas para las que fueron recabados.",
  },
  {
    titulo: "Artículo 6 — Principio de proporcionalidad",
    texto:
      "Los datos personales deben ser adecuados, pertinentes y no excesivos en relación con las finalidades para las que fueron recabados. Se prohíbe la recolección de datos que excedan la finalidad declarada.",
  },
  {
    titulo: "Artículo 7 — Principio de veracidad",
    texto:
      "Los datos personales deben ser exactos y, cuando sea necesario, actualizados. Se adoptarán todas las medidas razonables para que los datos inexactos sean suprimidos o rectificados sin dilación.",
  },
  {
    titulo: "Artículo 12 — Derechos del titular",
    texto:
      "El titular de los datos tiene derecho a: (a) conocer qué datos personales suyos han sido recolectados; (b) solicitar la rectificación de datos inexactos; (c) solicitar la cancelación de sus datos cuando el tratamiento no se ajuste a la presente Ley; (d) oponerse al tratamiento de sus datos personales.",
  },
  {
    titulo: "Artículo 20 — Deber de confidencialidad",
    texto:
      "El responsable del fichero y quienes intervengan en cualquier fase del tratamiento de datos personales están obligados al secreto profesional respecto de los mismos y al deber de guardarlos. Esta obligación subsistirá aun después de finalizar las relaciones con el titular.",
  },
  {
    titulo: "Artículo 23 — Seguridad de los datos",
    texto:
      "El responsable del fichero adoptará las medidas de índole técnica y organizativa necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.",
  },
  {
    titulo: "Uso de tus datos en Applik",
    texto:
      "Al registrarte en Applik, autorizas el tratamiento de tus datos personales (nombre, correo electrónico, historial laboral y CV) exclusivamente para: (1) la gestión de tu perfil de candidato, (2) la evaluación de compatibilidad con vacantes mediante inteligencia artificial basada en tu CV, y (3) la comunicación con empresas reclutadoras dentro de la plataforma. Tus datos no serán compartidos con terceros fuera de la plataforma ni utilizados con fines publicitarios.",
  },
]

export default function Ley787Modal({ onAceptar, onCerrar }) {
  const scrollRef  = useRef(null)
  const [llegado, setLlegado] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      if (scrollTop + clientHeight >= scrollHeight - 8) setLlegado(true)
    }
    el.addEventListener("scroll", check, { passive: true })
    check()
    return () => el.removeEventListener("scroll", check)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-violet-100">
            <ScrollText className="size-5 text-violet-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-slate-800 text-sm">Ley 787 — Protección de Datos Personales</h2>
            <p className="text-xs text-slate-400">República de Nicaragua</p>
          </div>
          <button onClick={onCerrar} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-5 text-sm text-slate-600 leading-relaxed"
        >
          <p className="text-xs text-slate-400 bg-slate-50 rounded-xl px-4 py-3">
            Lee el documento completo hasta el final para poder aceptar.
          </p>

          {ARTICULOS.map((a) => (
            <div key={a.titulo}>
              <h3 className="font-semibold text-slate-800 mb-1">{a.titulo}</h3>
              <p>{a.texto}</p>
            </div>
          ))}

          <p className="text-xs text-slate-400 text-center pt-2 pb-1">— Fin del documento —</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 shrink-0 space-y-2">
          {!llegado && (
            <p className="text-xs text-slate-400 text-center">
              Desplázate hasta el final para aceptar
            </p>
          )}
          <button
            onClick={onAceptar}
            disabled={!llegado}
            className="w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
          >
            Acepto los términos
          </button>
        </div>

      </div>
    </div>
  )
}
