import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user) {
        console.log("Usuario no registrado, regresando a /login ...");
        return (
            <Navigate to="/login" />
        );
    } else {
        return children;
    }
}

export default ProtectedRoute;