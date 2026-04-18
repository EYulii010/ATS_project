import { NavLink } from "react-router-dom";

const RegisterCompanyCTA = () => {
    return (
        <div className="w-full bg-gradient-purple py-2.5 text-white transition-all duration-200">
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 text-xs md:text-sm max-w-7xl mx-auto px-4 text-center">
                <span className="opacity-90">¿Buscas el mejor talento para tu equipo?</span>
                <NavLink
                    to="/registrar-empresa"
                    className="underline decoration-teal-light underline-offset-4 hover:text-applik-selected transition-colors font-bold whitespace-nowrap"
                >
                    Registra tu empresa aquí
                </NavLink>
            </div>
            
        </div>
    )
}

export default RegisterCompanyCTA;