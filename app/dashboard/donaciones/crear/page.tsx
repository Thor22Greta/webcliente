import { fetchUsuarios } from '@/app/lib/data';
import Form from '@/app/ui/donaciones/create-form';
import Breadcrumbs from '@/app/ui/donaciones/breadcrumbs';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Crear Donaciones',
};

export default async function Page() {
  const usuarios = await fetchUsuarios();
  const session = await getServerSession();
  const isAdmin = session?.user?.isAdmin ?? false; 

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Donaciones', href: '/dashboard/donaciones' },
          {
            label: 'Crear Donacion',
            href: '/dashboard/donacion/crear',
            active: true,
          },
        ]}
      />
      <Form usuarios={usuarios} isAdmin={isAdmin} />
    </main>
  );
}
