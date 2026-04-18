import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const ApplicantLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-inter overflow-x-hidden bg-white">

            {/* Navbar de vista de Aplicante */}
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default ApplicantLayout;