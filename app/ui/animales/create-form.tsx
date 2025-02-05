'use client';

import { useState } from 'react';
import { agregarAnimal } from '@/app/lib/actions';

export default function Form() {
  const [name, setName] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [adopted, setAdopted] = useState(false);
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await agregarAnimal({ name, raza, edad: Number(edad), adopted, customerId });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Nombre del animal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Raza */}
      <div>
        <label htmlFor="raza" className="block text-sm font-medium text-gray-700">Raza</label>
        <input
          type="text"
          id="raza"
          placeholder="Raza del animal"
          value={raza}
          onChange={(e) => setRaza(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Edad */}
      <div>
        <label htmlFor="edad" className="block text-sm font-medium text-gray-700">Edad</label>
        <input
          type="number"
          id="edad"
          placeholder="Edad del animal"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Adoptado */}
      <div className="flex items-center space-x-4">
        <label htmlFor="adopted" className="text-sm text-gray-700">¿Está adoptado?</label>
        <input
          type="checkbox"
          id="adopted"
          checked={adopted}
          onChange={(e) => setAdopted(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      {/* ID del adoptante (opcional) */}
      <div>
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">ID del Adoptante (opcional)</label>
        <input
          type="text"
          id="customerId"
          placeholder="ID del adoptante"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Agregar Animal
      </button>
    </form>
  );
}
