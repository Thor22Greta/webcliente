import Image from 'next/image';
import { FormattedAnimalesTable } from '@/app/lib/definitions';

export default function AdopcionesTable({
  animales,
}: {
  animales: FormattedAnimalesTable[];
}) {
  return (
    <div className="w-full">
      <h1 className="lusitana_e85447be-module__j818aG__className text-2xl text-green-600">Animales Disponibles para Adopción</h1>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-green-50 p-4 md:pt-0">
            {/* Mobile View */}
            <div className="md:hidden">
              {animales?.map((animal) => (
                <div
                  key={animal.id}
                  className="mb-4 w-full rounded-md bg-green-100 p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={animal.image_url}
                        alt={animal.name}
                        className="rounded-full"
                        width={50}
                        height={50}
                      />
                      <p className="text-lg font-medium">{animal.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-500">Raza: {animal.raza}</p>
                  <p className="text-sm text-green-500">Edad: {animal.edad}</p>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <table className="hidden min-w-full rounded-md text-green-900 md:table">
              <thead className="rounded-md bg-green-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Nombre
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Raza
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Edad
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Imagen
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-green-200 text-green-900">
                {animales.map((animal) => (
                  <tr key={animal.id} className="group">
                    <td className="whitespace-nowrap bg-green-100 py-5 px-4 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      <div className="flex items-center gap-3">
                        <Image
                          src={animal.image_url}
                          alt={animal.name}
                          className="rounded-full"
                          width={40}
                          height={40}
                        />
                        <p>{animal.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-green-100 px-4 py-5 text-sm">
                      {animal.raza}
                    </td>
                    <td className="whitespace-nowrap bg-green-100 px-4 py-5 text-sm">
                      {animal.edad}
                    </td>
                    <td className="whitespace-nowrap bg-green-100 px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      <Image
                        src={animal.image_url}
                        alt={animal.name}
                        className="w-16 h-16 object-cover rounded-full"
                        width={64}
                        height={64}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
