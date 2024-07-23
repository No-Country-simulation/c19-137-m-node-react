'use client'

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  return (
    <div className="flex flex-col w-full p-4">
      <div className='flex gap-4'>
        <h1 className="mb-4 font-bold">Autores destacados</h1>
        <Link href="/sugerencias" className="mb-4 text-grey-500">Ver Todo</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        {autores.map((autor) => (
          <div key={autor.id} className=''>
            <div className='flex items-center gap-2 md:flex-row'>
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={autor.image}
                    alt={autor.username}
                    width={64}
                    height={64}
                    className="object-cover border-2 rounded-full border-amber-400" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </div>
              <div><p>{autor.username}</p></div>
              <div><button className=" border-amber-400 text-amber-400 border-2 w-[65px] h-[27px] rounded-full hover:bg-amber-400 hover:text-black">Seguir</button></div>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
