import { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        try {    
            const savedUser = localStorage.getItem('applik_user');
            // Revisa si hay un usuario en localstorage, si no regresa null;
            if (!savedUser || savedUser == undefined) return null;
            
            return JSON.parse(savedUser);
        } catch (error) {
            console.error("Local storage corrupto, limpiando datos...");
            localStorage.removeItem('applik_user');
            return null;
        }
    });
    // Estado de carga para evitar race condition para ProtectedRoute
    const [ loading, setLoading ] = useState(false); // False porque localstorage ya es instantaneo

    const login = (userData) => {
        // Almacenamos el objeto completo que pasamos desde los botones
        localStorage.setItem('applik_user', JSON.stringify(userData));
        setUser(userData);    
    };

    const logout = () => {
        localStorage.removeItem("applik_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
