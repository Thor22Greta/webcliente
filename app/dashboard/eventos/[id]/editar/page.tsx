import { fetchEventoById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/eventos/breadcrumbs';
import EditEventoForm from '@/app/ui/eventos/edit-form';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Evento',
};

export default async function Page(props:{ params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [evento] = await Promise.all([
    fetchEventoById(id),
    ]);

  if (!evento) return notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Eventos', href: '/dashboard/eventos' },
          {
            label: 'Editar Evento',
            href: `/dashboard/eventos/${id}/editar`,
            active: true,
          },
        ]}
      />
      <EditEventoForm evento={evento} />
    </main>
  );
}
