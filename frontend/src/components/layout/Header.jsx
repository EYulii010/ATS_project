import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { Bell, Menu } from "lucide-react";

const Header = ({ onMenuToggle }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 md:rounded-4xl md:w-[95%] md:mx-auto md:mt-4 shadow-sm shrink-0">

            {/* Izquierda: hamburguesa (mobile) + empresa */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
                    aria-label="Abrir menú"
                >
                    <Menu size={22} />
                </button>
                <p className="text-slate-900 font-semibold text-lg md:text-2xl truncate">
                    {user?.tenant_name}
                </p>
            </div>

            {/* Derecha: notificaciones + avatar */}
            <div className="flex items-center gap-2 md:gap-4">
                <Link
                    className="group relative transition-transform duration-200 active:scale-95 hover:bg-slate-100 p-2 rounded-full"
                    to="configuracion/notificaciones"
                >
                    <Bell className="w-5 h-5 md:w-7 md:h-7" />
                </Link>
                <Link
                    to="/configuracion/perfil"
                    className="group relative transition-transform duration-200 active:scale-95 rounded-full hover:bg-slate-100"
                    aria-label="Ver Perfil"
                >
                    <Avatar name={user?.name} size="md" className="border-2 border-white shadow-sm ring-2 ring-offset-2 group-hover:ring-teal-dark" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
