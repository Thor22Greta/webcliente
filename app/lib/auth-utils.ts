import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import type { User } from './definitions';

export async function authenticateUser(
  email: string | undefined,
  password: string | undefined
): Promise<User | null> {
  if (!email || !password) {
    console.error('Email o contraseña no válidos');
    return null;
  }

  const safeEmail = email;
  const safePassword = password;

  try {
    // Eliminamos cualquier referencia a email_verified
    const result = await sql<User>`
      SELECT
        id,
        name,
        email,
        password,
        "isAdmin"
      FROM users
      WHERE email = ${safeEmail}
    `;
    const userRow = result.rows[0];
    if (!userRow || !userRow.password) return null;

    const isValid = await bcrypt.compare(safePassword, userRow.password);
    if (!isValid) return null;

    return {
      id:      userRow.id,
      name:    userRow.name,
      email:   userRow.email,
      isAdmin: userRow.isAdmin === true,
    };
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    return null;
  }
}
