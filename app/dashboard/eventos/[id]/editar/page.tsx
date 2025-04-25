import { fetchEventoById, fetchUsuarios } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/eventos/breadcrumbs';
import EditEventoForm from '@/app/ui/eventos/edit-form';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Evento',
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const evento = await fetchEventoById(params.id);

  if (!evento) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Eventos', href: '/dashboard/eventos' },
          { label: 'Editar Evento', href: `/dashboard/eventos/${params.id}/editar`, active: true },
        ]}
      />
      <EditEventoForm evento={evento}/>
    </main>
  );
}
