import { fetchFiltradosUsuarios } from '@/app/lib/data';
import UsuariosTable from '@/app/ui/donantes/table';
import { Metadata } from 'next';
import CreateCustomerForm from '@/app/ui/donantes/create-usuario-form';
import { getServerSession } from 'next-auth';
import { lusitana } from '@/app/ui/fonts'; 
import { authConfig } from '@/app/lib/auth.config';

export const metadata: Metadata = {
  title: 'Donantes/Adoptantes',
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
  const session = await getServerSession(authConfig);

  return (
    <main>
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">
        DONANTES/ADOPTANTES
      </h1>
    <div className="w-full">
      {session?.user?.isAdmin && (
        <section className="mb-8">
          <h1 className={`${lusitana.className} text-2xl text-green-600`}>
            Crear Nuevo Donante/Adoptante
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
    </main>
  );
}
