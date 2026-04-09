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

    const login = (role) => {
        // Usuario falso, temporal para testing. Reemplazar por datos de Auth
        const loggedUser = {
            id: 777,
            name: "Octavio Ramírez", // No está realmente en el token, necesitaría otra lógica
            role: role,
            tenant_id: 1
        };
        localStorage.setItem('applik_user', JSON.stringify(loggedUser));
        setUser(loggedUser);    
    } 

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
