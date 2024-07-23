'use client'

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



interface RecomendadosData {
    id: string;
    image: string;
    libro: string;
    autor: string;
}

const recomendados: RecomendadosData[] = [
    {
        id: '1',
        image: '/libros/El_Alquimista.png',
        libro: 'El Alquimista',
        autor: 'Paulo Coelo',
    },
    {
        id: '2',
        image: '/libros/Orgullo_y_Prejuicio.png',
        libro: 'Orgullo y Prejuicio',
        autor: 'Jane Austen',
    },
    {
        id: '3',
        image: '/libros/El_Gran_Gatsby.png',
        libro: 'El Gran Gatsby',
        autor: 'F. Scott Fitzgerald',
    },
    {
        id: '4',
        image: '/libros/Los_juegos_del_hambre.png',
        libro: 'Los juegos del hambre',
        autor: 'Suzanne Collins',
    },
    {
        id: '5',
        image: '/libros/El_codigo_Da_Vinci.png',
        libro: 'El codigo Da Vinci',
        autor: 'Dan Broen',
    },
]

export default function Recomendados() {
    return (
        <div className="flex flex-col w-full p-4">
            <div className='flex gap-4'>
            <h1 className="mb-4 font-bold">Recomendados para ti</h1>
            <Link href="/recomendados" className="mb-4 text-grey-500">Ver Todo</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 ">
                {recomendados.map((libro) => (

                    <div key={libro.id} className="">
                        <Link href={`/libros/${libro.id}`} className="flex gap-2 p-2 rounded-xl hover:bg-slate-100">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={libro.image}
                                    alt={libro.libro}
                                    width={64}
                                    height={64}
                                    className="object-cover" />
                                <AvatarFallback>IMG</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <div className="flex"><h2 className="">{libro.libro}</h2></div>

                                <div className="flex">
                                    <p className="text-gray-600 ">{libro.autor}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div >
    )
}
