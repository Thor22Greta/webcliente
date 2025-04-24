// app/dashboard/eventos/crear/page.tsx
import Breadcrumbs from '@/app/ui/eventos/breadcrumbs';
import CreateEventoForm from '@/app/ui/eventos/create-evento-form';
import { fetchUsuarios } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Evento',
};

export default async function Page() {
  const usuarios = await fetchUsuarios();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Eventos', href: '/dashboard/eventos' },
          { label: 'Crear Evento', href: '/dashboard/eventos/crear', active: true },
        ]}
      />
      <CreateEventoForm />
    </main>
  );
}
