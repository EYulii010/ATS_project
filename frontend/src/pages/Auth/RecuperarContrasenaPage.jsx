import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";

const RecuperarContrasenaPage = () => {
    const [email,    setEmail]    = useState("");
    const [enviado,  setEnviado]  = useState(false);
    const [loading,  setLoading]  = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/v1/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error();
            setEnviado(true);
        } catch {
            setError("No se pudo enviar el correo. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* ── Panel izquierdo ── */}
            <div className="hidden md:flex md:w-[55%] lg:w-[58%] flex-col justify-between p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 60%, #1e3a65 100%)" }}>
                <div className="flex items-center gap-2.5">
                    <Logo className="w-9 h-9" />
                    <span className="text-white text-xl font-bold tracking-wide">APPLIK</span>
                </div>
                <div className="space-y-4 flex flex-col items-center text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight w-full">
                        Recupera tu<br />acceso
                    </h1>
                    <p className="text-purple-200 text-sm lg:text-base leading-relaxed max-w-sm">
                        Te enviaremos un enlace para restablecer tu contraseña de forma segura.
                    </p>
                </div>
                <p className="text-purple-300 text-xs">© 2026 Applik. Plataforma de reclutamiento impulsada por IA.</p>
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            </div>

            {/* ── Panel derecho ── */}
            <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10 sm:px-10">

                <div className="flex md:hidden flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 100%)" }}>
                        <div style={{ filter: "brightness(0) invert(1)" }}><Logo className="w-9 h-9" /></div>
                    </div>
                    <span className="text-slate-900 text-xl font-bold tracking-wide">APPLIK</span>
                </div>

                <div className="w-full max-w-sm">
                    {!enviado ? (
                        <>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center md:text-left">¿Olvidaste tu contraseña?</h2>
                            <p className="text-slate-500 text-sm mb-6 text-center md:text-left">
                                Ingresa tu correo y te enviaremos un enlace para restablecerla.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="tu@correo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                <button type="submit" disabled={loading}
                                    className="w-full bg-violet-600 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm disabled:opacity-60 disabled:pointer-events-none">
                                    {loading ? "Enviando..." : "Enviar enlace"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                                <Mail className="size-8 text-violet-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Revisa tu correo</h2>
                            <p className="text-slate-500 text-sm mb-6">
                                Enviamos un enlace de recuperación a <span className="font-medium text-slate-700">{email}</span>
                            </p>
                        </div>
                    )}

                    <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500 hover:text-violet-600 transition-colors">
                        <ArrowLeft className="size-4" />
                        Volver a iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecuperarContrasenaPage;
