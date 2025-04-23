'use client';

import { createEvento } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function CreateEventoForm() {
  return (
    <form action={createEvento} className="bg-green-50 rounded-md p-6">
      <h3 className="text-xl mb-4 text-green-600 font-semibold">Crear Evento</h3>

      {/* Nombre */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 text-sm font-medium">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-sm font-medium">Descripción</label>
        <textarea
          id="description"
          name="description"
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      {/* Fecha */}
      <div className="mb-4">
        <label htmlFor="event_date" className="block mb-1 text-sm font-medium">Fecha</label>
        <input
          id="event_date"
          name="event_date"
          type="date"
          required
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      {/* Lugar */}
      <div className="mb-6">
        <label htmlFor="location" className="block mb-1 text-sm font-medium">Lugar</label>
        <input
          id="location"
          name="location"
          type="text"
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit">Crear Evento</Button>
      </div>
    </form>
  );
}