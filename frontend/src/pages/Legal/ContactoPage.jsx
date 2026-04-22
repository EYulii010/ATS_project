import { Mail, MapPin } from "lucide-react"

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0"/>
    </svg>
  )
}

export default function ContactoPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 pb-20">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Contacto</h1>
      <p className="text-sm text-slate-400 mb-10">¿Tienes preguntas o necesitas ayuda? Estamos aquí para ti.</p>

      <div className="space-y-4">

        <a href="mailto:soporte@applik-ni.com"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-violet-100 shrink-0">
            <Mail className="size-5 text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Correo de soporte</p>
            <p className="text-sm text-violet-600">soporte@applik-ni.com</p>
            <p className="text-xs text-slate-400 mt-0.5">Respondemos en menos de 24 horas</p>
          </div>
        </a>

        <a href="https://instagram.com/applik.ni" target="_blank" rel="noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-pink-100 shrink-0">
            <InstagramIcon className="size-5 text-pink-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Instagram</p>
            <p className="text-sm text-pink-600">@applik.ni</p>
            <p className="text-xs text-slate-400 mt-0.5">Síguenos para novedades y actualizaciones</p>
          </div>
        </a>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-xl bg-teal-100 shrink-0">
            <MapPin className="size-5 text-teal-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Ubicación</p>
            <p className="text-sm text-slate-600">Managua, Nicaragua</p>
            <p className="text-xs text-slate-400 mt-0.5">Plataforma operada bajo la legislación nicaragüense</p>
          </div>
        </div>

      </div>
    </div>
  )
}
