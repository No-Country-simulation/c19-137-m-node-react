'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/components/ui/use-toast";

interface SugerenciasData {
  id: string;
  image: string;
  username: string;
}

const sugerencias: SugerenciasData[] = [
  {
    id: '1',
    image: '/sugerenciasAmigos/amigo1.png',
    username: 'BookwormJUan',
  },
  {
    id: '2',
    image: '/sugerenciasAmigos/amigo2.png',
    username: 'SofiLee',
  },
  {
    id: '3',
    image: '/sugerenciasAmigos/amigo3.png',
    username: 'LibrosyMagia',
  },
];

export default function Sugerencias() {
  const { toast } = useToast();

  const handleFollowClick = (username: string) => {
    toast({
      title: "",
      description: `Has seguido a ${username}`,
    });
  };

  return (
    <div className="flex flex-col w-full p-4  dark:text-white dark:bg-gray-800 text-black">
      <div className='flex gap-4'>
        <h1 className="mb-4 font-bold text-sm dark:text-gray-300">Sugerencias de amigos</h1>
        <Link href="dashboard/public/sugerencias" className="mb-4 text-sm dark:text-gray-400">Ver Todo</Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {sugerencias.map((usuario) => (
          <div key={usuario.id} className='flex flex-row justify-between items-center p-2 bg-gray-200 rounded-lg dark:bg-gray-700'>
            <div className='flex-shrink-0'>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={usuario.image}
                  alt={usuario.username}
                  width={40}
                  height={40}
                  className="object-cover border-2 border-color10 darK:border-amber-400 rounded-full dark:border-amber-300" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 ml-2">
              <p className=" text-[9px] dark:text-gray-400">{usuario.username}</p>
            </div>
            <div>
              <p
                onClick={() => handleFollowClick(usuario.username)}
                className="cursor-pointer text-color5 dark:text-amber-300 dark:hover:text-amber-400 text-[9px]"
              >
                Seguir
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
