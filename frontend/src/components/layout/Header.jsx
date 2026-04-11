import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import  { Avatar }  from "../ui/Avatar";
import { Bell } from 'lucide-react';

const Header = () => {
    const { user } = useAuth()
    
    const handleNotification = () => {

    }

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10  rounded-4xl w-[95%] mx-auto mt-4 shadow-sm">
            {/* Izq: Contexto de empresa  */}
            <div >
                <p className="text-slate-900 font-semibold text-2xl">{user?.tenant_name}</p>
            </div>
            {/* Derecha: Usuario y notificaciones */}
            <div className="flex items-center gap-4">
                {/* Hace falta la funcionalidad */}
                <Link className="group relative transition-transform duration-200 active:scale-95 hover:bg-slate-100 p-2 rounded-full">
                    <Bell className="w-7 h-7"/>
                </Link>
                <Link 
                    to='/profile'
                    className="group relative transition-transform duration-200 active:scale-95 rounded-full hover:bg-slate-100"
                    aria-label="Ver Perfil">
                        <Avatar name={user?.name} size="md" className="border-2 border-white shadow-sm ring-2 ring-offset-2 group-hover:ring-teal-dark"/>
                </Link> 
            </div>
        </header>
    );
}

export default Header;