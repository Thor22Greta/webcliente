'use client';

import { Event } from '@/app/lib/data';
import { editEvento } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function EditEventoForm({
  evento,
}: {
  evento: Event;
}) {
  return (
    <form
      action={(formData: FormData) => editEvento(evento.id, formData)}
      className="bg-green-50 rounded-md p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-green-600">Editar Evento</h2>

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={evento.name}
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
          defaultValue={evento.description || ''}
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
          defaultValue={new Date(evento.event_date).toISOString().split('T')[0]}
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
          defaultValue={evento.location || ''}
          className="w-full rounded-md border border-green-200 p-2"
        />
      </div>

      {/* Aprobado */}
      <div>
        <label htmlFor="approved" className="block mb-1 text-sm font-medium">Aprobado</label>
        <select
          id="approved"
          name="approved"
          defaultValue={evento.approved ? 'true' : 'false'}
          className="w-full rounded-md border border-green-200 p-2"
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
}