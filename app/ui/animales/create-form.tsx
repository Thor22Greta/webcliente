'use client';

import { useState, useEffect } from 'react';
import { agregarAnimal, fetchAdoptantes } from '@/app/lib/actions';

export default function CrearAnimalForm() {
  const [name, setName] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [adopted, setAdopted] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [donantes, setDonantes] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Carga la lista de donantes/usuarios solo si 'adopted' es true
  useEffect(() => {
    async function loadDonantes() {
      if (adopted) {
        try {
          const lista = await fetchAdoptantes();
          setDonantes(lista);
        } catch (err) {
          console.error('No se pudo cargar la lista de adoptantes:', err);
        }
      } else {
        setDonantes([]);
        setCustomerId('');
      }
    }
    loadDonantes();
  }, [adopted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !raza || Number(edad) <= 0) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    if (adopted && !customerId) {
      setError('Selecciona un adoptante si marcaste "adoptado".');
      return;
    }

    try {
      await agregarAnimal({
        name,
        raza,
        edad: Number(edad),
        adopted,
        customerId: adopted ? customerId : undefined,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Error al agregar el animal.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
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
        <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
          Raza
        </label>
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
        <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
          Edad
        </label>
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
        <input
          type="checkbox"
          id="adopted"
          checked={adopted}
          onChange={(e) => setAdopted(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="adopted" className="text-sm text-gray-700">
          ¿Está adoptado?
        </label>
      </div>

      {/* Selector de adoptante (solo si adopted = true) */}
      {adopted && (
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
            Selecciona Adoptante
          </label>
          <select
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- ADOPTANTE --</option>
            {donantes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

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
