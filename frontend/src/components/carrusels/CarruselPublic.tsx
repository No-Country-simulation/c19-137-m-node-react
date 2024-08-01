'use client';
import * as React from "react";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { arsenal } from '@/font/font'

const items = [
    {
        title: "",
        description: "“Con nuestra suscripción, disfruta de beneficios adicionales como descuentos especiales, contenido premium y mucho más. Aprovecha al máximo tu experiencia con nosotros. ¡Suscríbete ahora!”",
        imageUrl: "/carrusel/1.jpg",
        imageName: ""
    },
    {
        title: "",
        description: '“Sumérgete en una amplia selección de libros con nuestra suscripción.Desde los bestsellers hasta clásicos atemporales, hay algo para cada amante de la lectura. ¡Empieza a leer hoy!”',
        imageUrl: "/carrusel/2.jpeg",
        imageName: ""
    },
    {
        title: "",
        description: "“¡Conecta con nuevas amistades hoy mismo! Únete a nuestra comunidad y encuentra personas con intereses similares a los tuyos. Suscríbete ahora y empieza a hacer amigos.”",
        imageUrl: "/carrusel/3.jpeg",
        imageName: ""
    },
    {
        title: "",
        description: " “Accede a ofertas exclusivas y productos únicos solo para nuestros suscriptores. Ahorra en tus compras y descubre artículos que no encontrarás en ningún otro lugar.”",
        imageUrl: "/carrusel/4.jpeg",
        imageName: ""
    },
];

export function CarouselPublic() {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <div className="relative p-12 mt-16 overflow-hidden rounded-lg min-w-6">
            <style jsx global>{`
                :root {
                    --font-arsenal: ${arsenal.style.fontFamily};
                }
            `}</style>
            <Carousel opts={{
                align: "center",  // Asegúrate de que el carrusel esté centrado
                loop: true,
            }} className="relative w-full h-64" plugins={[plugin.current]}>
                <CarouselContent className="flex rounded-3xl">
                    {items.map((item, index) => (
                        <CarouselItem key={index} className="items-center justify-center min-w-full rounded-3xl ">
                            <Card className="w-full h-full rounded-3xl ">
                                <CardContent className="relative flex flex-col items-center justify-center h-full p-0 rounded-3xl">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.imageName}
                                        className="object-cover w-full h-full bg-bottom"
                                        width={600}
                                        height={400}
                                    />
                                    <CardHeader className="absolute top-0 w-full p-4 text-center bg-black bg-opacity-50 ">
                                        <CardTitle className='text-2xl font-bold text-white' style={{ fontFamily: 'var(--font-arsenal)' }}>{item.title}</CardTitle>
                                        <CardDescription className='mt-2 text-lg font-medium text-white' style={{ fontFamily: 'var(--font-arsenal)' }}>{item.description}</CardDescription>
                                    </CardHeader>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute p-2 text-transparent transform -translate-y-1/2 bg-white border-0 rounded-full bg-opacity-5 left-4 top-1/2" />
                <CarouselNext className="absolute p-2 text-transparent transform -translate-y-1/2 bg-white border-0 rounded-full bg-opacity-5 right-4 top-1/2" />
            </Carousel>
        </div>
    );
}
