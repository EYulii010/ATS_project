import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-applik-bg overflow-hidden">

            {/* Overlay mobile — cierra sidebar al tocar fuera */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar: drawer en mobile, fijo en desktop */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
