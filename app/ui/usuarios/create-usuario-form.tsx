"use client";

import { useActionState } from 'react';
import { Button } from '@/app/ui/button';
import { createCustomer as _createCustomer, UserState } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Tipo para los datos que esperamos del formulario
type CustomerFormInput = {
  name: string;
  email: string;
  imageUrl: string; // URL de la imagen
};

async function action(state: UserState, payload: unknown): Promise<UserState> {
  const formData = payload as globalThis.FormData;
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const imageUrl = formData.get('imageUrl')?.toString() ?? '';

  const customerData: CustomerFormInput = { name, email, imageUrl };

  try {
    await _createCustomer(customerData);
    return { message: null, errors: {} };
  } catch (error: any) {
    return { message: 'Error al crear el donante.', errors: {} };
  }
}

export default function CreateCustomerForm() {
  const router = useRouter();
  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="rounded-md bg-green-50 p-4 md:p-6">
      {/* Campo Nombre */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nombre"
          required
          className="peer block w-full rounded-md border border-green-200 py-2 pl-10 text-sm outline-2 placeholder:text-green-500"
        />
      </div>

      {/* Campo Correo electrónico */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          className="peer block w-full rounded-md border border-green-200 py-2 pl-10 text-sm outline-2 placeholder:text-green-500"
        />
      </div>

      {/* Campo Imagen URL */}
      <div className="mb-4">
        <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
          URL de Imagen
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="URL de la imagen"
          required
          className="peer block w-full rounded-md border border-green-200 py-2 pl-10 text-sm outline-2 placeholder:text-green-500"
        />
      </div>

      {/* Mensaje general */}
      {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-green-100 px-4 text-sm font-medium text-green-600 transition-colors hover:bg-green-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Customer</Button>
      </div>
    </form>
  );
}
