import { fetchFiltradosAnimales } from '@/app/lib/data';
import AnimalesTable from '@/app/ui/animales/table';
import CrearAnimalForm from '@/app/ui/animales/create-form';
import { Metadata } from 'next';

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
  const query = searchParams?.query || '';  // Si no hay búsqueda, usar un string vacío

  // Obtener los animales filtrados según el query
  const animales = await fetchFiltradosAnimales(query);

  return (
    <main>
      <h1 className="text-2xl text-green-600 font-bold mb-6">Crear Animal</h1>

      {/* Formulario para crear un nuevo animal */}
      <CrearAnimalForm />

      {/* Tabla con los animales existentes */}
      <AnimalesTable animales={animales} />
    </main>
  );
}
