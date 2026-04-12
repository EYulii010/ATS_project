import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import NavSearch from "../NavSearch";

const GuestActions = () => {
    return (
        <div className="flex flex-1 items-center mx-2 justify-end gap-6 min-w-fit">
            {/* Búsqueda de trabajos */}
            <NavSearch />
            {/* Acciones de autenticación */}
            <NavLink 
                to="/login" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
                Iniciar Sesión
            </NavLink>
            <NavLink 
                to="/registro" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all active:scale-95"
            >
                Registrarse
            </NavLink>
        </div>
    )
}

export default GuestActions;