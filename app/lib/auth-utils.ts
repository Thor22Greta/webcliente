import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import type { User } from './definitions';

export async function authenticateUser(
  email: string | undefined,
  password: string | undefined
): Promise<User | null> {
  if (!email || !password) {
    console.error('Correo electrónico o contraseña indefinidos pasados a authenticateUser');
    return null;
  }

  const safeEmail = email as string;
  const safePassword = password as string;

  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${safeEmail}`;
    const userRow = result.rows[0];

    if (!userRow || !userRow.password) {
      return null;
    }

    const passwordsMatch = await bcrypt.compare(safePassword, userRow.password as string);

    if (passwordsMatch) {
      return userRow;
    }

    return null;
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    return null;
  }
}
