// app/ui/eventos/action-buttons.tsx
'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteEvento } from '@/app/lib/actions';

export function EditarEvento({ id }: { id?: string }) {
  return (
    <Link
      href={`/dashboard/eventos/${id}/editar`}
      className="rounded-md border p-2 hover:bg-green-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function EliminarEvento({ id }: { id: string }) {
  // bindea el id al action correcto
  const handle = deleteEvento.bind(null, id);

  return (
    <form action={handle}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-green-100"
      >
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
