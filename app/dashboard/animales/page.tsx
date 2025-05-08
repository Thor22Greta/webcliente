import { fetchFiltradosAnimales } from '@/app/lib/data';
import AnimalesTable from '@/app/ui/animales/table';
import CrearAnimalForm from '@/app/ui/animales/create-form';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/lib/auth.config';

export const metadata: Metadata = {
  title: 'Animales',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';  

  const animales = await fetchFiltradosAnimales(query);

  // Obtenemos la sesión para saber si el usuario es admin.
  const session = await getServerSession(authConfig);
  const isAdmin = session?.user?.isAdmin;

  return (
    <main>
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">
        ANIMALES
      </h1>
      
      {/* Siempre se muestra la sección de creación y búsqueda */}
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">
        Crear Animal
      </h1>
      <CrearAnimalForm />

      {/* Se pasa el prop isAdmin a la tabla */}
      <AnimalesTable animales={animales} isAdmin={isAdmin} />
    </main>
  );
}
