import { fetchEventos, fetchUsuarios } from '@/app/lib/data';
import EventosTable from '@/app/ui/eventos/table';
import CreateEventoForm from '@/app/ui/eventos/create-evento-form';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Eventos',
};

export default async function Page() {
  const [eventos, usuarios] = await Promise.all([
    fetchEventos(),
    fetchUsuarios(),
  ]);
  const session = await auth();

  const isAdmin = Boolean(session?.user?.isAdmin);
  const currentUserId = session?.user?.id ?? '';

  return (
    <main className="space-y-8">
      <h1 className={`${lusitana.className} text-2xl text-green-600`}>EVENTOS</h1>

      {/* Formulario de creación: cualquiera con sesión lo ve */}
      {session?.user && (
        <section className="bg-white rounded-md p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Crear Nuevo Evento
          </h2>
          <CreateEventoForm />
        </section>
      )}

      {/* Tabla de eventos */}
      <EventosTable
        eventos={eventos}
        isAdmin={isAdmin}
        currentUserId={currentUserId}
      />
    </main>
  );
}
