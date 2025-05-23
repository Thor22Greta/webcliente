import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { eliminarDonacion } from '@/app/lib/actions';

export function CrearDonacion() {
  return (
    <Link
      href="/dashboard/donaciones/crear"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Crear Donacion</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditarDonacion({ id }: { id?: string  }) {
  return (
    <Link
      href={`/dashboard/donaciones/${id}/editar`}
      className="rounded-md border p-2 hover:bg-green-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function EliminarDonacion({ id }: { id: string }) {
  const EliminarDonacionWithId = eliminarDonacion.bind(null, id);

  return (
    <form action={EliminarDonacionWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-green-100">
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
