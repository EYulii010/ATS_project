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
import PanelPrincipalPage from './pages/PanelPrincipal/PanelPrincipalPage';
import ApplicantLayout from './components/layout/ApplicantLayout/ApplicantLayout';import ConfiguracionPage from './pages/Configuracion/ConfiguracionPage';

// Componentes temporales para testing de sesión no más
import TestLogin from './pages/TestLogin';
import PerfilPage from './pages/PortalAplicantes/PerfilPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes >
          {/* Portal de aplicante: Público */}
          <Route element={<ApplicantLayout />}>
            <Route index element={<div>Inicio aquí</div>} />
            <Route path='/trabajos' element={<div>Bolsa de trabajo aquí</div>}/>
            <Route path='/trabajo/:id' element={<div>Detalles de trabajo aquí</div>} />
            {/* ↑ Detalles de Aplicación podría ser un modal en lugar de página */}
            <Route path='/login' element={<TestLogin/>} />
            <Route path='/registro' element={<div>Registro aquí</div>}/>
            {/* Register para empresas, redirige loggeado como admin a /dashboard */}
            <Route path='/registrar-empresa' element={<div>Registro empresa aquí</div>}/>
            {/* Ruta protegida para página de perfil */}
            <Route element={<ProtectedRoute allowedRoles={["aplicante", "reclutador", "admin"]} />}>
              <Route path='/perfil' element={<PerfilPage />} />
              <Route path='/aplicaciones' element={<div>Aplicaciones aquí</div>}/>
            </Route> 
          </Route>

          

          {/* Dashboard de reclutador: Protegido */}
          <Route 
            path='/' 
            element={
              <ProtectedRoute allowedRoles={["reclutador", "admin"]}>
                <MainLayout/>
              </ProtectedRoute>
            }
          >
            <Route path='dashboard' element={<PanelPrincipalPage />}></Route>
            <Route path='vacantes' element={<VacantesPage />}></Route>
            <Route path='candidatos' element={<CandidatosPage />}></Route>
            <Route path='estadistica' element={<div>Estadística aquí</div>}></Route>
            <Route path='configuracion' element={<ConfiguracionPage />}></Route>
            <Route index element={<div>Página de Inicio</div>} />
          </Route>

            {/* Crear página de Not Found  */}
          <Route path='*' element={<div>Not Found aquí</div>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
