import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    isAdmin?: boolean; // ✅ Añadir `isAdmin` al tipo User
  }

  interface Session {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      isAdmin?: boolean; // ✅ Añadir `isAdmin` a la sesión
    };
  }
}
