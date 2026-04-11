import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../ui/Logo";
import { Layout, LayoutDashboard, Briefcase, Users, BarChart3, Settings, LogOut, User } from "lucide-react";

const Sidebar = () => {
    const { user, logout } = useAuth();

    const navLinkClass = ({isActive}) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-purple-dark hover:text-white ${
            isActive
            ? 'bg-gradient-sidebar text-white font-bold shadow-xs shadow-indigo-500/40' 
            : 'text-slate-400 '
        }`;

    return (
        <aside className="w-64 bg-applik-navy text-white p-6 flex flex-col h-screen left-0 top-0 border-r border-slate-800">
            <div className="flex items-center gap-3 mb-12 px-2">   
                <Logo className="w-12 h-12"/>
                <h2 className="text-2xl font-bold ">APPLIK</h2>
            </div>
            <nav className="flex flex-col space-y-4">
                <NavLink to="/dashboard" className={navLinkClass}>
                    <LayoutDashboard className="w-5 h-5"/>
                    Panel Principal
                </NavLink>
                <NavLink to="/vacantes" className={navLinkClass}>
                    <Briefcase className="w-5 h-5"/>
                    Vacantes
                </NavLink>
                <NavLink to="/candidatos" className={navLinkClass}>
                    <Users className="w-5 h-5"/>    
                    Candidatos
                </NavLink>   
                <NavLink to="/estadistica" className={navLinkClass}>
                    <BarChart3 className="w-5 h-5" />
                    Estadísitca
                </NavLink>
                <NavLink to="/configuracion" className={navLinkClass}>
                    <Settings className="w-5 h-5" />
                    Configuración
                </NavLink>
            </nav>

            {/* Sección de información de usuario */}
            <div className= "pt-4 end-auto mt-auto justify-center">
                <p> {user?.name} </p>
                <p>{user?.email}</p>
                <button onClick={logout} className="mt-2 cursor-pointer flex items-center gap-2 hover:bg-purple-dark p-2 rounded-xl">
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    )
}   

export default Sidebar;