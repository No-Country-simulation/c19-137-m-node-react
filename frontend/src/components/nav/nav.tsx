'use client';

import { CiHome, CiSearch, CiBellOn, CiMail, CiSettings, CiLogout } from "react-icons/ci";
import { BsPeople, BsPerson } from "react-icons/bs";
import { IoClose } from "react-icons/io5"; // Nuevo icono de cerrar
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from '@/components/button/themeDarck';

interface NavbarProps {
  isOpen: boolean;
  toggleNav: () => void;
}

interface Route {
  icon: JSX.Element;
  name: string;
  href: string;
}

const Navbar = ({ isOpen, toggleNav }: NavbarProps) => {
  const { data: session } = useSession();

  const routeList: Route[] = session ? [
    { icon: <CiHome />, name: "Inicio", href: "/dashboard/private/" },
    { icon: <CiSearch />, name: "Explorar", href: "/dashboard/public/books" },
    { icon: <CiBellOn />, name: "Notificaciones", href: "/dashboard/private/notifications" },
    { icon: <CiMail />, name: "Mensajes", href: "/dashboard/private/messages" },
    { icon: <BsPeople />, name: "Amigos", href: "/dashboard/private/contacts" },
    { icon: <BsPerson />, name: "Perfil", href: "/dashboard/private/profile" },
    { icon: <CiSettings />, name: "Configuración", href: "/dashboard/privateconfig" },
  ] : [
    { icon: <CiHome />, name: "Inicio", href: "/" },
    { icon: <CiSearch />, name: "Explorar", href: "/dashboard/public/books" },
    { icon: <CiLogout />, name: "Ingresar", href: "/auth" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={toggleNav}>
      <SheetTrigger asChild className="hover:bg-transparent">
        <Button variant="outline" className='p-0 m-4 bg-transparent border-0 rounded-full hover:bg-none'>
          <Image src="/logos/logo.png" alt="logo" width={100} height={100} className='rounded-full' />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[200px] sm:w-[240px]">
        <SheetHeader>
          <SheetTitle>
            <div className='fixed m-4 bottom-2 left-4'>
              <ModeToggle />
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid items-center justify-center gap-4 py-4">
          <div className='m-4'>
            <Image src="/logos/logo.png" alt="logo" width={144} height={73} />
          </div>
          {routeList.map((route, index) => (
            <Link key={index} href={route.href} className="flex items-center space-x-2 hover:text-color2">
              {route.icon}
              <span>{route.name}</span>
            </Link>
          ))}
          {session && (
            <Link href="#" onClick={() => signOut()} className="flex items-center space-x-2 hover:text-color2">
              <CiLogout />
              <span>Salir</span>
            </Link>
          )}
        </div>
        
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
