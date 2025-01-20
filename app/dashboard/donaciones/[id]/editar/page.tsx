import Form from '@/app/ui/donaciones/edit-form';
import Breadcrumbs from '@/app/ui/donaciones/breadcrumbs';
import { fetchDonacionById, fetchUsuarios } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Donación',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [donacion, usuarios] = await Promise.all([
    fetchDonacionById(id),
    fetchUsuarios(),
  ]);

  if (!donacion) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Donaciones', href: '/dashboard/donaciones' },
          {
            label: 'Editar Donacion',
            href: `/dashboard/donaciones/${id}/editar`,
            active: true,
          },
        ]}
      />
      <Form donacion={donacion} usuarios={usuarios} />
    </main>
  );
}
