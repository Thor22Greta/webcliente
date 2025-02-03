import { fetchFiltradosUsuarios } from '@/app/lib/data';
import UsuariosTable from '@/app/ui/usuarios/table';
import { Metadata } from 'next';
import Form from '@/app/ui/usuarios/create-form';

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
      {/* Formulario de creación de usuario */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-green-800">Crear Nuevo Usuario</h1>
        <Form />
      </div>

      {/* Tabla de usuarios */}
      <div>
        <h1 className="text-2xl font-semibold text-green-800">Usuarios</h1>
        <UsuariosTable usuarios={usuarios} />
      </div>
    </main>
  );
}
