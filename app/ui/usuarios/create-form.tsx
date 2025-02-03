'use client';

import { UsuarioField } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { crearUsuario, UserState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: UserState = { message: '', errors: {} };
  const [state, formAction] = useActionState(crearUsuario, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-green-50 p-4 md:p-6">
        {/* Nombre del Usuario */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre del Usuario
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Introduce el nombre"
              className="peer block w-full rounded-md border border-green-200 py-2 pl-10 text-sm outline-2 placeholder:text-green-500"
              aria-describedby="name-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500" />
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Correo Electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Correo Electrónico
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Introduce el correo electrónico"
              className="peer block w-full rounded-md border border-green-200 py-2 pl-10 text-sm outline-2 placeholder:text-green-500"
              aria-describedby="email-error"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500" />
          </div>

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/usuarios"
          className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Usuario</Button>
      </div>
    </form>
  );
}
