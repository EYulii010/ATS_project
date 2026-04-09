import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MainLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-applik-bg">
            {/* SIDEBAR: Falta estilo y indicador <<you are here>> */}
            <aside className="w-64 bg-applik-dark text-white p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8">APPLIK</h2>

                <nav className="flex flex-col space-y-4">
                    <Link to="/dashboard">Panel Principal</Link>
                    <Link to="/vacantes">Vacantes</Link>
                    <Link to="/candidatos">Candidatos</Link>   
                    <Link to="/estadistica">Estadísitca</Link>
                    <Link to="/configuracion">Configuración</Link>
                </nav>

                {/* Sección de información de usuario */}
                <div className="border-t border-slate-700 pt-4 end-auto mt-auto">
                    <p className="font-bold"> {user?.name} </p>
                    <p>{user?.role}</p>
                    <button onClick={logout} className="bg-applik-dark text-xs mt-2">Cerrar Sesión</button>
                </div>
            </aside>
        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
            <Outlet />
        </main>
        </div>
    );
}

export default MainLayout;