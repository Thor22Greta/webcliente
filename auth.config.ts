import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt', // 
  },

  pages: {
    signIn: '/login',
  },

  providers: [
    // Aquí agregas CredentialsProvider desde otro archivo, como haces en `auth.ts`
  ],

  callbacks: {
    // ✅ JWT: guarda info en el token cuando el usuario inicia sesión
    async jwt({ token, user }) {
      if (user) {
        console.log('JWT Callback - usuario:', user); // Verifica que user.isAdmin sea true
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }
      console.log('JWT Callback - token:', token);
      return token;
    },

    // ✅ Session: expone info del token a la sesión en el cliente
    async session({ session, token }) {
      if (token && session.user) {
        console.log('Session Callback - token:', token); // Asegúrate que token.isAdmin sea true
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      console.log('Session Callback - session:', session);
      return session;
    },

    // ✅ Redirección según si está autenticado
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
