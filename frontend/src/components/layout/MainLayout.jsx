import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import  Sidebar  from "./Sidebar";

const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-applik-bg">
            {/* SIDEBAR: Falta estilo y indicador <<you are here>> */}
            <Sidebar />
        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
            <Outlet />
        </main>
        </div>
    );
}

export default MainLayout;