import { Input, Textarea } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tiposContrato = ["Full Time", "Part Time", "Contrato", "Temporal", "Prácticas"]

export default function VacanteFormModal({ vacante = null, onClose, onSave }) {
  const isEditing = vacante !== null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Editar Vacante" : "Crear Nueva Vacante"}
          </h2>
          <p className="text-sm text-slate-400">
            {isEditing ? "Editar información de vacante existente" : "Completa la información del nuevo puesto"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSave?.() }}>

          <Input
            label="Título del Puesto"
            required
            placeholder="Ej. Gerente de Ventas"
            defaultValue={vacante?.titulo}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Departamento"
              placeholder="Ej. Marketing"
              defaultValue={vacante?.departamento}
            />
            <Input
              label="Ubicación"
              placeholder="Ej. Managua"
              defaultValue={vacante?.ubicacion}
            />
          </div>

          {/* Tipo de Contrato */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Tipo de Contrato</label>
            <select
              defaultValue={vacante?.tipoContrato ?? ""}
              className={cn(
                "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800",
                "focus:border-blue-dark focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-dark/20"
              )}
            >
              <option value="" disabled>Selecciona...</option>
              {tiposContrato.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <Textarea
            label="Descripción del Puesto"
            placeholder="Describe las responsabilidades y objetivos del puesto..."
            defaultValue={vacante?.descripcion}
            rows={3}
          />

          <Textarea
            label="Experiencia Requerida"
            placeholder="Especifica los años y tipo de experiencia necesaria"
            defaultValue={vacante?.experiencia}
            rows={3}
          />

          <Textarea
            label="Requisitos"
            required
            placeholder="Lista los requisitos educativos, técnicos y habilidades necesarias"
            defaultValue={vacante?.requisitos}
            rows={3}
          />

          {/* Rango Salarial */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Rango Salarial
              <span className="ml-1 text-xs text-slate-400">(opcional)</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Mínimo (USD)" defaultValue={vacante?.salarioMin} />
              <Input placeholder="Máximo (USD)" defaultValue={vacante?.salarioMax} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Descartar
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Guardar Cambios" : "Guardar Vacante"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
