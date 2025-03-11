'use client';

import { useState } from 'react';
import AvaLogo from '@/app/ui/avalogo';
import LoginForm from '@/app/ui/login-form';
import RegisterForm from '@/app/ui/register-form';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Logo */}
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AvaLogo />
          </div>
        </div>

        {/* Formulario dinámico */}
        {isRegister ? <RegisterForm /> : <LoginForm />}

        {/* Botón para alternar entre Login/Register */}
        <div className="text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-blue-500 hover:underline"
          >
            {isRegister
              ? '¿Ya tienes una cuenta? Inicia sesión'
              : '¿No tienes una cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </main>
  );
}
