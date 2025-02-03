'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { crearAnimal } from '@/app/lib/actions';

export default function CrearAnimalForm() {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [errores, setErrores] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    const erroresValidacion: string[] = [];
    if (!nombre) erroresValidacion.push('El nombre es obligatorio.');
    if (!raza) erroresValidacion.push('La raza es obligatoria.');
    if (!edad || isNaN(Number(edad))) erroresValidacion.push('La edad es obligatoria y debe ser un número.');
    if (!imagen) erroresValidacion.push('La imagen es obligatoria.');

    if (erroresValidacion.length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    // Lógica para crear el animal
    const nuevoAnimal = { nombre, raza, edad: Number(edad), imagen };
    await crearAnimal(nuevoAnimal);

    // Limpiar el formulario
    setNombre('');
    setRaza('');
    setEdad('');
    setImagen(null);
    setErrores([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block">Nombre del Animal</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="raza" className="block">Raza</label>
        <input
          id="raza"
          type="text"
          value={raza}
          onChange={(e) => setRaza(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="edad" className="block">Edad</label>
        <input
          id="edad"
          type="text"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="imagen" className="block">Imagen</label>
        <input
          id="imagen"
          type="file"
          onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {errores.length > 0 && (
        <div className="text-red-500">
          {errores.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <Button type="submit">Crear Animal</Button>
    </form>
  );
}
