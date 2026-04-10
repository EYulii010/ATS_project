import { StageBadge, STAGES } from "@/components/ui/StageBadge"
import { Input, Textarea, SearchInput } from "@/components/ui/Input"
import { Card, CardHeader, CardContent, StatCard, ConfigCard } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, BarChart2, Clock, UserCircle, Bell, ShieldCheck, Plus, Pencil } from "lucide-react"

export default function ComponentsPreview() {
  return (
    <div className="min-h-screen bg-applik-bg p-10 space-y-12">

      {/* StageBadge */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">StageBadge</h2>
        <div className="flex flex-wrap gap-3">
          {STAGES.map((stage) => (
            <StageBadge key={stage} stage={stage} />
          ))}
        </div>
      </section>

      {/* Input */}
      <section className="space-y-4 max-w-md">
        <h2 className="text-lg font-semibold text-slate-700">Input</h2>
        <SearchInput placeholder="Buscar vacantes..." />
        <Input label="Título del Puesto" required placeholder="Ej. Gerente de Ventas" />
        <Input label="Departamento" placeholder="Ej. Marketing" />
        <Input label="Con error" error="Este campo es requerido" placeholder="..." />
        <Textarea label="Descripción del Puesto" placeholder="Describe las responsabilidades y objetivos del puesto..." />
      </section>

      {/* StatCard */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">StatCard</h2>
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          <StatCard label="Vacantes Activas" value="12" icon={Briefcase} iconColor="text-blue-dark" iconBg="bg-blue-dark/10" />
          <StatCard label="Candidatos" value="48" icon={Users} iconColor="text-purple-dark" iconBg="bg-purple-dark/10" />
          <StatCard label="Match Promedio" value="82%" icon={BarChart2} iconColor="text-teal-dark" iconBg="bg-teal-dark/10" />
          <StatCard label="Tiempo Promedio" value="72hrs" icon={Clock} iconColor="text-blue-light" iconBg="bg-blue-light/10" />
        </div>
      </section>

      {/* ConfigCard */}
      <section className="space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold text-slate-700">ConfigCard</h2>
        <ConfigCard icon={UserCircle} title="Perfil" description="Actualiza tu información personal" active />
        <ConfigCard icon={Bell} title="Notificaciones" description="Administra tus preferencias de alertas" />
        <ConfigCard icon={ShieldCheck} title="Privacidad y Seguridad" description="Administra tus preferencias de cuenta y sistema" />
      </section>

      {/* Card base */}
      <section className="space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold text-slate-700">Card (base)</h2>
        <Card>
          <CardHeader>
            <p className="font-semibold text-slate-700">Título de sección</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Contenido de la card. Se usa como contenedor para tablas, listas, etc.</p>
          </CardContent>
        </Card>
      </section>

      {/* Avatar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Avatar</h2>
        <div className="flex items-end gap-4">
          <Avatar name="Osvaldo Rodriguez" size="sm" />
          <Avatar name="Endy Gonzalez" size="md" />
          <Avatar name="Martha Torres" size="lg" />
          <Avatar name="David Espinoza" size="sm" />
        </div>
      </section>

      {/* Button */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="gradient"><Plus /> Crear Vacante</Button>
          <Button variant="primary">Guardar Vacante</Button>
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Descartar</Button>
          <Button variant="ghost"><Pencil /> Editar</Button>
          <Button variant="ghost" size="sm">Ver Perfil</Button>
        </div>
        <div className="flex flex-col gap-2 max-w-xs">
          <p className="text-sm text-slate-500">Suggestion (modal Descartar):</p>
          <Button variant="suggestion">Muchas gracias por participar</Button>
          <Button variant="suggestion">Mejor suerte para la próxima</Button>
          <Button variant="suggestion">Sigue participando...</Button>
        </div>
      </section>

    </div>
  )
}
