import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
    const [tab, setTab] = useState("candidato");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login hasta que el backend esté listo
        const mockUser = {
            id: 102,
            name: "Usuario",
            email,
            role: tab === "candidato" ? "aplicante" : "reclutador",
            tenant_name: tab === "empresa" ? "Mi Empresa" : null,
            avatar_color: "from-purple-500 to-purple-700",
        };
        login(mockUser);
        navigate(tab === "empresa" ? "/dashboard" : "/trabajos");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* ── Panel izquierdo (branded) ── */}
            <div className="hidden md:flex md:w-[55%] lg:w-[58%] flex-col justify-between p-10 relative overflow-hidden"
                style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 60%, #1e3a65 100%)" }}>

                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <Logo className="w-9 h-9" />
                    <span className="text-white text-xl font-bold tracking-wide">APPLIK</span>
                </div>

                {/* Headline */}
                <div className="space-y-4 flex flex-col items-center text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight w-full">
                        No busques más.<br />Mejor, Applik
                    </h1>
                    <p className="text-purple-200 text-sm lg:text-base leading-relaxed max-w-sm">
                        El ecosistema inteligente donde las empresas encuentran su pieza clave y el talento su lugar ideal.
                    </p>

                    {/* Match Score card */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-full max-w-sm mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Match Score IA</span>
                            <span className="text-white font-bold text-sm">94%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                            <div className="h-2 rounded-full bg-gradient-to-r from-purple-300 to-blue-300" style={{ width: "94%" }} />
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-4 mt-4">
                        {[
                            { label: "Candidatos", value: "284" },
                            { label: "Vacantes",   value: "12"  },
                            { label: "Tiempo",     value: "18d" },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                                <div className="text-white font-bold text-lg">{value}</div>
                                <div className="text-purple-200 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-purple-300 text-xs">
                    © 2026 Applik. Recruitment platform powered by AI.
                </p>

                {/* Decorative circle */}
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            </div>

            {/* ── Panel derecho (formulario) ── */}
            <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10 sm:px-10">

                {/* Logo mobile — solo visible en mobile */}
                <div className="flex md:hidden flex-col items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(150deg, #8B7CF6 0%, #514990 100%)" }}>
                        <div style={{ filter: "brightness(0) invert(1)" }}>
                            <Logo className="w-9 h-9" />
                        </div>
                    </div>
                    <span className="text-slate-900 text-xl font-bold tracking-wide">APPLIK</span>
                </div>

                <div className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center md:text-left">Iniciar sesión</h2>
                    <p className="text-slate-500 text-sm mb-6 text-center md:text-left">Bienvenido de nuevo. Ingresa para continuar.</p>

                    {/* Tab toggle */}
                    <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
                        {["candidato", "empresa"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                                    tab === t
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {t === "candidato" ? "Candidato" : "Empresa"}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="c.aspirece@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-400"
                                />
                                <span className="text-sm text-slate-600">Recordar contraseña</span>
                            </label>
                            <Link to="/recuperar-contrasena" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm mt-2"
                        >
                            Entrar
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400">o continúa con</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Social */}
                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-700 font-medium hover:bg-slate-50 transition-all active:scale-[0.98]">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm text-slate-700 font-medium hover:bg-slate-50 transition-all active:scale-[0.98]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                            LinkedIn
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-violet-600 hover:text-violet-700 font-medium">
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
