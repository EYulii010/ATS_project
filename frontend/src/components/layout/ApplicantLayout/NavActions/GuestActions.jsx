import { NavLink } from "react-router-dom";

const GuestActions = () => {
    return (
        <div className="flex items-center justify-end gap-3 min-w-fit">
            {/* Iniciar Sesión — oculto en mobile, va en hamburguesa */}
            <NavLink
                to="/login"
                className="hidden md:block border border-violet-500 text-violet-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-50 transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
                Iniciar Sesión
            </NavLink>
            {/* Registrarse — siempre visible pero más compacto en mobile */}
            <NavLink
                to="/registro"
                className="bg-slate-900 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
            >
                <span className="md:hidden">Registro</span>
                <span className="hidden md:inline">Registrarse</span>
            </NavLink>
        </div>
    )
}

export default GuestActions;