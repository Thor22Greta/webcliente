import { fetchFiltradosAnimales } from '@/app/lib/data';
import AnimalesTable from '@/app/ui/animales/table';
import CrearAnimalForm from '@/app/ui/animales/create-form';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/lib/auth.config';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authConfig);

  // 1. Guard: si no hay sesión o no hay user.id, redirige.
  if (!session?.user?.id) {
    redirect('/login');
  }

  // 2. A este punto TS sabe que session.user.id es un string
  const userId: string = session.user.id;
  const isAdmin = session.user.isAdmin ?? false;
  const animales = await fetchFiltradosAnimales('');

  return (
    <main>
      <h1 className="text-2xl text-green-600 mb-4">Animales</h1>

      {/* Aquí ya pasa un string limpio */}
      <CrearAnimalForm userId={userId} />

      <AnimalesTable 
        animales={animales} 
        isAdmin={isAdmin} 
        userId={userId} 
      />
    </main>
  );
}
