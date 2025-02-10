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
  const query = searchParams?.query || '';  

  const animales = await fetchFiltradosAnimales(query);

  return (
    <main>
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">ANIMALES</h1>
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">Crear Animal</h1>

      <CrearAnimalForm />

      <AnimalesTable animales={animales} />
    </main>
  );
}
