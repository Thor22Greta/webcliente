// Mantener solo la autenticación, sin hooks
import { signIn } from 'next-auth/react';

export async function authenticate(data: { email: string; password: string }): Promise<string | null> {
  const { email, password } = data;
  
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,  // No hacer redirección aquí
  });

  if (result?.error) {
    if (result.error === 'CredentialsSignin') {
      return 'Credenciales incorrectas.';
    }
    return 'Ocurrió un error inesperado al iniciar sesión.';
  }

  // Si el login es exitoso, no hacer redirección aquí
  return null;
}
