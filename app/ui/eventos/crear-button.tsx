'use client';

import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export function CrearEvento() {
  return (
    <Link
      href="/dashboard/eventos/crear"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500"
    >
      <span className="hidden md:block">Crear Evento</span>
      <PlusIcon className="h-5 md:ml-2" />
    </Link>
  );
}
