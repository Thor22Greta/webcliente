import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { eliminarAnimal } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

// Botón para editar un animal
export function EditarAnimal({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/animales/${id}/editar`}
      className="flex items-center justify-center w-5 h-5"
    >
      <PencilIcon className="w-5 h-5" />
    </Link>
  );
}

// Botón para eliminar un animal
export function EliminarAnimal({
  id,
  closeModal,
}: {
  id: number;
  closeModal?: () => void;
}) {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await eliminarAnimal(id.toString());

    if (closeModal) closeModal();

    // ✅ Redireccionar en el cliente
    router.push("/dashboard/animales");
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-green-100"
      >
        <span className="sr-only">Eliminar</span>
        🗑️
      </button>
    </form>
  );
}
