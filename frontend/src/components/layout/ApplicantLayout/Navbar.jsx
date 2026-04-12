import { NavLink } from "react-router-dom";
import Logo from "../../ui/Logo";
import UserNavActions from "./NavActions/UserNavActions";
import { useAuth } from "@/context/AuthContext";
import RegisterCompanyCTA from "./RegisterCompanyCTA";

const Navbar = () => {
    const navLinkClass = ({isActive}) => 
        `rounded-xl px-4 py-2 transition-all duration-200 whitespace-nowrap text-lg ${
            isActive 
            ? 'bg-purple-100 text-purple-light font-bold' 
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`;

    const { user } = useAuth();

    return (
        <header className="sticky top-0">
            {!user && <RegisterCompanyCTA />}
            <nav className="z-50 w-full h-20 border-b border-slate-200 bg-white">
                <div className="flex justify-between w-full max-w-7xl mx-auto h-full items-center px-4">
                    
                    {/* Logo and stuff */}
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <Logo className="w-10 h-10"/>
                        <h2 className="text-2xl font-bold text-slate-900">APPLIK</h2>
                    </div>

                    <div className="flex shrink-0 justify-center items-center gap-2 md:gap-6 font-bold">
                        <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
                        <NavLink to="/trabajos" className={navLinkClass}>Trabajos</NavLink>
                        <NavLink to="/aplicaciones" className={navLinkClass}>Mis Aplicaciones</NavLink>
                    </div>

                    {/* Acciones de usuario que cambian según el rol del usuario */}
                    <UserNavActions />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;