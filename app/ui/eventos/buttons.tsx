'use client';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteEvento } from '@/app/lib/actions';

export function EditarEvento({ id }: { id?: string }) {
  return (
    <Link
      href={`/dashboard/eventos/${id}/editar`}
      className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-green-100"
    >
      <span className="sr-only">Editar</span>
      <PencilIcon className="w-5 h-5" />
    </Link>
  );
}

export function EliminarEvento({ id }: { id: string }) {
  const handle = deleteEvento.bind(null, id);

  return (
    <form className="inline-flex" action={handle}>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-green-100"
      >
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5 h-5" />
      </button>
    </form>
  );
}