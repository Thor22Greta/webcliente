import { fetchFiltradosUsuarios } from '@/app/lib/data';
import UsuariosTable from '@/app/ui/usuarios/table';
import { Metadata } from 'next';
import CreateCustomerForm from '@/app/ui/usuarios/create-usuario-form';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts'; 

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
  const session = await auth();

  return (
    <div className="w-full">
      {session?.user?.isAdmin && (
        <section className="mb-8">
          <h1 className={`${lusitana.className} text-2xl text-green-600`}>
            Crear Nuevo Donante
          </h1>
          <div className="mt-4">
            <CreateCustomerForm />
          </div>
        </section>
      )}

      <div>
        <UsuariosTable usuarios={usuarios} />
      </div>
    </div>
  );
}
