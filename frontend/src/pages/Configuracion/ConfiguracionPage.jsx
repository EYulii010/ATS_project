import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { User, Bell, Shield, Users } from "lucide-react"
import { ConfigCard } from "@/components/ui/Card"
import { useAuth } from "@/context/AuthContext"
import PerfilPage        from "./PerfilPage"
import NotificacionesPage from "./NotificacionesPage"
import PrivacidadPage    from "./PrivacidadPage"
import EquipoPage        from "./EquipoPage"

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
  const { user }       = useAuth()
  const [searchParams] = useSearchParams()
  const [vista, setVista] = useState(searchParams.get("s") || "menu")

  useEffect(() => {
    const s = searchParams.get("s")
    if (s) setVista(s)
  }, [searchParams])

  if (vista === "perfil")         return <PerfilPage         onBack={() => setVista("menu")} />
  if (vista === "notificaciones") return <NotificacionesPage onBack={() => setVista("menu")} />
  if (vista === "privacidad")     return <PrivacidadPage     onBack={() => setVista("menu")} />
  if (vista === "equipo")         return <EquipoPage         onBack={() => setVista("menu")} />

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
        {user?.role === "admin" && (
          <ConfigCard
            icon={Users}
            title="Equipo"
            description="Invita reclutadores a tu empresa"
            onClick={() => setVista("equipo")}
          />
        )}
      </div>

    </div>
  )
}
