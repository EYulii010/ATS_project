import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function Input({ className, label, required, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800",
          "placeholder:text-slate-400",
          "focus:border-blue-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-dark/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ className, label, required, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 resize-none",
          "placeholder:text-slate-400",
          "focus:border-blue-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-dark/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function SearchInput({ className, ...props }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
      <input
        type="search"
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800",
          "placeholder:text-slate-400",
          "focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20",
          className
        )}
        {...props}
      />
    </div>
  )
}
