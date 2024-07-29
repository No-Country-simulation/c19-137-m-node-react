'use client'
import { useState } from 'react';
import Navbar from '@/components/nav/nav';
import Sidebar from '@/components/sidebar/sidebar';
import '@/app/globals.css';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative flex min-h-screen">
            {isOpen && (
                <div className="fixed inset-0 z-10 md:hidden" onClick={toggleNav}></div>
            )}
            <Navbar isOpen={isOpen} toggleNav={toggleNav} />
            <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-48' : 'ml-0'}`}>
                <button
                    onClick={toggleNav}
                    className="absolute z-20 p-2 text-xl rounded-full top-2 left-2">

                </button>
                {children}
            </main>
            <Sidebar />
        </div>
    );
}
