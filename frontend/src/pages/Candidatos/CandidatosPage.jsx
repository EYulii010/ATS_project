import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { Filter } from "lucide-react"
import { Avatar } from "@/components/ui/Avatar"
import { StageBadge } from "@/components/ui/StageBadge"
import { SearchInput } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/Card"
import ActualizarEtapaModal from "./ActualizarEtapaModal"
import DescartarModal from "./DescartarModal"
import ProgramarEntrevistaModal from "./ProgramarEntrevistaModal"
import EnviarCorreoModal from "./EnviarCorreoModal"
import DetallesCandidatoPage from "./DetallesCandidatoPage"

const filtrosOpciones = {
  vacantes:    ["Gerente de Ventas", "Gerente de Operaciones", "Desarrollador Frontend", "Contador Senior"],
  area:        ["Gerencia", "Marketing", "Finanzas", "Operaciones", "IT"],
  reclutador:  ["Cristiana Espinoza", "Martha Torres", "Felix Urrutia"],
}

function FiltroBtn({ tipo, opciones, seleccionados, onChange }) {
  const [abierto, setAbierto] = useState(false)
  const [pos, setPos]         = useState({ top: 0, left: 0 })
  const btnRef      = useRef(null)
  const dropdownRef = useRef(null)
  const label = tipo.charAt(0).toUpperCase() + tipo.slice(1)

  useEffect(() => {
    const handler = (e) => {
      if (
        btnRef.current      && !btnRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) setAbierto(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleToggle = () => {
    if (!abierto && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 4, left: rect.left })
    }
    setAbierto((v) => !v)
  }

  const toggleOpcion = (opcion) => {
    const nuevos = seleccionados.includes(opcion)
      ? seleccionados.filter((o) => o !== opcion)
      : [...seleccionados, opcion]
    onChange(nuevos)
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all whitespace-nowrap ${
          seleccionados.length > 0
            ? "border-blue-dark bg-blue-dark/5 text-blue-dark"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
        }`}
      >
        <Filter className="size-3.5" />
        {label}
        {seleccionados.length > 0 && (
          <span className="rounded-full bg-blue-dark text-white text-xs px-1.5 py-0.5">
            {seleccionados.length}
          </span>
        )}
      </button>

      {abierto && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-50 min-w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-lg"
          style={{ top: pos.top, left: pos.left }}
        >
          {opciones.map((opcion) => (
            <button
              key={opcion}
              onClick={() => toggleOpcion(opcion)}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors ${
                seleccionados.includes(opcion) ? "text-blue-dark bg-blue-dark/5" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className={`size-3.5 rounded border flex items-center justify-center shrink-0 ${
                seleccionados.includes(opcion) ? "border-blue-dark bg-blue-dark" : "border-slate-300"
              }`}>
                {seleccionados.includes(opcion) && <span className="text-white text-xs leading-none">✓</span>}
              </span>
              {opcion}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}

function FiltrosPanel({ filtros, onChange, onLimpiar }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {Object.entries(filtrosOpciones).map(([tipo, opciones]) => (
        <FiltroBtn
          key={tipo}
          tipo={tipo}
          opciones={opciones}
          seleccionados={filtros[tipo]}
          onChange={(vals) => onChange(tipo, vals)}
        />
      ))}
      {Object.values(filtros).some((f) => f.length > 0) && (
        <button onClick={onLimpiar} className="text-xs text-slate-400 hover:text-slate-600 shrink-0 whitespace-nowrap">
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

const candidatosData = [
  { id: 1, nombre: "Osvaldo Rodriguez", email: "o.rodriguez@gmail.com", posicion: "Gerente de Ventas",      ciudad: "Managua", score: 94, etapa: "Recibido",        area: "Gerencia",    reclutador: "Cristiana Espinoza" },
  { id: 2, nombre: "Endy Gonzalez",     email: "e.gonzalez@gmail.com",  posicion: "Gerente de Operaciones", ciudad: "León",    score: 86, etapa: "Analizado",       area: "Operaciones", reclutador: "Felix Urrutia"      },
  { id: 3, nombre: "Martha Torres",     email: "m.torres@gmail.com",    posicion: "Desarrollador Frontend", ciudad: "Granada", score: 89, etapa: "Seleccionado",    area: "IT",          reclutador: "Martha Torres"      },
  { id: 4, nombre: "David Espinoza",    email: "d.espinoza@gmail.com",  posicion: "Contador Senior",        ciudad: "Managua", score: 80, etapa: "Bajo Entrevista", area: "Finanzas",    reclutador: "Cristiana Espinoza" },
]

function MatchScoreBar({ score }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-dark to-teal-light"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-700">{score}%</span>
    </div>
  )
}

// Menú de acciones por candidato — usa portal para no quedar atrapado en overflow de la tabla
function AccionesMenu({ pos, onActualizar, onDescartar, onEntrevista, onCorreo, onClose }) {
  return createPortal(
    <div
      className="fixed z-50 w-52 rounded-xl border border-slate-100 bg-white py-1 shadow-lg"
      style={{ top: pos.top, right: pos.right }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => { onActualizar(); onClose() }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        → Actualizar Etapa
      </button>
      <button
        onClick={() => { onEntrevista(); onClose() }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        📅 Programar Entrevista
      </button>
      <button
        onClick={() => { onCorreo(); onClose() }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        ✉️ Enviar Correo
      </button>
      <hr className="my-1 border-slate-100" />
      <button
        onClick={() => { onDescartar(); onClose() }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
      >
        🗑️ Descartar
      </button>
    </div>,
    document.body
  )
}

export default function CandidatosPage() {
  const [candidatos, setCandidatos]   = useState(candidatosData)
  const [busqueda, setBusqueda]       = useState("")
  const [filtros, setFiltros]         = useState({ vacantes: [], area: [], reclutador: [] })
  const [menuAbierto, setMenu]        = useState(null)   // id del candidato con menú abierto
  const [menuPos, setMenuPos]         = useState({ top: 0, right: 0 })
  const [modal, setModal]             = useState(null)   // "etapa" | "descartar" | null
  const [candidatoActivo, setCandidato] = useState(null)
  const [vista, setVista]             = useState("list") // "list" | "detalles"

  const filtrados = candidatos.filter((c) => {
    const matchBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.posicion.toLowerCase().includes(busqueda.toLowerCase())
    const matchVacantes   = filtros.vacantes.length   === 0 || filtros.vacantes.includes(c.posicion)
    const matchArea       = filtros.area.length       === 0 || filtros.area.includes(c.area)
    const matchReclutador = filtros.reclutador.length === 0 || filtros.reclutador.includes(c.reclutador)
    return matchBusqueda && matchVacantes && matchArea && matchReclutador
  })

  const abrirDetalles   = (c) => { setCandidato(c); setVista("detalles") }
  const volverALista    = () => { setVista("list"); setCandidato(null) }
  const abrirEtapa        = (c) => { setCandidato(c); setModal("etapa") }
  const abrirDescartar    = (c) => { setCandidato(c); setModal("descartar") }
  const abrirEntrevista   = (c) => { setCandidato(c); setModal("entrevista") }
  const abrirCorreo       = (c) => { setCandidato(c); setModal("correo") }
  const cerrarModal     = () => setModal(null)

  const confirmarEtapa = async (nuevaEtapa) => {
    if (candidatoActivo.application_id) {
      try {
        await fetch(
          `${import.meta.env.VITE_TALENT_SERVICE_URL}/api/v1/talents/applications/${candidatoActivo.application_id}/stage`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ stage: nuevaEtapa }),
          }
        )
      } catch { /* falla silencioso — UI se actualiza igual */ }
    }
    setCandidatos((prev) =>
      prev.map((c) => c.id === candidatoActivo.id ? { ...c, etapa: nuevaEtapa } : c)
    )
    cerrarModal()
  }

  const confirmarDescartar = () => {
    setCandidatos((prev) => prev.filter((c) => c.id !== candidatoActivo.id))
    cerrarModal()
  }

  if (vista === "detalles") {
    return (
      <>
        <DetallesCandidatoPage
          candidato={candidatoActivo}
          onBack={volverALista}
          onActualizarEtapa={() => abrirEtapa(candidatoActivo)}
          onDescartar={() => abrirDescartar(candidatoActivo)}
        />
        {modal === "etapa" && (
          <ActualizarEtapaModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={confirmarEtapa} />
        )}
        {modal === "descartar" && (
          <DescartarModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={confirmarDescartar} />
        )}
        {modal === "entrevista" && (
          <ProgramarEntrevistaModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={cerrarModal} />
        )}
        {modal === "correo" && (
          <EnviarCorreoModal candidato={candidatoActivo} onClose={cerrarModal} />
        )}
      </>
    )
  }

  return (
    <div className="space-y-6 bg-applik-bg min-h-screen" onClick={() => setMenu(null)}>

      {/* Modales */}
      {modal === "etapa" && (
        <ActualizarEtapaModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={confirmarEtapa} />
      )}
      {modal === "descartar" && (
        <DescartarModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={confirmarDescartar} />
      )}
      {modal === "entrevista" && (
        <ProgramarEntrevistaModal candidato={candidatoActivo} onClose={cerrarModal} onConfirm={cerrarModal} />
      )}
      {modal === "correo" && (
        <EnviarCorreoModal candidato={candidatoActivo} onClose={cerrarModal} />
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Candidatos</h1>
        <p className="text-sm text-slate-400">Gestiona todos tus candidatos en un solo lugar</p>
      </div>

      <Card>
        <CardContent>

          {/* Búsqueda + Filtros */}
          <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <SearchInput
                placeholder="Buscar candidatos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <FiltrosPanel
              filtros={filtros}
              onChange={(tipo, vals) => setFiltros((prev) => ({ ...prev, [tipo]: vals }))}
              onLimpiar={() => setFiltros({ vacantes: [], area: [], reclutador: [] })}
            />
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Candidato</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Posición Aplicada</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Match Score</th>
                  <th className="pb-3 text-left text-xs font-medium text-slate-400">Etapa</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 last:border-0">

                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.nombre} size="sm" />
                        <div>
                          <p className="font-medium text-slate-800">{c.nombre}</p>
                          <p className="text-xs text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <p className="text-slate-700">{c.posicion}</p>
                      <p className="text-xs text-slate-400">{c.ciudad}</p>
                    </td>

                    <td className="py-3">
                      <MatchScoreBar score={c.score} />
                    </td>

                    <td className="py-3">
                      <StageBadge stage={c.etapa} />
                    </td>

                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => abrirDetalles(c)}
                        >
                          Ver Perfil
                        </Button>
                        <div onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              if (menuAbierto === c.id) { setMenu(null); return }
                              const rect = e.currentTarget.getBoundingClientRect()
                              const menuHeight = 164
                              const spaceBelow = window.innerHeight - rect.bottom
                              const top = spaceBelow < menuHeight
                                ? rect.top - menuHeight - 4
                                : rect.bottom + 4
                              setMenuPos({ top, right: window.innerWidth - rect.right })
                              setMenu(c.id)
                            }}
                          >
                            ···
                          </Button>
                          {menuAbierto === c.id && (
                            <AccionesMenu
                              pos={menuPos}
                              onActualizar={() => abrirEtapa(c)}
                              onDescartar={() => abrirDescartar(c)}
                              onEntrevista={() => abrirEntrevista(c)}
                              onCorreo={() => abrirCorreo(c)}
                              onClose={() => setMenu(null)}
                            />
                          )}
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {filtrados.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">No se encontraron candidatos</p>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
