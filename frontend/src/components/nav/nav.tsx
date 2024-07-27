'use client';

import { CiHome, CiSearch, CiBellOn, CiMail, CiMenuBurger, CiSettings } from "react-icons/ci";
import { BsPeople, BsPerson } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
    isOpen: boolean;
    toggleNav: () => void;
}

const Navbar = ({ isOpen, toggleNav }: NavbarProps) => {
    return (
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-48 z-20`}>
            <div className='flex flex-col justify-start gap-2 m-5 w-[180px] h-[455px] p-2'>
                <div><Image src='/logos/logo.png' alt='logo' width={144} height={73} /></div>
                <Link href='' className="flex items-center mt-2 space-x-2"><CiHome /><span>Inicio</span></Link>
                <Link href='' className="flex items-center space-x-2"><CiSearch /><span>Explorar</span></Link>
                <Link href='' className="flex items-center space-x-2"><CiBellOn /><span>Notificaciones</span></Link>
                <Link href='' className="flex items-center space-x-2"><CiMail /><span>Mensajes</span></Link>
                <Link href='' className="flex items-center space-x-2"><BsPeople /><span>Amigos</span></Link>
                <Link href='' className="flex items-center space-x-2"><BsPerson /><span>Perfil</span></Link>
                <Link href='' className="flex items-center space-x-2"><CiMenuBurger /><span>Más</span></Link>
                <Link href='' className="flex items-center mt-10 space-x-2"><CiSettings /><span>Configuración</span></Link>
            </div>
        </div>
    );
};

export default Navbar;
