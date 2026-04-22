export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 pb-20">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Términos y Condiciones</h1>
      <p className="text-sm text-slate-400 mb-8">Última actualización: 20 de abril de 2026</p>

      <div className="space-y-8 text-sm text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Aceptación de los términos</h2>
          <p>Al registrarte y usar Applik, aceptas estos términos en su totalidad. Si no estás de acuerdo con alguna parte, te pedimos que no uses la plataforma.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Uso permitido</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Los candidatos pueden crear un perfil, subir su CV y aplicar a vacantes publicadas</li>
            <li>Las empresas pueden publicar vacantes, revisar candidatos y gestionar procesos de selección</li>
            <li>Queda prohibido usar la plataforma para actividades fraudulentas, spam o suplantación de identidad</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">3. Cuentas de usuario</h2>
          <p>Eres responsable de mantener la confidencialidad de tu contraseña. Applik no se hace responsable de accesos no autorizados derivados de un descuido del usuario.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">4. Contenido del usuario</h2>
          <p>Al subir tu CV o información de perfil, nos otorgas permiso de procesarlo exclusivamente para los fines de la plataforma (evaluación de compatibilidad con vacantes). No reclamamos propiedad sobre tu contenido.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">5. Inteligencia artificial</h2>
          <p>Applik utiliza IA para calcular un score de compatibilidad entre candidatos y vacantes, basado únicamente en la información del CV. Este score es orientativo y no constituye una decisión de contratación definitiva.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">6. Limitación de responsabilidad</h2>
          <p>Applik actúa como intermediario entre candidatos y empresas. No garantizamos la obtención de empleo ni el éxito de ningún proceso de selección. Las decisiones de contratación son responsabilidad exclusiva de las empresas.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">7. Terminación de cuenta</h2>
          <p>Puedes eliminar tu cuenta en cualquier momento desde la configuración. Nos reservamos el derecho de suspender cuentas que violen estos términos.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">8. Legislación aplicable</h2>
          <p>Estos términos se rigen por las leyes de la República de Nicaragua. Cualquier disputa será resuelta ante los tribunales competentes de Managua.</p>
        </section>

      </div>
    </div>
  )
}
