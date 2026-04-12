import { useState } from "react"
import { Button } from "@/components/ui/button"

const sugerencias = [
  "Muchas gracias por tu tiempo y participación",
  "En esta ocasión continuaremos con otros perfiles",
  "Te deseamos éxito en tu búsqueda laboral",
]

export default function DescartarModal({ candidato, onClose, onConfirm }) {
  const [mensaje, setMensaje] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-lg font-bold text-slate-800">Descartar</h2>

        {/* Textarea */}
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          rows={3}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-dark/20 resize-none"
        />

        {/* Sugerencias */}
        <div className="mt-3 space-y-2">
          {sugerencias.map((s) => (
            <Button
              key={s}
              variant="suggestion"
              className="whitespace-normal text-left h-auto py-2"
              onClick={() => setMensaje(s)}
            >
              {s}
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={() => onConfirm(mensaje)}>Descartar</Button>
        </div>

      </div>
    </div>
  )
}
