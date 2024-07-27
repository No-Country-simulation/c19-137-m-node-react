'use client'

import { Accordion } from "@/components/ui/accordion";
//import Image from "next/image";
//import Link from "next/link";
;
import Navbar from '@/components/nav/nav'
import { useState, useEffect } from 'react';
import { CiCircleChevLeft } from "react-icons/ci";
import Sidebar from '@/components/sidebar/sidebar';
import CardPosts from '@/components/cards/cardPosts';
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";


export default function Home() {
  //
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
          {isOpen ? <CiBookmark className="text-amber-800"/> : <CiBookmarkCheck className="text-amber-800"/>}
        </button>
        <CardPosts />
      </main>
      <Sidebar />
    </div>
  );
}
