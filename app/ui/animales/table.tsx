import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedAnimalesTable } from '@/app/lib/definitions';
import { EditarAnimal, EliminarAnimal } from './buttons'; // Los botones serán importados

export default async function AnimalesTable({
  animales,
}: {
  animales: FormattedAnimalesTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 mt-2 text-xl md:text-2xl text-green-600`}>
        Listado de Animales
      </h1>
      <Search placeholder="Buscando animales..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-green-50 p-2 md:pt-0">
              {/* Vista para pantallas pequeñas */}
              <div className="md:hidden">
                {animales?.map((animal) => (
                  <div key={animal.id} className="mb-2 w-full rounded-md bg-green-100 p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            {animal.image_url && (
                              <Image
                                src={animal.image_url}
                                className="rounded-full"
                                alt={`${animal.name}'s profile picture`}
                                width={28}
                                height={28}
                              />
                            )}
                            <p>{animal.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-green-500">{animal.raza}</p>
                        <p className="text-sm text-green-500">{animal.edad} años</p>
                        <p className="text-sm text-green-500">
                          {animal.adopted ? 'Adoptado' : 'No adoptado'}
                        </p>
                        <p className="text-sm text-green-500">
                          {animal.adopted ? animal.adoptante_name : 'No disponible'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {/* Botones de acción */}
                        <EditarAnimal id={animal.id ? Number(animal.id) : 0} />
                        <EliminarAnimal id={animal.id ? Number(animal.id) : 0} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabla para pantallas grandes */}
              <table className="hidden min-w-full rounded-md text-green-900 md:table">
                <thead className="rounded-md bg-green-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Raza
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Edad
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Adoptado?
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Adoptante
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-green-200 text-green-900">
                  {animales.map((animal) => (
                    <tr
                      key={animal.id}
                      className="whitespace-nowrap bg-green-100 py-5 pl-4 pr-3 text-sm text-black"
                    >
                      <td className="px-4 py-5 sm:pl-6">
                        <div className="flex items-center gap-3">
                          {animal.image_url && (
                            <Image
                              src={animal.image_url}
                              className="rounded-full"
                              alt={`${animal.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                          )}
                          <p>{animal.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-5">{animal.raza}</td>
                      <td className="px-4 py-5">{animal.edad}</td>
                      <td className="px-4 py-5">{animal.adopted ? 'Sí' : 'No'}</td>
                      <td className="px-4 py-5">
                        {animal.adopted ? animal.adoptante_name : 'No adoptado'}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex gap-2">
                          <EditarAnimal id={animal.id ? Number(animal.id) : 0} />
                          <EliminarAnimal id={animal.id ? Number(animal.id) : 0} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
