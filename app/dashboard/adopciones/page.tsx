import { fetchFiltradosAnimales } from '@/app/lib/data';
import { fetchFiltradosUsuarios } from '@/app/lib/data'; // Aquí suponemos que ya tienes la función de obtener los usuarios
import AdopcionesTable from '@/app/ui/adopciones/table';
import AdoptionForm from '@/app/ui/adopciones/form';
import AdoptedAnimalsSlider from '@/app/ui/adopciones/slider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adopciones',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  // Obtener animales no adoptados
  const animales = await fetchFiltradosAnimales(query);
  const animalesNoAdoptados = animales.filter(animal => !animal.adopted);

  // Obtener los usuarios (clientes) para el formulario de adopción
  const usuarios = await fetchFiltradosUsuarios(query);

  // Filtrar los animales adoptados para el slider de adopciones
  const animalesAdoptados = animales.filter(animal => animal.adopted);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Adopciones</h1>

      {/* Tabla con animales no adoptados */}
      <AdopcionesTable animales={animalesNoAdoptados} />

      {/* Formulario de adopción */}
      <AdoptionForm usuarios={usuarios} animales={animalesNoAdoptados} />

      {/* Slider con animales adoptados */}
      <AdoptedAnimalsSlider animales={animalesAdoptados} />
    </main>
  );
}
