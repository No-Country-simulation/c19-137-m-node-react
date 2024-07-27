"use client";

import {
  CiHome,
  CiSearch,
  CiBellOn,
  CiMail,
  CiMenuBurger,
  CiSettings,
} from "react-icons/ci";
import { BsPeople, BsPerson } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isOpen: boolean;
  toggleNav: () => void;
}

interface Route {
  icon: JSX.Element;
  name: string;
  href: string;
  requireAuth?: boolean;
}

const Navbar = ({ isOpen, toggleNav }: NavbarProps) => {
  const routeList: Route[] = [
    {
      icon: <CiHome />,
      name: "Inicio",
      href: "/",
      requireAuth: false,
    },
    {
      icon: <CiSearch />,
      name: "Explorar",
      href: "",
      requireAuth: false,
    },
    {
      icon: <CiBellOn />,
      name: "Notificaciones",
      href: "",
      requireAuth: true,
    },
    {
      icon: <CiMail />,
      name: "Mensajes",
      href: "",
      requireAuth: true,
    },
    {
      icon: <BsPeople />,
      name: "Amigos",
      href: "",
      requireAuth: true,
    },
    {
      icon: <BsPerson />,
      name: "Perfil",
      href: "",
      requireAuth: true,
    },
    {
      icon: <CiMenuBurger />,
      name: "Ingresar",
      href: "",
      requireAuth: false,
    },
    {
      icon: <CiSettings />,
      name: "Configuración",
      href: "",
      requireAuth: true,
    },
  ];
  //
  const { data: session, status } = useSession();
  const router = useRouter();
  //

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-48 z-20`}
    >
      <div className="flex flex-col justify-start gap-2 m-5 w-[180px] h-[455px] p-2">
        <div>
          <Image src="/logos/logo.png" alt="logo" width={144} height={73} />
        </div>

        {routeList.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            className="flex items-center space-x-2"
          >
            {route.icon}
            <span>{route.name}</span>
          </Link>
        ))}

        {session && (
          <button
            onClick={() => signOut()}
            className="flex items-center mt-2 space-x-2"
          >
            <BsPerson />
            <span>Cerrar sesión</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
