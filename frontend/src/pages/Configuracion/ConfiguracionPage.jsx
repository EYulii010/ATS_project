import { useState } from "react"
import { User, Bell, Shield } from "lucide-react"
import { ConfigCard } from "@/components/ui/Card"
import PerfilPage        from "./PerfilPage"
import NotificacionesPage from "./NotificacionesPage"
import PrivacidadPage    from "./PrivacidadPage"

const secciones = [
  {
    key:         "perfil",
    icon:        User,
    title:       "Perfil",
    description: "Actualiza tu información personal",
  },
  {
    key:         "notificaciones",
    icon:        Bell,
    title:       "Notificaciones",
    description: "Gestiona tus preferencias de notificaciones",
  },
  {
    key:         "privacidad",
    icon:        Shield,
    title:       "Privacidad y Seguridad",
    description: "Controla la privacidad y seguridad de tu cuenta",
  },
]

export default function ConfiguracionPage() {
  const [vista, setVista] = useState("menu") // "menu" | "perfil" | "notificaciones" | "privacidad"

  if (vista === "perfil")         return <PerfilPage         onBack={() => setVista("menu")} />
  if (vista === "notificaciones") return <NotificacionesPage onBack={() => setVista("menu")} />
  if (vista === "privacidad")     return <PrivacidadPage     onBack={() => setVista("menu")} />

  return (
    <div className="space-y-6 p-6 bg-applik-bg min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-400">Administra las preferencias de tu cuenta y sistema</p>
      </div>

      {/* Cards */}
      <div className="space-y-4 max-w-2xl">
        {secciones.map((s) => (
          <ConfigCard
            key={s.key}
            icon={s.icon}
            title={s.title}
            description={s.description}
            onClick={() => setVista(s.key)}
          />
        ))}
      </div>

    </div>
  )
}
