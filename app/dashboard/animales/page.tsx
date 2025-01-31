import { fetchFiltradosAnimales } from '@/app/lib/data';
import AnimalesTable from '@/app/ui/animales/table';
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
  console.log(animales);

  return (
    <main>
      <AnimalesTable animales={animales} />
    </main>
  );
}
