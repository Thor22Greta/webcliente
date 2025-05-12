import React from 'react';
import { obtenerAnimalPorId } from '@/app/lib/actions';
import EditarAnimalForm from '@/app/ui/animales/editar-animal-form';
import type { Animal } from '@/app/lib/definitions';

type Params = { id: string };

export default async function EditarAnimalPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const row = await obtenerAnimalPorId(id);

  const animal = row as Animal;

  return (
    <main>
      <h1 className="mb-8 text-xl md:text-2xl text-green-600">Editar Animal</h1>
      <EditarAnimalForm animal={animal} />
    </main>
  );
}
