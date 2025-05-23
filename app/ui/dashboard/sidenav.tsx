"use client";
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AvaLogo from "@/app/ui/avalogo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Importa useRouter

export default function SideNav() {
  const router = useRouter(); // Inicializa el router

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Cierra sesión sin redirección automática
    router.push("/login"); // Redirige manualmente a /login
    router.refresh(); // Opcional: recarga la ruta para actualizar el estado
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <div className="relative w-32 h-12 md:h-32">
            <AvaLogo />
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-green-50 md:block"></div>
        <button
          onClick={handleSignOut} // Usa un botón con onClick en lugar de un formulario
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}