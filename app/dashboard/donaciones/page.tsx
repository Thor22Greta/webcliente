import Pagination from '@/app/ui/donaciones/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/donaciones/table';
import { CrearDonacion } from '@/app/ui/donaciones/buttons';
import { lusitana } from '@/app/ui/fonts';
import { DonacionesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchDonacionesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Donaciones',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchDonacionesPages(query);
  const session = await auth(); // Usamos auth() para obtener la sesión
  const isAdmin = session?.user?.isAdmin; // Esto nos indica si el usuario es admin

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-green-600`}>Donaciones</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscando donaciones..." />
        {/* Cualquier usuario puede crear una donación */}
        <CrearDonacion />
      </div>
      
      {/* En la tabla, le pasamos isAdmin para que controle qué botones mostrar */}
      <Suspense key={query + currentPage} fallback={<DonacionesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} isAdmin={isAdmin} />
      </Suspense>
      
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
