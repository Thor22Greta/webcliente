import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si no hay token, redirigir al inicio de sesión
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Continuar con la solicitud si hay token
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/profile'],  // Rutas protegidas
};
