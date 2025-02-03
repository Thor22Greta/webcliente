'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { PawPrint } from 'lucide-react';
import { CalendarHeart } from 'lucide-react';
import { HeartHandshake } from 'lucide-react';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Donaciones',
    href: '/dashboard/donaciones',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Usuarios', href: '/dashboard/usuarios', icon: UserGroupIcon },
  { name: 'Animales', href: '/dashboard/animales', icon: PawPrint},
  { name: 'Eventos', href: '/dashboard/eventos', icon: CalendarHeart },
  { name: 'Adopciones', href: '/dashboard/adopciones', icon: HeartHandshake },

];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-green-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
