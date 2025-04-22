'use client';

import { useState } from 'react';
import { Usuario, FormattedAnimalesTable } from '@/app/lib/definitions';

interface AdoptionFormProps {
  usuarios: Usuario[];
  animales: FormattedAnimalesTable[];
  adoptarAnimal: (animalId: string, usuarioId: string) => void; 
}

export default function AdoptionForm({ usuarios, animales, adoptarAnimal }: AdoptionFormProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedUsuario, setSelectedUsuario] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (selectedAnimal && selectedUsuario) {
      adoptarAnimal(selectedAnimal, selectedUsuario); 
    }
  };

  return (
    <div className="mt-8">
      <h2 className="lusitana_e85447be-module__j818aG__className text-2xl text-green-600">Formulario de Adopción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="animal" className="block">Seleccione un Animal:</label>
          <select
            id="animal"
            value={selectedAnimal || ''}
            onChange={(e) => setSelectedAnimal(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">--ANIMAL--</option>
            {animales.map((animal) => {
              return (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="usuario" className="block">Seleccione un Adoptante:</label>
          <select
            id="usuario"
            value={selectedUsuario || ''}
            onChange={(e) => setSelectedUsuario(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">--ADOPTANTE--</option>
            {usuarios.map((usuario) => {
              return (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Adoptar
        </button>
      </form>
    </div>
  );
}
