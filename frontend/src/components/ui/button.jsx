import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Azul sólido — CTA principal (Guardar Vacante, Confirmar)
        primary:
          "bg-blue-dark text-white hover:bg-blue-dark/90 active:scale-[0.98]",

        // Gradiente púrpura→azul — acción destacada (+ Crear Vacante)
        gradient:
          "bg-gradient-to-r from-purple-dark to-blue-dark text-white hover:opacity-90 active:scale-[0.98] shadow-sm",

        // Borde sin relleno — acción secundaria (Cancelar)
        outline:
          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98]",

        // Rojo — acción destructiva (Descartar)
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",

        // Sin fondo — acción terciaria (Ver Perfil, Editar)
        ghost:
          "text-blue-dark hover:bg-blue-dark/10 active:scale-[0.98]",

        // Píldora teal — sugerencias de mensaje (modal Descartar)
        suggestion:
          "rounded-full bg-teal-light/80 text-white hover:bg-teal-light active:scale-[0.98] w-full justify-start",
      },
      size: {
        sm:   "h-8 px-3 text-xs",
        md:   "h-9 px-4",
        lg:   "h-10 px-5 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
