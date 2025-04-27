'use client';

import { authenticate } from '@/app/lib/client-authenticate';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter correctamente

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false); // Controla si el componente está montado
  const router = useRouter(); // Llamamos directamente a useRouter aquí

  // Usar useEffect para asegurarnos de que el router solo se usa en el cliente
  useEffect(() => {
    setMounted(true); // Cambia el estado a true cuando el componente está montado
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await authenticate({ email, password });

    if (result) {
      setErrorMessage(result);
    } else {
      // Asegurarse de que el router está disponible y el componente está montado
      if (mounted && router) {
        router.push('/dashboard'); // Uso correcto de router.push
      }
    }

    setIsPending(false);
  };

  // Si el componente no se ha montado en el cliente, no renderizamos nada
  if (!mounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-green-200 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-green-600`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-green-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-green-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-green-500"
                id="email"
                type="email"
                name="email"
                placeholder="Introduce tu e-mail"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 texteen-500 peer-focus:text-green-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-green-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-green-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-green-500"
                id="password"
                type="password"
                name="password"
                placeholder="Introduce el password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500 peer-focus:text-green-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-green-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
