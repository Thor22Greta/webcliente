import { sql } from '@vercel/postgres';
import {
  UsuarioField,
  UsuariosTableType,
  DonacionForm,
  DonacionesTable,
  UltimasDonacionesRaw,
  AnimalesTableType,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchUltimasDonaciones() {
  try {
    const data = await sql<UltimasDonacionesRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const UltimasDonaciones = data.rows.map((invoices) => ({
      ...invoices,
      amount: formatCurrency(invoices.amount),
    }));
    return UltimasDonaciones;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const donacionCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const usuarioCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const donacionStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      donacionCountPromise,
      usuarioCountPromise,
      donacionStatusPromise,
    ]);

    const numeroDeDonaciones = Number(data[0].rows[0].count ?? '0');
    const numeroDeUsuarios = Number(data[1].rows[0].count ?? '0');
    const totalPagadoDonaciones = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendienteDonaciones = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numeroDeUsuarios,
      numeroDeDonaciones,
      totalPagadoDonaciones,
      totalPendienteDonaciones,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFiltradoDonaciones(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const donaciones = await sql<DonacionesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return donaciones.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchDonacionesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchDonacionById(id: string) {
  try {
    const data = await sql<DonacionForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoices = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoices[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchUsuarios() {
  try {
    const data = await sql<UsuarioField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const usuarios = data.rows;
    return usuarios;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFiltradosUsuarios(query: string) {
  try {
    const data = await sql<UsuariosTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const usuarios = data.rows.map((usuario) => ({
      ...usuario,
      total_pending: formatCurrency(usuario.total_pending),
      total_paid: formatCurrency(usuario.total_paid),
    }));

    return usuarios;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFiltradosAnimales(query: string) {
  try {
    const data = await sql<AnimalesTableType>`
      SELECT
        animales.external_id,
        animales.name,
        animales.raza,
        animales.image_url,
        animales.edad,
        animales.adopted,
        animales.customer_id,
        customers.name AS adoptante_name
      FROM animales
      LEFT JOIN customers ON animales.customer_id = customers.id
      WHERE
        animales.name ILIKE ${`%${query}%`} OR
        animales.raza ILIKE ${`%${query}%`}
      ORDER BY animales.name ASC
    `;

    return data.rows.map((animal) => ({
      ...animal,
      adoptante_name: animal.adoptante_name || null, // Manejo de NULL en adoptante
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch animal table.');
  }
}


// Ensure this file exports the fetchAnimalesPages function



export async function fetchAnimalesPages(query: string): Promise<number> {

  // Implementation of the function

  return 10; // Example return value

}
