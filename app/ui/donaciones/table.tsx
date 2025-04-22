import Image from 'next/image';
import { EditarDonacion, EliminarDonacion } from '@/app/ui/donaciones/buttons';
import DonacionStatus from '@/app/ui/donaciones/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFiltradoDonaciones } from '@/app/lib/data';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

type Donacion = {
  id: string;
  image_url: string | StaticImport;
  name: ReactNode; // O ajusta el tipo según corresponda
  email: ReactNode;
  status: any;
  amount: number;
  date: string;
};

type DonacionTableProps = {
  query: string;
  currentPage: number;
  isAdmin?: boolean;
};

export default async function DonacionTable({
  query,
  currentPage,
  isAdmin,
}: DonacionTableProps) {
  const donaciones: Donacion[] = await fetchFiltradoDonaciones(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-green-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {donaciones?.map((donacion) => (
              <div key={donacion.id} className="mb-2 w-full rounded-md bg-green-100 p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={donacion.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${donacion.name}'s profile picture`}
                      />
                      <p>{donacion.name}</p>
                    </div>
                    <p className="text-sm text-green-500">{donacion.email}</p>
                  </div>
                  <DonacionStatus status={donacion.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{formatCurrency(donacion.amount)}</p>
                    <p>{formatDateToLocal(donacion.date)}</p>
                  </div>
                  {isAdmin && (
                    <div className="flex justify-end gap-2">
                      <EditarDonacion id={donacion.id} />
                      <EliminarDonacion id={donacion.id} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full rounded-md text-green-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Donante
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Suma
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                {isAdmin && (
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {donaciones?.map((donacion) => (
                <tr
                  key={donacion.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={donacion.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${donacion.name}'s profile picture`}
                      />
                      <p>{donacion.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{donacion.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatCurrency(donacion.amount)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(donacion.date)}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <DonacionStatus status={donacion.status} />
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <EditarDonacion id={donacion.id} />
                        <EliminarDonacion id={donacion.id} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
