import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Base Card — contenedor genérico
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-sm border border-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return (
    <div className={cn("px-5 pt-5 pb-3", className)}>
      {children}
    </div>
  )
}

export function CardContent({ className, children }) {
  return (
    <div className={cn("px-5 py-5", className)}>
      {children}
    </div>
  )
}

// StatCard — métricas del Dashboard
export function StatCard({ label, value, icon: Icon, iconColor = "text-blue-dark", iconBg = "bg-blue-dark/10" }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      {Icon && (
        <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", iconBg)}>
          <Icon className={cn("size-6", iconColor)} />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </Card>
  )
}

// ConfigCard — tarjetas de la página Configuración
export function ConfigCard({ icon: Icon, title, description, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl bg-white border p-5 text-left shadow-sm",
        "flex items-center gap-4",
        "transition-colors hover:border-purple-dark/40",
        active ? "border-purple-dark" : "border-slate-100"
      )}
    >
      {Icon && (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-purple-dark/10">
          <Icon className="size-6 text-purple-dark" />
        </div>
      )}
      <div className="flex-1">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-purple-dark">
          Configurar <ArrowRight className="size-3.5" />
        </span>
      </div>
    </button>
  )
}
