'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

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
        autor: 'Dan Brown',
    },
];

export default function Recomendados() {
    const [selectedLibro, setSelectedLibro] = useState<RecomendadosData | null>(null);

    return (
        <div className="flex flex-col w-full p-4 dark:bg-gray-900 dark:text-white">
            <div className='flex gap-4'>
                <h5 className="mb-4 font-semibold dark:text-gray-200 text-[1rem]">Recomendados para ti</h5>
                <Link href="/dashboard/public/books/ " className="mb-4 dark:text-gray-400 text-[1rem]">Ver Todo</Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {recomendados.map((libro) => (
                    <div key={libro.id} className="">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <div onClick={() => setSelectedLibro(libro)} className="flex gap-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={libro.image}
                                            alt={libro.libro}
                                            width={64}
                                            height={64}
                                            className="" />
                                        <AvatarFallback>IMG</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <div className="flex"><h2 className="dark:text-gray-200 text-[9px] font-semibold hover:text-black">{libro.libro}</h2></div>
                                        <div className="flex">
                                            <p className="dark:text-gray-400 text-[9px] hover:text-black">{libro.autor}</p>
                                        </div>
                                    </div>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="bg-gray-800 dark:text-gray-100">
                                {selectedLibro && (
                                    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
                                        <DrawerHeader className="text-center">
                                            <DrawerTitle className="text-lg">{selectedLibro.libro}</DrawerTitle>
                                            <DrawerDescription className="text-base">Autor: {selectedLibro.autor}</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="flex justify-center p-4 pb-0">
                                            <Image
                                                src={selectedLibro.image}
                                                alt={selectedLibro.libro}
                                                width={200}
                                                height={300}
                                                className="object-cover border border-gray-600 rounded-lg shadow-lg"
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className="text-gray-300">Detalles adicionales del libro pueden ir aquí.</p>
                                        </div>
                                        <DrawerFooter className="flex flex-col items-center">
                                            <Link href={`dashboard/public/books/${selectedLibro.id}`}>
                                                <Button className="w-full mb-2 bg-gray-600 hover:bg-gray-500">Ver más detalles</Button>
                                            </Link>
                                            <DrawerClose asChild>
                                                <Button variant="outline" className="text-gray-100 border-gray-600">Cerrar</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </div>
                                )}
                            </DrawerContent>
                        </Drawer>
                    </div>
                ))}
            </div>
        </div>
    );
}
