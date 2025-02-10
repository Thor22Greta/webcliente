import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { eliminarAnimal } from '@/app/lib/actions';

export function EditarAnimal({ id }: { id: number }) {
  console.log('id', id);
  return (
    <Link
      href={`/dashboard/animales/${id}/editar`}
      className="rounded-md border p-2 hover:bg-green-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function EliminarAnimal({ id }: { id: number }) {
  const eliminarAnimalWithId = eliminarAnimal.bind(null, id.toString());

  return (
    <form action={eliminarAnimalWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-green-100">
        <span className="sr-only">Eliminar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
