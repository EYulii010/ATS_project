import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const TestLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const personas = {
    octavio: {
      id: 101,
      name: "Octavio Ramírez",
      email: "o.ramirez@coca-cola.ni",
      role: "reclutador", 
      tenant_name: "Coca-Cola Inc.",
      avatar_color: "from-red-500 to-red-700"
    },
    belinda: {
      id: 102,
      name: "Belinda Téllez",
      email: "b.tellez@outlook.com",
      role: "aplicante",
      tenant_name: null,
      avatar_color: "from-purple-500 to-purple-700"
    },
    damian: {
      id: 103,
      name: "Damián Garmendia",
      email: "damian.admin@applik.ni",
      role: "admin",
      tenant_name: "APPLIK HQ",
      avatar_color: "from-slate-700 to-slate-900"
    }
  };

  const handleLogin = (userData) => {
    console.log(`Accediendo como ${userData.name} (${userData.role})`);
    login(userData);
    
    // Redirección inteligente post-login
    if (userData.role === 'recruiter' || userData.role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/trabajos');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-xs w-full border border-slate-200 p-6 rounded-lg">
        <h2>Test Login</h2>
        <p className="text-slate-500 text-xs mb-6 uppercase tracking-wider">Test Personas</p>
        <div className="flex flex-col gap-3">
          {Object.values(personas).map((persona) => (
            <button
              key={persona.id}
              onClick={() => handleLogin(persona)}
              className="w-full py-3 px-4 border border-slate-200 rounded text-left hover:bg-slate-50 transition-colors"
            >
              <div className="text-sm font-semibold text-slate-900">{persona.name}</div>
              <div className="text-xs text-slate-500 capitalize">{persona.role}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestLogin;