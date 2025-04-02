import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function authenticateUser(email: string, password: string) {
  const result = await sql`
    SELECT id, name, email, password, is_admin
    FROM users
    WHERE email = ${email}
  `;

  const user = result.rows[0];
if (!user) throw new Error('Usuario no encontrado');

const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) throw new Error('Contraseña incorrecta');

return {
  id: user.id,
  name: user.name,
  email: user.email as string, // 👈 Forzar tipo
  isAdmin: user.is_admin,
  emailVerified: user.email_verified,
};
}
