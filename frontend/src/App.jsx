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
import ApplicantLayout from './components/layout/ApplicantLayout/ApplicantLayout';
import ConfiguracionPage from './pages/Configuracion/ConfiguracionPage';
import EstadisticasPage from './pages/Estadisticas/EstadisticasPage';

import LoginPage from './pages/Auth/LoginPage';
import RegistroCandidatoPage from './pages/Auth/RegistroCandidatoPage';
import RegistroEmpresaPage from './pages/Auth/RegistroEmpresaPage';
import RecuperarContrasenaPage from './pages/Auth/RecuperarContrasenaPage';
import PerfilPage from './pages/PortalAplicantes/PerfilPage';
import InicioPage from './pages/PortalAplicantes/InicioPage';
import TrabajosPage from './pages/PortalAplicantes/TrabajosPage';
import DetallesPuestoPage from './pages/PortalAplicantes/DetallesPuestoPage';
import MisAplicacionesPage from './pages/PortalAplicantes/MisAplicacionesPage';
import NotificacionesPage from './pages/PortalAplicantes/NotificacionesPage';
import PrivacidadPage from './pages/Legal/PrivacidadPage';
import TerminosPage from './pages/Legal/TerminosPage';
import ContactoPage from './pages/Legal/ContactoPage';
import LandingPage from './pages/Landing/LandingPage';
import AceptarInvitacionPage from './pages/Auth/AceptarInvitacionPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes >
          {/* Landing page — sin layout */}
          <Route index element={<LandingPage />} />

          {/* Portal de aplicante: Público */}
          <Route element={<ApplicantLayout />}>
            <Route path='inicio' element={<InicioPage />} />
            <Route path='/trabajos' element={<TrabajosPage />}/>
            <Route path='/trabajo/:id' element={<DetallesPuestoPage />} />
            <Route path='/privacidad' element={<PrivacidadPage />} />
            <Route path='/terminos'   element={<TerminosPage />} />
            <Route path='/contacto'   element={<ContactoPage />} />
            <Route element={<ProtectedRoute allowedRoles={["aplicante", "reclutador", "admin"]} />}>
              <Route path='/perfil' element={<PerfilPage />} />
              <Route path='/aplicaciones' element={<MisAplicacionesPage />}/>
              <Route path='/notificaciones' element={<NotificacionesPage />}/>
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
            <Route path='dashboard' element={<PanelPrincipalPage />} />
            <Route path='vacantes' element={<VacantesPage />} />
            <Route path='candidatos' element={<CandidatosPage />} />
            <Route path='estadistica' element={<EstadisticasPage />} />
            <Route path='configuracion' element={<ConfiguracionPage />} />
          </Route>

          {/* Auth — sin layout */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegistroCandidatoPage />} />
          <Route path='/registrar-empresa' element={<RegistroEmpresaPage />} />
          <Route path='/recuperar-contrasena' element={<RecuperarContrasenaPage />} />
          <Route path='/register/reclutador' element={<AceptarInvitacionPage />} />
          {/* Dev only — personas de prueba */}

          {/* Crear página de Not Found  */}
          <Route path='*' element={<div>Not Found aquí</div>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
