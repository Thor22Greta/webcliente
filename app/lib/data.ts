import { sql } from '@vercel/postgres';
import {
  UsuarioField,
  UsuariosTableType,
  DonacionForm,
  DonacionesTable,
  UltimasDonacionesRaw,
  Revenue,
  FormattedAnimalesTable,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {

    const data = await sql<Revenue>`SELECT * FROM revenue`;

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
  const result = await sql<FormattedAnimalesTable>`
    SELECT 
      id::text,
      name,
      raza,
      edad,
      adopted,
      image_url,
      (
        SELECT name FROM customers WHERE id = animales.customer_id
      ) AS adoptante_name,
      created_by::text
    FROM animales
    WHERE name ILIKE ${'%' + query + '%'}
    ORDER BY name
  `;
  return result.rows;
}

export async function fetchAnimalesPages(query: string): Promise<number> {


  return 10; 

}
export type Event = {
  id: string;
  name: string;
  description: string | null;
  event_date: string;
  location: string | null;
  approved: boolean;
  created_by: string;
  created_at: string;
  creator: string;
};

export async function fetchEventos(): Promise<Event[]> {
  const { rows } = await sql<Event>`
    SELECT 
      e.id, 
      e.name, 
      e.description, 
      e.event_date, 
      e.location, 
      e.approved, 
      e.created_by, 
      e.created_at,
      u.name AS creator
    FROM eventos e
    JOIN users u ON e.created_by = u.id
    ORDER BY e.event_date DESC;
  `;
  return rows;
}
export async function fetchEventoById(id: string): Promise<Event | null> {
  try {
    const { rows } = await sql`
      SELECT e.id, e.name, e.description, e.event_date, e.location, e.approved, e.created_by, u.name AS creator
      FROM eventos e
      JOIN users u ON e.created_by = u.id
      WHERE e.id = ${id}
      LIMIT 1;
    `;

    if (rows[0]) {
      const evento = rows[0] as Event; 
      return evento;
    }

    return null;
  } catch (error) {
    console.error('Error fetching evento by id:', error);
    return null;
  }
}