import { useState, useEffect } from "react"
import { Plus, Users, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import VacanteFormModal from "./VacanteFormModal"
import DetallesVacantePage from "./DetallesVacantePage"

export default function VacantesPage() {
  const [busqueda, setBusqueda]     = useState("")
  const [vista, setVista]           = useState("list")
  const [vacanteActiva, setVacante] = useState(null)
  const [modal, setModal]           = useState(null)
  const [vacantes, setVacantes]     = useState([])
  const [cargando, setCargando]     = useState(true)

  const token = localStorage.getItem("applik_token")

  const cargarVacantes = () => {
    if (!token) return
    setCargando(true)
    fetch(`${import.meta.env.VITE_JOB_SERVICE_URL}/api/v1/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setVacantes(Array.isArray(data.data) ? data.data : []))
      .catch(() => {})
      .finally(() => setCargando(false))
  }

  useEffect(() => { cargarVacantes() }, [])

  const vacantesFiltradas = vacantes.filter((v) =>
    v.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    (v.Department?.name ?? "").toLowerCase().includes(busqueda.toLowerCase())
  )

  const abrirDetalles = (vacante) => { setVacante(vacante); setVista("detalles") }
  const volverALista  = () => { setVista("list"); setVacante(null) }
  const abrirEditar   = () => setModal("editar")
  const cerrarModal   = () => { setModal(null); cargarVacantes() }

  if (vista === "detalles") {
    return (
      <>
        <DetallesVacantePage vacante={vacanteActiva} onBack={volverALista} onEdit={abrirEditar} onStatusChange={() => { volverALista(); cargarVacantes() }} />
        {modal === "editar" && (
          <VacanteFormModal vacante={vacanteActiva} onClose={cerrarModal} onSave={cerrarModal} />
        )}
      </>
    )
  }

  return (
    <div className="space-y-6 bg-applik-bg min-h-screen">

      {modal === "crear" && (
        <VacanteFormModal onClose={cerrarModal} onSave={cerrarModal} />
      )}
      {modal === "editar" && (
        <VacanteFormModal vacante={vacanteActiva} onClose={cerrarModal} onSave={cerrarModal} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Vacantes</h1>
          <p className="text-sm text-slate-400">Gestiona todas tus posiciones abiertas</p>
        </div>
        <Button variant="gradient" onClick={() => setModal("crear")} className="w-full sm:w-auto">
          <Plus /> Crear Vacante
        </Button>
      </div>

      {/* Tabla */}
      <Card>
        <CardContent>
          <div className="mb-4">
            <SearchInput
              placeholder="Buscar vacantes..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
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
                        <p className="font-medium text-slate-800">{v.title}</p>
                        <p className="text-xs text-slate-400">Publicado {new Date(v.createdAt).toLocaleDateString("es-NI")}</p>
                      </button>
                    </td>

                    <td className="py-3 text-slate-600 whitespace-nowrap">{v.Department?.name ?? "—"}</td>

                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Users className="size-4 text-slate-400" />
                        {v.application_count ?? 0}
                      </span>
                    </td>

                    <td className="py-3">
                      <span className="rounded-full bg-teal-light/20 px-3 py-0.5 text-xs font-medium text-teal-dark whitespace-nowrap">
                        {v.status === "published" ? "Activa" : v.status === "draft" ? "Borrador" : v.status === "paused" ? "Pausada" : "Cerrada"}
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

            {cargando && (
              <p className="py-8 text-center text-sm text-slate-400">Cargando vacantes...</p>
            )}
            {!cargando && vacantesFiltradas.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">No se encontraron vacantes</p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
