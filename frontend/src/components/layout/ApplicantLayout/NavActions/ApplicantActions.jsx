import { Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const ApplicantActions = () => {
    const { user } = useAuth();

    return (
        <div className="flex items-center justify-end gap-3">
            <Link 
                to='/notificaciones'
                className="group relative transition-transform duration-200 active:scale-95 hover:bg-slate-100 p-2 rounded-full"    
            >
                <Bell size={20} />  
            </Link>
            <Link 
                to='/perfil'
                className="group relative transition-transform duration-200 active:scale-95 rounded-full hover:bg-slate-100"
                aria-label="Ver Perfil"
            >
                <Avatar name={user?.name} size="md" className="border-2 border-white shadow-sm ring-2 ring-offset-4 group-hover:ring-teal-dark"/>
            </Link>
        </div>
    )
}

export default ApplicantActions;