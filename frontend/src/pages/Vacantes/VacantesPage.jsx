import { useState } from "react"
import { Plus, Users, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import VacanteFormModal from "./VacanteFormModal"
import DetallesVacantePage from "./DetallesVacantePage"

// Datos de prueba — se reemplazarán con llamadas a la API
const vacantesData = [
  { id: 1, titulo: "Gerente de Ventas",     departamento: "Ventas",     aplicantes: 12, estado: "Activa", fechaPublicacion: "3/3/2026" },
  { id: 2, titulo: "Marketing Specialist",  departamento: "Marketing",  aplicantes: 14, estado: "Activa", fechaPublicacion: "3/3/2026" },
  { id: 3, titulo: "Contador Senior",       departamento: "Finanzas",   aplicantes: 12, estado: "Activa", fechaPublicacion: "3/3/2026" },
  { id: 4, titulo: "Desarrollador Web",     departamento: "Tecnología", aplicantes: 12, estado: "Activa", fechaPublicacion: "3/3/2026" },
]

// Vista: "list" | "detalles"
// Modal: null | "crear" | "editar"

export default function VacantesPage() {
  const [busqueda, setBusqueda]     = useState("")
  const [vista, setVista]           = useState("list")
  const [vacanteActiva, setVacante] = useState(null)
  const [modal, setModal]           = useState(null)

  const vacantesFiltradas = vacantesData.filter((v) =>
    v.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.departamento.toLowerCase().includes(busqueda.toLowerCase())
  )

  const abrirDetalles = (vacante) => { setVacante(vacante); setVista("detalles") }
  const volverALista  = () => { setVista("list"); setVacante(null) }
  const abrirEditar   = () => setModal("editar")
  const cerrarModal   = () => setModal(null)

  // Vista detalle
  if (vista === "detalles") {
    return (
      <>
        <DetallesVacantePage onBack={volverALista} onEdit={abrirEditar} />
        {modal === "editar" && (
          <VacanteFormModal vacante={vacanteActiva} onClose={cerrarModal} onSave={cerrarModal} />
        )}
      </>
    )
  }

  // Vista lista
  return (
    <div className="space-y-6 p-6 bg-applik-bg min-h-screen">

      {/* Modales disponibles desde la lista */}
      {modal === "crear" && (
        <VacanteFormModal onClose={cerrarModal} onSave={cerrarModal} />
      )}
      {modal === "editar" && (
        <VacanteFormModal vacante={vacanteActiva} onClose={cerrarModal} onSave={cerrarModal} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vacantes</h1>
          <p className="text-sm text-slate-400">Gestiona todas tus posiciones abiertas</p>
        </div>
        <Button variant="gradient" onClick={() => setModal("crear")}>
          <Plus /> Crear Vacante
        </Button>
      </div>

      {/* Tabla */}
      <Card>
        <CardContent>

          {/* Búsqueda */}
          <div className="mb-4">
            <SearchInput
              placeholder="Buscar vacantes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Título</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Departamento</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Aplicantes</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Estado</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {vacantesFiltradas.map((v) => (
                  <tr key={v.id} className="border-b border-slate-50 last:border-0">

                    <td className="py-3">
                      <button
                        onClick={() => abrirDetalles(v)}
                        className="text-left cursor-pointer hover:text-blue-dark transition-colors"
                      >
                        <p className="font-medium text-slate-800">{v.titulo}</p>
                        <p className="text-xs text-slate-400">Publicado {v.fechaPublicacion}</p>
                      </button>
                    </td>

                    <td className="py-3 text-slate-600">{v.departamento}</td>

                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Users className="size-4 text-slate-400" />
                        {v.aplicantes}
                      </span>
                    </td>

                    <td className="py-3">
                      <span className="rounded-full bg-teal-light/20 px-3 py-0.5 text-xs font-medium text-teal-dark">
                        {v.estado}
                      </span>
                    </td>

                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setVacante(v); setModal("editar") }}
                      >
                        <Pencil /> Editar
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {vacantesFiltradas.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">
                No se encontraron vacantes
              </p>
            )}
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
