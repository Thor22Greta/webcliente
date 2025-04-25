import { fetchEventoById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/eventos/breadcrumbs';
import EditEventoForm from '@/app/ui/eventos/edit-form';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Evento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const evento = await fetchEventoById(params.id);

  if (!evento) return notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Eventos', href: '/dashboard/eventos' },
          {
            label: 'Editar Evento',
            href: `/dashboard/eventos/${params.id}/editar`,
            active: true,
          },
        ]}
      />
      <EditEventoForm evento={evento} />
    </main>
  );
}
