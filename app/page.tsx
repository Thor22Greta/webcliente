import AvaLogo from '@/app/ui/avalogo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { FaInstagram, FaFacebook, FaStore } from 'react-icons/fa';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-52 relative">
        {/* Logo */}
        <div className="relative w-32 h-full md:w-36">
          <AvaLogo />
        </div>
        {/* Enlace a la tienda, fijado a la derecha */}
        <Link 
          href="https://tu-tienda-online.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white text-sm md:text-base bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <FaStore className="w-5 h-5 md:w-6 md:h-6" />
          <span>Visita Nuestra Tienda</span>
        </Link>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-green-200 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-green-800 md:text-3xl md:leading-normal`}
          >
            <strong>Bienvenido a AVA.</strong><br />
            Visita nuestro Instagram{' '}
            
            <a href="https://www.instagram.com/animalistesvalldalbaida/" className="text-green-500">
            <FaInstagram className="text-green-500" />Animalistes Vall d'Albaida.
            </a>
          </p>
          <p
            className={`${lusitana.className} text-xl text-green-800 md:text-3xl md:leading-normal`}
          >
            Visita nuestro Facebook{' '}
            <a href="https://www.facebook.com/p/Animalistes-Vall-dAlbaida-61557054398851/?locale=ca_ES" className="text-green-500">
            <FaFacebook className="text-green-500" />Animalistes Vall d'Albaida.
            </a>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/opengraph-ava.jpg"
            width={1000}
            height={760}
            alt="Screenshots of the dashboard project showing desktop version"
            className="hidden md:block"
          />
          <Image
            src="/opengraph-ava.jpg"
            width={560}
            height={620}
            alt="Screenshot of the dashboard project showing mobile version"
            className="block md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
