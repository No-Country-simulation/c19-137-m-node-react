'use client';

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface AutoressData {
  id: string;
  image: string;
  username: string;
}

const autores: AutoressData[] = [
  {
    id: '1',
    image: '/autores/autor1.png',
    username: 'Conry Mendez',
  },
  {
    id: '2',
    image: '/autores/autor2.png',
    username: 'Earl Nightingale',
  },
  {
    id: '3',
    image: '/autores/autor3.png',
    username: 'Agatha Christie',
  },
]

export default function AutoresDestacados() {
  const { toast } = useToast();

  const handleFollowClick = (username: string) => {
    toast({
      title: "",
      description: `Has seguido a ${username}`,
    });
  };

  return (
    <div className="flex flex-col w-full p-4 dark:text-white dark:bg-gray-800 text-black">
      <div className='flex gap-4'>
        <h1 className="mb-4 font-bold text-sm dark:text-gray-300">Autores destacados</h1>
        <Link href="/authors" className="mb-4 text-sm dark:text-gray-400">Ver Todo</Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {autores.map((autor) => (
          <div key={autor.id} className='flex flex-row justify-between items-center p-2 bg-gray-200 rounded-lg dark:bg-gray-700'>
            <div className='flex-shrink-0'>
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={autor.image}
                  alt={autor.username}
                  width={40}
                  height={40}
                  className="object-cover border-2 border-color10 dark:border-amber-400 rounded-full " />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 ml-2">
              <p className="text-[9px] dark:text-gray-400">{autor.username}</p>
            </div>
            <div>
              <p
                onClick={() => handleFollowClick(autor.username)}
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
