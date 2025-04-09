'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Selecciona un usuario.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Selecciona una suma mayor a 0€.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Selecciona un estado en la donación.',
  }),
  date: z.string(),
});

const CrearDonacion = FormSchema.omit({ id: true, date: true });
const EditarDonacion = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null; 
};

export async function crearDonacion(prevState: State, formData: FormData) {
  const validatedFields = CrearDonacion.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error al crear la donación.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/donaciones');
  redirect('/dashboard/donaciones');
}

export async function editarDonacion(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = EditarDonacion.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/donaciones');
  redirect('/dashboard/donaciones');
}

export async function eliminarDonacion(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/donaciones');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const UsuarioFormSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio.' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido.' }),
  status: z.enum(['active', 'inactive'], {
    invalid_type_error: 'Selecciona un estado válido para el usuario.',
  }),
});

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    status?: string[];
  };
  message?: string | null; 
};

export async function agregarAnimal({
  name,
  raza,
  edad,
  adopted,
  customerId,
  image_url = "/images/logoverde.jpg", // Valor por defecto si no se provee imagen
}: {
  name: string;
  raza: string;
  edad: number;
  adopted: boolean;
  customerId?: string;
  image_url?: string;
}) {
  try {
    await sql`
      INSERT INTO animales (name, raza, edad, adopted, customer_id, image_url)
      VALUES (${name}, ${raza}, ${edad}, ${adopted}, ${customerId || null}, ${image_url})
    `;
  } catch (error) {
    console.error('Error al agregar animal:', error);
    throw new Error('No se pudo agregar el animal.');
  }
}


export async function eliminarAnimal(id: string) {
  try {
    await sql`
      DELETE FROM animales
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error al eliminar el animal:', error);
  }

  revalidatePath('/dashboard/animales');
  redirect('/dashboard/animales');
}

export async function obtenerAnimalPorId(id: string) {
  try {
    const result = await sql`SELECT * FROM animales WHERE id = ${id}`;
    
    if (result.rowCount === 0) {
      throw new Error('Animal no encontrado');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener el animal:', error);
    throw new Error('No se pudo obtener el animal.');
  }
}

export async function actualizarAnimal(animal: {
  id: number;
  name: string;
  raza: string;
  edad: number;
  adopted: boolean;
  customerId?: string;
}) {
  try {
    await sql`
      UPDATE animales
      SET name = ${animal.name}, 
          raza = ${animal.raza}, 
          edad = ${animal.edad}, 
          adopted = ${animal.adopted}, 
          customer_id = ${animal.customerId || null}
      WHERE id = ${animal.id}
    `;
  } catch (error) {
    console.error('Error al actualizar el animal:', error);
    throw new Error('No se pudo actualizar el animal.');
  }
}

export async function crearUsuario({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  if (!name || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  // Encriptar la contraseña usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password, "isAdmin")
      VALUES (${name}, ${email}, ${hashedPassword}, false)
    `;
  } catch (error) {
    console.error('Error en la base de datos al crear usuario:', error);
    throw new Error('Error en la base de datos al crear el usuario.');
  }
}

export async function adoptarAnimal(
  animalId: number,
  adoptanteId: string
) {
  const fechaAdopcion = new Date().toISOString().split('T')[0];

  try {
    // Actualizamos el animal en la tabla "animales"
    await sql`
      UPDATE animales
      SET adopted = true, customer_id = ${adoptanteId}
      WHERE id = ${animalId}
    `;

    // Insertamos un registro en la tabla "adopciones"
    await sql`
      INSERT INTO adopciones (animal_id, customer_id, fecha_adopcion)
      VALUES (${animalId}, ${adoptanteId}, ${fechaAdopcion})
    `;

    // Revalidamos la ruta para que los cambios se reflejen (si usas ISR)
    revalidatePath('/dashboard/animales');
  } catch (error) {
    console.error('Error al adoptar animal:', error);
    throw new Error('No se pudo adoptar el animal.');
  }
}

export async function createUsuario({ name, email, password }: { name: string; email: string; password: string }) {
  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}

export async function createCustomer({
  name,
  email,
  imageUrl,
}: {
  name: string;
  email: string;
  imageUrl: string; // Se agrega la URL de la imagen
}) {
  if (!name || !email || !imageUrl) {
    throw new Error('Todos los campos son obligatorios');
  }

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageUrl}) -- Añadimos image_url
    `;
  } catch (error) {
    console.error('Error en la base de datos al crear customer:', error);
    throw new Error('Error al crear el customer.');
  }
}