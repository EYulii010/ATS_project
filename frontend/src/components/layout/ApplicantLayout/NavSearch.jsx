import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/trabajos?q=${encodeURIComponent(searchTerm)}`);
            setIsOpen(false);
            setSearchTerm("");
        }
    };

    return (
        <div className="relative flex items-center">

            {/* Mobile: absolute expandido hacia la izquierda, no empuja nada */}
            <form
                onSubmit={handleSearch}
                className={`md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex items-center bg-slate-100 rounded-full transition-all duration-[600ms] ease-in-out overflow-hidden z-10 ${
                    isOpen ? "w-44 py-2 opacity-100" : "w-0 py-0 opacity-0 pointer-events-none"
                }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400 px-4"
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors mx-2 shrink-0"
                >
                    <X size={16} />
                </button>
            </form>

            {/* Desktop: inline, empuja suavemente */}
            <form
                onSubmit={handleSearch}
                className={`hidden md:flex items-center bg-slate-100 rounded-full transition-all duration-[600ms] ease-in-out overflow-hidden ${
                    isOpen ? "w-96 py-2 opacity-100 mr-2" : "w-0 p-0 opacity-0"
                }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar vacante, empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400 px-4"
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors mx-2 shrink-0"
                >
                    <X size={16} />
                </button>
            </form>

            {/* Ícono lupa */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                className="relative z-20 p-2 text-slate-800 hover:text-applik-selected hover:bg-purple-light rounded-full transition-all active:scale-95"
            >
                <Search size={20} />
            </button>
        </div>
    );
};

export default NavSearch;
