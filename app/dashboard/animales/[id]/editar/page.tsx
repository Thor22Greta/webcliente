'use client';

import { useState, useEffect } from 'react';
import { obtenerAnimalPorId, actualizarAnimal } from '@/app/lib/actions';
import { Animal } from '@/app/lib/definitions';  

export default function EditarAnimalPage({ params }: { params : Promise<{id: string}> }) {
  const [animal, setAnimal] = useState<Animal | null>(null);  

  useEffect(() => {
    async function loadAnimal() {
      const { id } = await params;
      const animalData = await obtenerAnimalPorId(id);
      setAnimal(animalData as Animal);   
    }
    loadAnimal();
  }, [params]);

  if (!animal) return <div>Cargando...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!animal) return; 

    try {
      await actualizarAnimal({
        id: animal.id, 
        name: animal.name,
        raza: animal.raza,
        edad: animal.edad,
        adopted: animal.adopted,
      });
      
      alert('Animal actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
      alert('Hubo un error al actualizar el animal.');
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setAnimal((prevAnimal) => {
      if (!prevAnimal) return prevAnimal; 
      switch (name) {
        case 'name':
          return { ...prevAnimal, name: value };
        case 'raza':
          return { ...prevAnimal, raza: value };
        case 'edad':
          return { ...prevAnimal, edad: parseInt(value) }; 
        case 'adopted':
          return { ...prevAnimal, adopted: checked }; 
        default:
          return prevAnimal;
      }
    });
  };

  return (
    <main>
      <h1 className="lusitana_e85447be-module__j818aG__className mb-8 text-xl md:text-2xl text-green-600">Editar Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={animal.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label>Raza:</label>
          <input
            type="text"
            name="raza"
            value={animal.raza}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="edad"
            value={animal.edad}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">Guardar cambios</button>
      </form>
    </main>
  );
}
