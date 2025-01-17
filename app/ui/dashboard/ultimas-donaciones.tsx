import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchUltimasDonaciones } from '@/app/lib/data';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function UltimasDonaciones() {
  const UltimasDonaciones = await fetchUltimasDonaciones();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ultimas Donaciones
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {UltimasDonaciones.map((donacion: { id: Key | null | undefined; image_url: string | StaticImport; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, d: any) => {
            return (
              <div
                key={donacion.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': d !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={donacion.image_url}
                    alt={`${donacion.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {donacion.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {donacion.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {donacion.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Editado ahora</h3>
        </div>
      </div>
    </div>
  );
}
