'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-green-800">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((bc, i) => (
          <li key={i} className="flex items-center space-x-1">
            {i > 0 && <ChevronRightIcon className="h-4 w-4 text-green-400" />}
            {bc.active
              ? <span className="font-semibold text-green-600">{bc.label}</span>
              : <Link href={bc.href} className="hover:underline">{bc.label}</Link>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}
