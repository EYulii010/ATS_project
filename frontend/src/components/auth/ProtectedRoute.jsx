import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user) {
        console.log("Usuario no registrado, regresando a /login ...");
        return (
            <Navigate to="/login" />
        );
    } 

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log(`Acceso denegado: El rol: ${user.role} no tiene permiso`);
        return <Navigate to={user.role === "reclutador" ? "/dashboard" : "/"} replace />
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoute;