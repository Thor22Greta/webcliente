// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.


// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Usuario = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Donacion = {
  id: string;
  usuario_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type UltimasDonaciones = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type UltimasDonacionesRaw = Omit<UltimasDonaciones, 'amount'> & {
  amount: number;
};

export type DonacionesTable = {
  id: string;
  usuario_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pendiente' | 'pagado';
};

export type UsuariosTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedUsuariosTable = {
  total_invoices: number;
  total_pending: string;
  total_paid: string;
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type UsuarioField = {
  id: string;
  name: string;
};

export type DonacionForm = {
  usuario_id: string | number | readonly string[] | undefined;
  id: string;
  amount: number;
  status: 'pendiente' | 'pagado';
};
