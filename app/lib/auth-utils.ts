// app/lib/auth-utils.ts
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import type { User } from './definitions';

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const userRow = user.rows[0];

    if (!userRow) return null;

    const passwordsMatch = await bcrypt.compare(password, userRow.password);

    if (passwordsMatch) {
      return userRow;
    }

    return null;
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    return null;
  }
}