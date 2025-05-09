import React from 'react';
import { obtenerAnimalPorId } from '@/app/lib/actions';
import EditarAnimalForm from '@/app/ui/animales/editar-animal-form';
import type { Animal } from '@/app/lib/definitions';

export default async function EditarAnimalPage({ params }: { params: { id: string } }) {
  const row = await obtenerAnimalPorId(params.id);

  const animal = row as Animal;

  return <EditarAnimalForm animal={animal} />;
}