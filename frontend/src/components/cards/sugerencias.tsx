'use client'

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



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
]

export default function Sugerencias() {
  return (
    <div className="flex flex-col w-full p-4">
      <div className='flex gap-4'>
        <h1 className="mb-4 font-bold">Sugerencias de amigos</h1>
        <Link href="/sugerencias" className="mb-4 text-grey-500">Ver Todo</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        {sugerencias.map((usuario) => (
          <div key={usuario.id} className=''>
            <div className='flex flex-row justify-start gap-2'>
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={usuario.image}
                    alt={usuario.username}
                    width={64}
                    height={64}
                    className="object-cover border-2 rounded-full border-amber-400" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </div>
              <div><p>{usuario.username}</p></div>
              <div><button className=" border-amber-400 text-amber-400 border-2 w-[65px] h-[27px] rounded-full hover:bg-amber-400 hover:text-black">Seguir</button></div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
