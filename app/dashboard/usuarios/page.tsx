import { fetchFiltradosUsuarios } from '@/app/lib/data';
import UsuariosTable from '@/app/ui/usuarios/table';
import { Metadata } from 'next';
import CreateCustomerForm from '@/app/ui/usuarios/create-usuario-form';
import { auth } from '@/auth'; // ✅ usar `auth()` directamente

export const metadata: Metadata = {
  title: 'Usuarios',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const usuarios = await fetchFiltradosUsuarios(query);

  const session = await auth(); // ✅ nueva forma correcta
  console.log('Session en la página:', session);

  return (
    <main>
      {session?.user?.isAdmin && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Crear Nuevo Cliente</h2>
          <CreateCustomerForm />
        </section>
      )}

      <div>
        <UsuariosTable usuarios={usuarios} />
      </div>
    </main>
  );
}
