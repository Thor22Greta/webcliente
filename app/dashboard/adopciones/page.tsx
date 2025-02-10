import { fetchFiltradosAnimales } from '@/app/lib/data';
import { fetchFiltradosUsuarios } from '@/app/lib/data';
import { Metadata } from 'next';
import AdoptionView from '@/app/ui/adopciones/adoption-view';

export const metadata: Metadata = {
  title: 'Adopciones',
};

export default async function Page({ params }: { params: { id: string } }) {
  const query = params.id; // 

  const animales = await fetchFiltradosAnimales(query);
  const usuarios = await fetchFiltradosUsuarios(query);

  const animalesNoAdoptados = animales.filter((animal) => !animal.adopted);
  const animalesAdoptados = animales.filter((animal) => animal.adopted);

  return (
    <main>
      <h1 className="text-2xl text-green-600">ADOPCIONES</h1>

      <AdoptionView usuarios={usuarios} animalesNoAdoptados={animalesNoAdoptados} animalesAdoptados={animalesAdoptados} />
    </main>
  );
}
