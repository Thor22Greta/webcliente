import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import UltimasDonaciones from '@/app/ui/dashboard/ultimas-donaciones';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  UltimasDonacionesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-green-600`}>
        Menú
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<UltimasDonacionesSkeleton />}>
          <UltimasDonaciones />
        </Suspense>
      </div>
    </main>
  );
}
