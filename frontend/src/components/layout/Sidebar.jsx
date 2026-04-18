import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../ui/Logo";
import { LayoutDashboard, Briefcase, Users, BarChart3, Settings, LogOut, X } from "lucide-react";

const Sidebar = ({ open, onClose }) => {
    const { user, logout } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-purple-dark hover:text-white ${
            isActive
                ? "bg-gradient-sidebar text-white font-bold shadow-xs shadow-indigo-500/40"
                : "text-slate-400"
        }`;

    return (
        <aside className={`
            fixed md:static inset-y-0 left-0 z-40
            w-64 bg-applik-navy text-white p-6 flex flex-col h-screen
            border-r border-slate-800
            transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
            {/* Logo + close button (mobile) */}
            <div className="flex items-center justify-between mb-12 px-2">
                <div className="flex items-center gap-3">
                    <Logo className="w-10 h-10" />
                    <h2 className="text-2xl font-bold">APPLIK</h2>
                </div>
                <button
                    onClick={onClose}
                    className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Cerrar menú"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex flex-col space-y-4">
                <NavLink to="/dashboard"    className={navLinkClass} onClick={onClose}>
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    Panel Principal
                </NavLink>
                <NavLink to="/vacantes"     className={navLinkClass} onClick={onClose}>
                    <Briefcase className="w-5 h-5 shrink-0" />
                    Vacantes
                </NavLink>
                <NavLink to="/candidatos"   className={navLinkClass} onClick={onClose}>
                    <Users className="w-5 h-5 shrink-0" />
                    Candidatos
                </NavLink>
                <NavLink to="/estadistica"  className={navLinkClass} onClick={onClose}>
                    <BarChart3 className="w-5 h-5 shrink-0" />
                    Estadísticas
                </NavLink>
                <NavLink to="/configuracion" className={navLinkClass} onClick={onClose}>
                    <Settings className="w-5 h-5 shrink-0" />
                    Configuración
                </NavLink>
            </nav>

            {/* Usuario */}
            <div className="mt-auto pt-4 border-t border-slate-700">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate mb-2">{user?.email}</p>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-purple-dark px-2 py-2 rounded-xl transition-all w-full text-sm"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
