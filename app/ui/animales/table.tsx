"use client";

import { useState } from "react";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { FormattedAnimalesTable } from "@/app/lib/definitions";
import { EditarAnimal, EliminarAnimal as RawEliminarAnimal } from "./buttons";
import { TrashIcon } from "lucide-react";

// Modal de confirmación de eliminación
function EliminarAnimalModal({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4">¿Está seguro que desea eliminar este animal?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={() => closeModal()} // Cerrar el modal al cancelar
          >
            No
          </button>
          {/* Aquí pasamos closeModal a RawEliminarAnimal */}
          <RawEliminarAnimal id={id} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default function AnimalesTable({
  animales,
  isAdmin,
  userId,
}: {
  animales: FormattedAnimalesTable[];
  isAdmin?: boolean;
  userId?: string;
}) {
  const [confirm, setConfirm] = useState<number | null>(null); // Controlar el modal de confirmación

  const canEdit = (animal: FormattedAnimalesTable) =>
    isAdmin || animal.created_by === userId;
  const canDelete = isAdmin === true;

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 mt-2 text-xl md:text-2xl text-green-600`}
      >
        Listado de Animales
      </h1>
      <Search placeholder="Buscando animales..." />
      <div className="mt-6 flow-root overflow-x-auto rounded-md bg-green-50 p-2">
        <table className="min-w-full text-green-900">
          <thead className="bg-green-100 text-sm font-normal">
            <tr>
              <th className="px-4 py-5 text-left">Nombre</th>
              <th className="px-4 py-5 text-left">Raza</th>
              <th className="px-4 py-5 text-left">Edad</th>
              <th className="px-4 py-5 text-left">Adoptado?</th>
              <th className="px-4 py-5 text-left">Adoptante</th>
              <th className="px-4 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200 bg-green-100">
            {animales.map((animal) => (
              <tr key={animal.id} className="text-sm text-black">
                <td className="px-4 py-5 text-left">
                  <div className="flex items-center gap-3">
                    {animal.image_url && (
                      <Image
                        src={animal.image_url}
                        className="rounded-full"
                        alt={`${animal.name}'s picture`}
                        width={28}
                        height={28}
                      />
                    )}
                    {animal.name}
                  </div>
                </td>
                <td className="px-4 py-5 text-left">{animal.raza}</td>
                <td className="px-4 py-5 text-left">{animal.edad}</td>
                <td className="px-4 py-5 text-left">
                  {animal.adopted ? "Sí" : "No"}
                </td>
                <td className="px-4 py-5 text-left">
                  {animal.adopted ? animal.adoptante_name : "-"}
                </td>
                <td className="px-4 py-5 text-right space-x-2">
                  {canEdit(animal) && (
                    <div className="inline-block rounded-md border p-2 hover:bg-green-100 cursor-pointer">
                      <EditarAnimal id={animal.id} />
                    </div>
                  )}
                  {canDelete && (
                    <div className="inline-block rounded-md border p-2 hover:bg-green-100 cursor-pointer">
                      <button
                        onClick={() => setConfirm(animal.id)}
                        className="flex items-center justify-center"
                      >
                        <span className="sr-only">Eliminar</span>
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación si el id es seleccionado */}
      {confirm !== null && (
        <EliminarAnimalModal id={confirm} closeModal={() => setConfirm(null)} />
      )}
    </div>
  );
}
