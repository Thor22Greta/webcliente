import { fetchFiltradosAnimales } from '@/app/lib/data';
import { fetchFiltradosUsuarios } from '@/app/lib/data';
import { Metadata } from 'next';
import AdoptionView from '@/app/ui/adopciones/adoption-view';

export const metadata: Metadata = {
  title: 'Adopciones',
};

export default async function Page(props: { searchParams?: Promise<{ query?: string; page?: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const animales = await fetchFiltradosAnimales(query);
  const usuarios = await fetchFiltradosUsuarios(query);

  const animalesNoAdoptados = animales.filter(animal => !animal.adopted);
  const animalesAdoptados = animales.filter(animal => animal.adopted);

  return (
    <main>
      <h1 className="lusitana_e85447be-module__j818aG__className text-2xl text-green-600">ADOPCIONES</h1>

      <AdoptionView usuarios={usuarios} animalesNoAdoptados={animalesNoAdoptados} animalesAdoptados={animalesAdoptados} />
    </main>
  );
}
