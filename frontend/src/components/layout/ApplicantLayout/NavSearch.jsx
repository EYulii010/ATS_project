import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null);
    
    useEffect(() => {
        if (isOpen && inputRef.current){
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchTerm.trim()) {
            navigate(`/trabajos?q=${encodeURIComponent(searchTerm)}`);
            setIsOpen(false);
            setSearchTerm("");
        }
    };

    return (
        <div className="relative flex items-center">
            {/* El input field que se expande */}
            <form 
                onSubmit={handleSearch}
                className={`flex itmes-center bg-slate-100 rounded-full transition-all duration-600 ease-in-out overflow-hidden ${
                    isOpen ? "w-96 py-2 opacity-100 mr-2" : "w-0 p-0 opacity-0"
                }`}
            >
                <input 
                    type="text"
                    placeholder="Buscar vacante, empresa... "
                    value={searchTerm}
                    onChange={(e => setSearchTerm(e.target.value))}
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400 px-4"
                />
                {/* Cerrar búsqueda */}
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-applik-selected transition-colors mx-2"
                >
                    <X size={16}/>
                </button>
            </form>

            {/* Icono de lupa, solo visible si está cerrado el buscador */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-slate-800 hover:text-applik-selected hover:bg-purple-light rounded-full transition-all active:scale-95 hover:cursor-pointer"
                >
                    <Search size={20}/>
                </button>
            )}
        </div>
    )
}

export default NavSearch;