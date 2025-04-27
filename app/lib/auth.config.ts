import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser } from './auth-utils';
import type { User } from './definitions';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  providers: [
    CredentialsProvider({ // La configuración del provider va aquí
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo electrónico', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const user = await authenticateUser(credentials.email, credentials.password);

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error al autenticar usuario:', error);
          return null;
        }
      },
    }),
    // Puedes agregar otros providers aquí (ej., Google, Facebook, etc.)
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }): Promise<JWT> {
      if (user) {
        token = {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin === true,
          emailVerified: user.emailVerified,
        } as JWT;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT & { emailVerified?: boolean } }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string | undefined;
        session.user.email = token.email as string | undefined;
        session.user.isAdmin = token.isAdmin as boolean | undefined;
        session.user.emailVerified = token.emailVerified as boolean | undefined;
      }
      return session;
    },
  },
};