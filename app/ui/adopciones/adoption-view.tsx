'use client';

import { useState } from 'react';
import { Usuario, FormattedAnimalesTable } from '@/app/lib/definitions';
import AdopcionesTable from '@/app/ui/adopciones/table';
import AdoptionForm from '@/app/ui/adopciones/form';
import AdoptedAnimalsSlider from '@/app/ui/adopciones/slider';

interface AdoptionViewProps {
  usuarios: Usuario[];
  animalesNoAdoptados: FormattedAnimalesTable[];
  animalesAdoptados: FormattedAnimalesTable[];
}

export default function AdoptionView({
  usuarios,
  animalesNoAdoptados,
  animalesAdoptados,
}: AdoptionViewProps) {
  const [animalesNoAdoptadosState, setAnimalesNoAdoptadosState] = useState(animalesNoAdoptados);
  const [animalesAdoptadosState, setAnimalesAdoptadosState] = useState(animalesAdoptados);

  const handleAdoptar = (animalId: string, usuarioId: string) => {
    const adoptado = animalesNoAdoptadosState.find(animal => animal.id === Number(animalId));

    if (adoptado) {
      adoptado.adopted = true;

      setAnimalesNoAdoptadosState(animalesNoAdoptadosState.filter(animal => animal.id !== Number(animalId)));
      setAnimalesAdoptadosState([...animalesAdoptadosState, adoptado]);

      console.log(`Animal adoptado: ${adoptado.name}, Adoptante: ${usuarioId}`);
    }
  };

  return (
    <div>
      <AdopcionesTable animales={animalesNoAdoptadosState} />

      <AdoptionForm
        usuarios={usuarios}
        animales={animalesNoAdoptadosState}
        adoptarAnimal={handleAdoptar}
      />

      <AdoptedAnimalsSlider animales={animalesAdoptadosState} />
    </div>
  );
}
