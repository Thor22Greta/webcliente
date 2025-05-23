"use client";

import { Event } from "@/app/lib/data";
import { approveEvento, deleteEvento } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { EditarEvento, EliminarEvento } from "./buttons";

interface EventosTableProps {
  eventos: Event[];
  isAdmin: boolean;
  currentUserId: string;
}

export default function EventosTable({
  eventos,
  isAdmin,
  currentUserId,
}: EventosTableProps) {
  const today = new Date().toLocaleDateString();

  return (
    <div className="w-full">
      <h2 className="mb-6 text-xl md:text-2xl text-green-600 font-semibold">
        Eventos
      </h2>
      <div className="overflow-x-auto rounded-md bg-green-50 p-4">
        <table className="min-w-full text-sm text-left text-green-800">
          <thead className="bg-green-100 font-medium">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Lugar</th>
              <th className="px-4 py-2">Aprobado</th>
              <th className="px-4 py-2">Creador</th>
              {isAdmin && <th className="px-4 py-2 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200">
            {eventos.map((evento) => {
              const canView =
                evento.approved ||
                isAdmin ||
                evento.created_by === currentUserId;
              if (!canView) return null;

              const fecha = evento.event_date
                ? new Date(evento.event_date).toLocaleDateString()
                : today;

              return (
                <tr key={evento.id}>
                  <td className="px-4 py-2">{evento.name}</td>
                  <td className="px-4 py-2">{evento.description ?? "-"}</td>
                  <td className="px-4 py-2">{fecha}</td>
                  <td className="px-4 py-2">{evento.location ?? "-"}</td>
                  <td className="px-4 py-2">{evento.approved ? "✅" : "⏳"}</td>
                  <td className="px-4 py-2">{evento.creator}</td>
                  {isAdmin && (
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {!evento.approved && (
                          <form action={() => approveEvento(evento.id)}>
                            <Button
                              type="submit"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              Aprobar
                            </Button>
                          </form>
                        )}
                        <EditarEvento id={evento.id} />
                        <EliminarEvento id={evento.id} />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
