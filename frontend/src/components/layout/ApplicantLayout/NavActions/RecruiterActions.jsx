import { Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { Link, NavLink } from "react-router-dom";

const RecruiterActions = () => {
    const { user } = useAuth();

    return (
        <div className="flex items-center justify-end gap-3">
            {/* Dashboard — oculto en mobile, visible en desktop */}
            <NavLink
                to="/dashboard"
                className="hidden md:block bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gradient-teal transition-all duration-200 active:scale-95"
            >
                Dashboard
            </NavLink>
            <Link 
                to='/perfil'
                className="group relative transition-transform duration-200 active:scale-95 rounded-full hover:bg-slate-100"
                aria-label="Ver Perfil"
            >
                <Avatar name={user?.name} size="md" className="border-2 border-white shadow-sm ring-2 ring-offset-4 group-hover:ring-teal-dark"/>
            </Link>
        </div>
    );
};

 
export default RecruiterActions;
