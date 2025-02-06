import { fetchFiltradosUsuarios } from '@/app/lib/data';
import UsuariosTable from '@/app/ui/usuarios/table';
import { Metadata } from 'next';

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

  return (
    <main>
  
      {/* Tabla de usuarios */}
      <div>
        <UsuariosTable usuarios={usuarios} />
      </div>
    </main>
  );
}
