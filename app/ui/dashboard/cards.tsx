import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  recolectado: BanknotesIcon,
  usuarios: UserGroupIcon,
  pending: ClockIcon,
  donaciones: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numeroDeDonaciones,
    numeroDeUsuarios,
    totalPagadoDonaciones,
    totalPendienteDonaciones,
  } = await fetchCardData();

  return (
    <>
      <Card title="Recolectado" value={totalPagadoDonaciones} type="recolectado" />
      <Card title="Pendiente" value={totalPendienteDonaciones} type="pending" />
      <Card title="Total Donaciones" value={numeroDeDonaciones} type="donaciones" />
      <Card
        title="Total Usuarios"
        value={numeroDeUsuarios}
        type="usuarios"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'donaciones' | 'usuarios' | 'pending' | 'recolectado';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-green-200 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-green-600" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-green-100 px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
