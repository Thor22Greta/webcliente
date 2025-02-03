import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedAnimalesTable } from '@/app/lib/definitions';

export default async function AnimalesTable({
  animales,
}: {
  animales: FormattedAnimalesTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl text-green-600`}>
        Animales
      </h1>
      <Search placeholder="Buscando animales..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
              {animales?.map((animal) => (
                <div key={animal.id} 
                  className="mb-2 w-full rounded-md bg-green-100 p-4"
                          >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/public/animales/beagle.jpg"
                              className="rounded-full"
                              alt={`${animal.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{animal.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{animal.raza}</p>
                        <p className="text-sm text-gray-500">{animal.edad} años</p>
                        <p className="text-sm text-gray-500">
                          {animal.adopted ? 'Adoptado' : 'No adoptado'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {animal.adopted ? animal.adoptante_name : 'No disponible'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabla para pantallas grandes */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
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
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
  {animales.map((animal) => (
    <tr key={animal.id || animal.name}> {/* Usa `animal.id` si está disponible */}
      <td className="whitespace-nowrap bg-green-100 py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
        <div className="flex items-center gap-3">
        <Image
  src="/animales/beagle.jpg"
  className="rounded-full"
  alt={`${animal.name}'s profile picture`}
  width={28}
  height={28}
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
      <td className="whitespace-nowrap bg-green-100 px-4 py-5 text-sm">
        {animal.adopted ? 'Sí' : 'No'}
      </td>
      <td className="whitespace-nowrap bg-green-100 px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
        {animal.adopted ? animal.adoptante_name : 'No adoptado'}
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
