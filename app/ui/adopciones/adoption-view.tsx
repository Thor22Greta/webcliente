'use client';

import { useState } from 'react';
import { Usuario, FormattedAnimalesTable } from '@/app/lib/definitions';
import AdopcionesTable from '@/app/ui/adopciones/table';
import AdoptionForm from '@/app/ui/adopciones/form';
import AdoptedAnimalsSlider from '@/app/ui/adopciones/slider';
import { adoptarAnimal } from '@/app/lib/actions';

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

  const handleAdoptar = async (animalId: string, usuarioId: string) => {
    const idNum = Number(animalId);
    try {
      // Llamada al backend para actualizar la base de datos
      await adoptarAnimal(idNum, usuarioId);
  
      // Actualizar el estado local solo después de una respuesta exitosa
      const adoptado = animalesNoAdoptadosState.find(animal => animal.id === idNum);
      if (adoptado) {
        adoptado.adopted = true;
        setAnimalesNoAdoptadosState(animalesNoAdoptadosState.filter(animal => animal.id !== idNum));
        setAnimalesAdoptadosState([...animalesAdoptadosState, adoptado]);
      }
    } catch (error) {
      console.error('Error al adoptar el animal:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
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
