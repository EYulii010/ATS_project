import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import Logo from "../../ui/Logo";
import UserNavActions from "./NavActions/UserNavActions";
import { useAuth } from "@/context/AuthContext";
import RegisterCompanyCTA from "./RegisterCompanyCTA";

const Navbar = () => {
    const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
    const [searchOpen,      setSearchOpen]      = useState(false);
    const [searchTerm,      setSearchTerm]      = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `rounded-xl px-4 py-2 transition-all duration-200 whitespace-nowrap text-lg ${
            isActive
                ? "bg-purple-100 text-purple-light font-bold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `block w-full px-5 py-4 text-base font-medium rounded-xl transition-all duration-200 ${
            isActive
                ? "bg-purple-100 text-purple-light font-bold"
                : "text-slate-700 hover:bg-slate-100"
        }`;

    useEffect(() => {
        if (searchOpen && inputRef.current) inputRef.current.focus();
    }, [searchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/trabajos?q=${encodeURIComponent(searchTerm)}`);
            setSearchOpen(false);
            setSearchTerm("");
        }
    };

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchTerm("");
    };

    return (
        <header className="sticky top-0 z-50">
            {!user && <RegisterCompanyCTA />}

            <nav className="w-full h-14 md:h-20 border-b border-slate-200 bg-white">
                <div className="grid grid-cols-[1fr_auto_1fr] w-full max-w-7xl mx-auto h-full items-center px-4 gap-4">

                    {/* ── Izquierda: hamburguesa + logo ── */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
                            aria-label="Abrir menú"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <Logo className="w-8 h-8 md:w-10 md:h-10" />
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">APPLIK</h2>
                    </div>

                    {/* ── Centro: links (default) | barra de búsqueda (cuando está abierta) ── */}
                    <div className="flex justify-center items-center">
                        {/* Nav links — visibles en desktop cuando search está cerrado */}
                        <div className={`hidden md:flex items-center gap-2 md:gap-4 font-bold transition-all duration-300 ${
                            searchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"
                        }`}>
                            <NavLink to="/"             className={navLinkClass}>Inicio</NavLink>
                            <NavLink to="/trabajos"     className={navLinkClass}>Trabajos</NavLink>
                            <NavLink to="/aplicaciones" className={navLinkClass}>Mis Aplicaciones</NavLink>
                        </div>

                        {/* Search bar — solo desktop, ocupa el espacio del centro */}
                        <form
                            onSubmit={handleSearch}
                            className={`hidden md:flex items-center bg-slate-100 rounded-full transition-all duration-500 ease-in-out overflow-hidden ${
                                searchOpen ? "w-full max-w-md opacity-100" : "w-0 opacity-0 pointer-events-none"
                            }`}
                        >
                            <Search size={16} className="ml-4 text-slate-400 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Buscar vacante, empresa..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400 px-3 py-2"
                            />
                            <button
                                type="button"
                                onClick={closeSearch}
                                className="text-slate-400 hover:text-slate-600 transition-colors mx-3 shrink-0"
                            >
                                <X size={16} />
                            </button>
                        </form>
                    </div>

                    {/* ── Derecha: ícono de lupa + acciones ── */}
                    <div className="flex items-center justify-end gap-1">
                        {/* Lupa — abre/cierra search */}
                        <button
                            onClick={() => setSearchOpen((v) => !v)}
                            className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-all active:scale-95"
                            aria-label="Buscar"
                        >
                            {searchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>
                        <UserNavActions />
                    </div>
                </div>

                {/* ── Mobile search bar — fila debajo del nav con sombra para separar del contenido ── */}
                {searchOpen && (
                    <form
                        onSubmit={handleSearch}
                        className="md:hidden flex items-center gap-3 border-t border-slate-200 bg-white px-4 py-3 shadow-md"
                    >
                        <Search size={16} className="text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Buscar vacante, empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            className="flex-1 bg-slate-100 rounded-full text-sm focus:outline-none text-slate-700 placeholder-slate-400 px-4 py-2"
                        />
                        <button
                            type="button"
                            onClick={closeSearch}
                            className="text-slate-400 hover:text-slate-600 shrink-0"
                        >
                            <X size={16} />
                        </button>
                    </form>
                )}
            </nav>

            {/* ── Menú mobile desplegable ── */}
            {mobileMenuOpen && (
                <div className="md:hidden w-full bg-white border-b border-slate-200 shadow-lg px-4 py-3 space-y-1">
                    <NavLink to="/"             className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Inicio</NavLink>
                    <NavLink to="/trabajos"     className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Trabajos</NavLink>
                    <NavLink to="/aplicaciones" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Mis Aplicaciones</NavLink>
                    {/* Iniciar Sesión — solo cuando no hay usuario */}
                    {!user && (
                        <NavLink to="/login" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Iniciar Sesión
                        </NavLink>
                    )}
                    {/* Dashboard — solo para reclutador/admin */}
                    {(user?.role === "reclutador" || user?.role === "admin") && (
                        <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Dashboard
                        </NavLink>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
