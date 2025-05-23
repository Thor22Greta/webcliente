'use client';

import { createEvento } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function CreateEventoForm() {
  return (
    <form action={createEvento} className="bg-green-50 rounded-md p-6 space-y-4">
      <h3 className="text-xl mb-4 text-green-600 font-semibold">Crear Evento</h3>

      {/* Nombre */}
      <div>
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
      <div>
        <label htmlFor="description" className="block mb-1 text-sm font-medium">Descripción</label>
        <textarea
          id="description"
          name="description"
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      {/* Fecha */}
      <div>
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
      <div>
        <label htmlFor="location" className="block mb-1 text-sm font-medium">Lugar</label>
        <input
          id="location"
          name="location"
          type="text"
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Crear Evento</Button>
      </div>
    </form>
  );
}