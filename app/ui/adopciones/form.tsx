'use client';
import { useState } from 'react';
import { Usuario, FormattedAnimalesTable } from '@/app/lib/definitions';

interface AdoptionFormProps {
  usuarios: Usuario[];
  animales: FormattedAnimalesTable[];
}

export default function AdoptionForm({ usuarios, animales }: AdoptionFormProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedUsuario, setSelectedUsuario] = useState<string | null>(null);

  const handleAdoptar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnimal || !selectedUsuario) return;

    // Aquí harías la lógica para actualizar el animal a "adoptado"
    // y asociarlo al usuario (adoptante) en tu base de datos.
    console.log(`Adoptante: ${selectedUsuario}, Animal: ${selectedAnimal}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl mb-4">Formulario de Adopción</h2>
      <form onSubmit={handleAdoptar} className="space-y-4">
        <div>
          <label htmlFor="animal" className="block">Seleccione un animal:</label>
          <select
            id="animal"
            value={selectedAnimal || ''}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccione un animal</option>
            {animales.map((animal) => (
              <option key={animal.id} value={animal.id}>{animal.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="usuario" className="block">Seleccione un adoptante:</label>
          <select
            id="usuario"
            value={selectedUsuario || ''}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccione un adoptante</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Adoptar
        </button>
      </form>
    </div>
  );
}
