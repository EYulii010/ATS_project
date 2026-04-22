import { useState, useRef } from "react"
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react"
import Ley787Modal from "@/components/ui/Ley787Modal"

async function extractText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result ?? "")
    reader.onerror = reject
    reader.readAsText(file, "utf-8")
  })
}

export default function CvDropzone({ jobToken, onSuccess }) {
  const [archivo,     setArchivo]     = useState(null)
  const [rawText,     setRawText]     = useState("")
  const [ley787,      setLey787]      = useState(false)
  const [modalLey,    setModalLey]    = useState(false)
  const [arrastrando, setArrastrando] = useState(false)
  const [leyendo,     setLeyendo]     = useState(false)
  const [enviando,    setEnviando]    = useState(false)
  const [error,       setError]       = useState("")
  const [exito,       setExito]       = useState(false)
  const inputRef = useRef(null)

  const procesarArchivo = async (file) => {
    if (!file) return
    const ext = file.name.split(".").pop().toLowerCase()
    if (!["pdf", "txt", "doc", "docx"].includes(ext)) {
      setError("Solo se aceptan archivos PDF, TXT o DOC")
      return
    }
    setArchivo(file)
    setError("")
    setRawText("")
    setLeyendo(true)
    try {
      const text = await extractText(file)
      const limpio = text.replace(/[^\x20-\x7E\xC0-\xFF\n]/g, " ").replace(/\s+/g, " ").trim()
      if (limpio.length < 20) {
        setError("No se pudo leer texto del archivo. Por favor sube tu CV en formato .txt")
        setArchivo(null)
      } else {
        setRawText(limpio)
      }
    } catch {
      setError("Error al leer el archivo. Intenta con formato .txt")
      setArchivo(null)
    } finally {
      setLeyendo(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setArrastrando(false)
    const file = e.dataTransfer.files[0]
    if (file) procesarArchivo(file)
  }

  const handleEnviar = async () => {
    if (!rawText || !ley787) return
    if (!jobToken) {
      setError("Esta vacante no tiene enlace público de postulación.")
      return
    }
    setEnviando(true)
    setError("")
    try {
      const res = await fetch(`${import.meta.env.VITE_TALENT_SERVICE_URL}/api/v1/talents/public/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawCvText: rawText, law787Accepted: true, jobToken }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Error al enviar la postulación")
      setExito(true)
      onSuccess?.()
    } catch (err) {
      setError(err.message ?? "No se pudo enviar. Intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  if (exito) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <CheckCircle2 className="size-10 text-teal-500" />
        <p className="font-semibold text-teal-800">¡Postulación enviada exitosamente!</p>
        <p className="text-sm text-teal-600">Hemos recibido tu CV. El equipo de reclutamiento lo revisará pronto.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Zona de drop */}
      <div
        onDragOver={e => { e.preventDefault(); setArrastrando(true) }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          arrastrando
            ? "border-violet-400 bg-violet-50"
            : archivo && rawText
            ? "border-teal-300 bg-teal-50"
            : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          className="hidden"
          onChange={e => procesarArchivo(e.target.files[0])}
        />

        {leyendo ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 text-violet-400 animate-spin" />
            <p className="text-sm text-slate-500">Leyendo archivo...</p>
          </div>
        ) : archivo && rawText ? (
          <div className="flex flex-col items-center gap-2">
            <FileText className="size-8 text-teal-500" />
            <p className="text-sm font-medium text-teal-700">{archivo.name}</p>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); setArchivo(null); setRawText("") }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="size-3" /> Quitar archivo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="size-8 text-slate-300" />
            <div>
              <p className="text-sm font-medium text-slate-600">Arrastra tu CV aquí</p>
              <p className="text-xs text-slate-400 mt-0.5">o haz clic para seleccionar · PDF, TXT o DOC</p>
            </div>
          </div>
        )}
      </div>

      {/* Ley 787 */}
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={ley787}
          readOnly
          className="mt-0.5 rounded border-slate-300 text-violet-600 focus:ring-violet-400"
        />
        <span className="text-xs text-slate-500 leading-relaxed">
          He leído y acepto el tratamiento de mis datos personales conforme a la{" "}
          <button
            type="button"
            onClick={() => setModalLey(true)}
            className="underline text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            Ley 787 de Protección de Datos Personales
          </button>{" "}
          de Nicaragua.
        </span>
      </label>

      {modalLey && (
        <Ley787Modal
          onAceptar={() => { setLey787(true); setModalLey(false) }}
          onCerrar={() => setModalLey(false)}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={handleEnviar}
        disabled={!rawText || !ley787 || enviando}
        className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {enviando
          ? <span className="flex items-center justify-center gap-2"><Loader2 className="size-4 animate-spin" /> Enviando...</span>
          : "Enviar postulación"
        }
      </button>
    </div>
  )
}
