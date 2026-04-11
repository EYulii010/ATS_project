import { cn } from "@/lib/utils"

// Gradientes del brand rotados por índice para dar variedad visual
const gradients = [
  "from-blue-dark to-teal-light",
  "from-purple-dark to-blue-dark",
  "from-teal-dark to-blue-light",
  "from-purple-light to-purple-dark",
]

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function getGradient(name = "") {
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

const sizeClasses = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-20 text-xl",
}

export function Avatar({ name, src, size = "sm", className }) {
  const initials = getInitials(name)
  const gradient = getGradient(name)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover shrink-0",
          sizeClasses[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center shrink-0 font-semibold text-white",
        gradient,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  )
}
