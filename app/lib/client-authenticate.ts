import { signIn } from 'next-auth/react';

export async function authenticate(prevState: string | undefined | null, formData: FormData): Promise<string | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,  // Asegúrate de que el redireccionamiento esté en false si deseas manejarlo manualmente
  });

  if (result?.error) {
    if (result.error === 'CredentialsSignin') {
      return 'Credenciales incorrectas.';
    }
    return 'Ocurrió un error inesperado al iniciar sesión.';
  }

  // Si todo es correcto, redirige a la página deseada
  window.location.href = '/dashboard'; // o redirige programáticamente con router.push
  return null;
}