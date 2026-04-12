import React from 'react';
import { useAuth } from '@/context/AuthContext';


// SOLO PARA PRUEBAS DE SESIÓN, REEMPLAZAR POR PÁGINA REAL
const PerfilPage = () => {
  const { logout, user } = useAuth();

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Perfil Aquí</h1>
      
      {user && (
        <p className="mb-6 text-slate-600">
          Bienvenido, <span className="font-semibold">{user.email}</span>
        </p>
      )}

      <button
        onClick={logout}
        className="px-6 py-2 bg-gradient-purple text-white rounded-lg  transition-colors shadow-md"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilPage;