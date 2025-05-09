'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { actualizarAnimal } from '@/app/lib/actions';
import type { Animal } from '@/app/lib/definitions';

interface EditarAnimalFormProps {
  animal: Animal;
}

export default function EditarAnimalForm({ animal: initial }: EditarAnimalFormProps) {
  const [animal, setAnimal] = useState<Animal>(initial);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAnimal(prev => {
      if (name === 'adopted') {
        return { ...prev, adopted: checked };
      }
      if (name === 'edad') {
        // Si borran el input, mantenemos 0 (o el valor que prefieras)
        const parsed = value === '' ? 0 : parseInt(value);
        return { ...prev, edad: isNaN(parsed) ? 0 : parsed };
      }
      return {
        ...prev,
        [name]: value,
      } as Animal;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actualizarAnimal({
        id: animal.id,
        name: animal.name,
        raza: animal.raza,
        edad: animal.edad,
        adopted: animal.adopted,
        customerId: animal.customer_id,
      });
      router.push('/dashboard/animales');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Hubo un error al actualizar el animal.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={animal.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="raza" className="block text-sm font-medium text-gray-700">Raza</label>
        <input
          id="raza"
          name="raza"
          type="text"
          value={animal.raza}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
        <input
  id="edad"
  name="edad"
  type="number"
  value={isNaN(animal.edad) ? '' : animal.edad}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
/>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="adopted"
          name="adopted"
          type="checkbox"
          checked={animal.adopted}
          onChange={handleChange}
          className="w-5 h-5"
        />
        <label htmlFor="adopted" className="text-sm text-gray-700">Adoptado</label>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Guardar Cambios
      </button>
    </form>
  );
}
