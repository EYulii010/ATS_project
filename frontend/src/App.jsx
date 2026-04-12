import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import VacantesPage from './pages/Vacantes/VacantesPage';
import CandidatosPage from './pages/Candidatos/CandidatosPage';

// Componente temporal para testing de sesión no más
const TestLogin = () => {
  const { login } = useAuth();
  const navigate  = useNavigate(); 

  const handleLogin = () => {
    console.log("Iniciando sesion como Octavio Ramírez")
    login("recruiter");
    navigate('/');
  }

  return (
    <div className='flex flex-col  m-10'>
      <div>Página de Inicio</div>
      <button className=' bg-blue-dark px-1 py-0.5 w-32' onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. */}
          <Route path='/login' element={<TestLogin />}></Route>

          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <MainLayout/>
              </ProtectedRoute>
            }
          >
            <Route path='dashboard' element={<div>Panel Principal aquí</div>}></Route>
            <Route path='vacantes' element={<VacantesPage />}></Route>
            <Route path='candidatos' element={<CandidatosPage />}></Route>
            <Route path='estadistica' element={<div>Estadística aquí</div>}></Route>
            <Route path='configuracion' element={<div>Configuración aquí</div>}></Route>
            <Route index element={<div>Página de Inicio</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
