import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import  Sidebar  from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-applik-bg">
            {/* SIDEBAR: */}
            <Sidebar />
            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen"> 
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
                {/* Footer puede ir aca */}
            </div>
        </div>
    );
}

export default MainLayout;