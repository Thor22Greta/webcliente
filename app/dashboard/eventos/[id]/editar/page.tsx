import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Evento',
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  console.log("ID recibido:", id);

  return (
    <main>
      <h1>Editando el Evento con ID: {id}</h1>
    </main>
  );
}