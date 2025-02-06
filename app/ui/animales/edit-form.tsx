'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerAnimalPorId, actualizarAnimal } from '@/app/lib/actions';

interface Animal {
  id: string;
  name: string;
  raza: string;
  edad: number;
  adopted: boolean;
  customerId: string;
}

export default function EditForm() {
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('Obteniendo ID:', id);

    if (id) {
      const fetchAnimal = async () => {
        try {
          const data = await obtenerAnimalPorId(id);
          if (data) {
            console.log('Animal encontrado:', data);
            setAnimal(data);
          } else {
            console.error('No se encontró el animal');
          }
        } catch (error) {
          console.error('Error al obtener animal:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimal();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animal) return;
    try {
      await actualizarAnimal(animal);
      console.log('Animal actualizado con éxito');
      router.push('/dashboard/animales');
    } catch (error) {
      console.error('Error al actualizar animal:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!animal) return <div>No se encontró el animal</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Editar Animal</h1>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          value={animal.name}
          onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="raza" className="block text-sm font-medium text-gray-700">Raza</label>
        <input
          type="text"
          id="raza"
          value={animal.raza}
          onChange={(e) => setAnimal({ ...animal, raza: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
        <input
          type="number"
          id="edad"
          value={animal.edad}
          onChange={(e) => setAnimal({ ...animal, edad: Number(e.target.value) })}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="adopted" className="text-sm text-gray-700">¿Está adoptado?</label>
        <input
          type="checkbox"
          id="adopted"
          checked={animal.adopted}
          onChange={() => setAnimal({ ...animal, adopted: !animal.adopted })}
          className="w-5 h-5"
        />
      </div>

      <div>
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">ID del Adoptante (opcional)</label>
        <input
          type="text"
          id="customerId"
          value={animal.customerId || ''}
          onChange={(e) => setAnimal({ ...animal, customerId: e.target.value })}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
      >
        Guardar Cambios
      </button>
    </form>
  );
}