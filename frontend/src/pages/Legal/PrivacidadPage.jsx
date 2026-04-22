export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 pb-20">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Política de Privacidad</h1>
      <p className="text-sm text-slate-400 mb-8">Última actualización: 20 de abril de 2026</p>

      <div className="space-y-8 text-sm text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Quiénes somos</h2>
          <p>Applik es una plataforma de reclutamiento impulsada por inteligencia artificial, operada bajo las leyes de la República de Nicaragua. Nos comprometemos a proteger la privacidad y los datos personales de todos nuestros usuarios conforme a la <strong>Ley 787 de Protección de Datos Personales</strong>.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Datos que recopilamos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Nombre completo y correo electrónico al registrarte</li>
            <li>Currículum vitae (CV) y experiencia laboral que tú mismo proporcionas</li>
            <li>Historial de aplicaciones a vacantes dentro de la plataforma</li>
            <li>Datos de uso de la plataforma (páginas visitadas, búsquedas realizadas)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">3. Cómo usamos tus datos</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Gestionar tu perfil de candidato o empresa dentro de Applik</li>
            <li>Evaluar compatibilidad con vacantes mediante IA, basándose exclusivamente en tu CV</li>
            <li>Facilitar la comunicación entre candidatos y empresas reclutadoras</li>
            <li>Mejorar continuamente los algoritmos y la experiencia de la plataforma</li>
          </ul>
          <p className="mt-2">Tus datos <strong>no serán vendidos</strong> ni compartidos con terceros fuera de la plataforma con fines publicitarios.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">4. Tus derechos (Ley 787)</h2>
          <p>Conforme a la Ley 787, tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos</li>
            <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos</li>
          </ul>
          <p className="mt-2">Para ejercer cualquiera de estos derechos escríbenos a <a href="mailto:privacidad@applik-ni.com" className="text-violet-600 hover:underline">privacidad@applik-ni.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">5. Seguridad</h2>
          <p>Implementamos medidas técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o alteración. Las contraseñas se almacenan cifradas y nunca en texto plano.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">6. Cambios a esta política</h2>
          <p>Podemos actualizar esta política ocasionalmente. Te notificaremos por correo electrónico ante cambios significativos.</p>
        </section>

      </div>
    </div>
  )
}
