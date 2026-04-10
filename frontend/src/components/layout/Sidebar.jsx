import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const { user, logout } = useAuth();

    const navLinkClass = ({isActive}) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
            ? 'bg-applik-navy text-white shadow-lg shadow-indigo-500/40'
            : 'bg-gradient-purple ' 
        }`
}