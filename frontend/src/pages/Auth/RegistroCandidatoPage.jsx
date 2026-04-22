import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { registerApplicant } from "@/api/auth";
import Ley787Modal from "@/components/ui/Ley787Modal";

const RegistroCandidatoPage = () => {
    const [firstName,       setFirstName]       = useState("");
    const [lastName,        setLastName]        = useState("");
    const [email,           setEmail]           = useState("");
    const [password,        setPassword]        = useState("");
    const [confirmar,       setConfirmar]       = useState("");
    const [law787,          setLaw787]          = useState(false);
    const [modalLey,        setModalLey]        = useState(false);
    const [showPassword,    setShowPassword]    = useState(false);
    const [showConfirmar,   setShowConfirmar]   = useState(false);
    const [error,           setError]           = useState("");
    const [loading,         setLoading]         = useState(false);

    const { login } = useAuth();
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmar) { setError("Las contraseñas no coinciden"); return; }
        if (!law787) { setError("Debes aceptar los términos de la Ley 787"); return; }
        setError("");
        setLoading(true);
        try {
            const { data } = await registerApplicant({ email, password, first_name: firstName, last_name: lastName });
            await login(data.token);
            navigate("/trabajos");
        } catch (err) {
            setError(err.message);
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
                        Tu próxima oportunidad<br />te está esperando
                    </h1>
                    <p className="text-purple-200 text-sm lg:text-base leading-relaxed max-w-sm">
                        Crea tu perfil y conecta con las mejores empresas de Nicaragua en segundos.
                    </p>

                    <div className="w-full max-w-sm space-y-3 mt-4">
                        {[
                            "Match IA con vacantes que encajan contigo",
                            "Aplica a múltiples empresas desde un solo lugar",
                            "Seguimiento en tiempo real de tus aplicaciones",
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 text-left">
                                <CheckCircle2 className="size-4 text-purple-300 shrink-0" />
                                <span className="text-white text-sm">{b}</span>
                            </div>
                        ))}
                    </div>
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
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center md:text-left">Crear cuenta</h2>
                    <p className="text-slate-500 text-sm mb-6 text-center md:text-left">Regístrate como candidato y empieza a aplicar.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Nombre + Apellido */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                    <input type="text" placeholder="Tu nombre" value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} required
                                        className="w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                                <input type="text" placeholder="Tu apellido" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} required
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input type="email" placeholder="tu@correo.com" value={email}
                                    onChange={(e) => setEmail(e.target.value)} required
                                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all" />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input type={showPassword ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={password}
                                    onChange={(e) => setPassword(e.target.value)} required
                                    className="w-full border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all" />
                                <button type="button" onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirmar */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input type={showConfirmar ? "text" : "password"} placeholder="Repite tu contraseña" value={confirmar}
                                    onChange={(e) => { setConfirmar(e.target.value); setError("") }} required
                                    className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                                        error ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-violet-400 focus:border-transparent"
                                    }`} />
                                <button type="button" onClick={() => setShowConfirmar(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
                                    {showConfirmar ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Ley 787 */}
                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input type="checkbox" checked={law787} readOnly
                                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-400 shrink-0 cursor-pointer" />
                            <span className="text-xs text-slate-500 leading-relaxed">
                                He leído y acepto el tratamiento de mis datos personales conforme a la{" "}
                                <button type="button" onClick={() => setModalLey(true)}
                                    className="font-medium text-violet-600 hover:text-violet-700 underline underline-offset-2 transition-colors">
                                    Ley 787 de Protección de Datos Personales
                                </button>{" "}de Nicaragua.
                            </span>
                        </label>
                        {modalLey && (
                            <Ley787Modal
                                onAceptar={() => { setLaw787(true); setModalLey(false); setError("") }}
                                onCerrar={() => setModalLey(false)}
                            />
                        )}

                        {error && <p className="text-xs text-red-500">{error}</p>}

                        <button type="submit" disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm mt-2 disabled:opacity-60 disabled:pointer-events-none">
                            {loading ? "Creando cuenta..." : "Crear cuenta"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">Iniciar sesión</Link>
                    </p>
                    <p className="text-center text-sm text-slate-400 mt-2">
                        ¿Eres una empresa?{" "}
                        <Link to="/registrar-empresa" className="text-violet-600 hover:text-violet-700 font-medium">Regístrate aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistroCandidatoPage;
