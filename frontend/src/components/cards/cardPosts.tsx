import React from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarIcon from '@/components/icons/icons';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link';


interface postData {
  id: string;
  imag: string;
  username: string;
  libro: string;
  autor: string;
  calification: number;
  comentario: string;

}
//
const posts: postData[] = [
  {
    id: '1',
    imag: '/user/user1.png',
    username: 'BibliotecaDeSol',
    libro: 'Cien años de soledad',
    autor: 'Gabriel Garcías Márquez',
    calification: 5,
    comentario: 'Una obra maestra del realismo mágico. La historia de la familia Buendía es profunda, rica en detalles y cargada de simbolismo. La prosa de García Márquez es envolvente y poética. Un libro que sin duda merece su lugar en cualquier estantería',
  },
  {
    id: '2',
    imag: '/user/user2.png',
    username: 'HistoriasDePapel',
    libro: 'La casa de los espíritus',
    autor: 'Isabel Allende',
    calification: 5,
    comentario: 'La casa de los espíritus" es una saga familiar rica en realismo mágico, escrita por Isabel Allende. La novela sigue varias generaciones de la familia Trueba, mezclando elementos sobrenaturales con la cruda realidad de la historia política de Chile. Allende tiene un talento especial para crear personajes complejos y entrañables, y su prosa es evocadora y emotiva. La mezcla de historia personal y colectiva hace de este libro una obra profunda y significativa. Un clásico de la literatura latinoamericana que no debe pasarse por alto.',
  },
  {
    id: '3',
    imag: '/user/user3.png',
    username: 'LecturasDeAle',
    libro: 'Mujercitas',
    autor: 'Louisa May Alcott',
    calification: 5,
    comentario: 'Mujercitas" es un clásico atemporal que sigue la vida de las hermanas March durante la Guerra Civil Americana. Louisa May Alcott crea una narrativa cálida y entrañable sobre la familia, la amistad y el crecimiento personal. Cada una de las hermanas tiene una personalidad distinta y encantadora, lo que permite a los lectores identificarse con diferentes aspectos de sus vidas. La novela aborda temas de amor, sacrificio y perseverancia con un toque de humor y ternura. Una lectura reconfortante y edificante para todas las edades.',
  },
  {
    id: '4',
    imag: '/user/user4.png',
    username: 'LibrosDeLuna',
    libro: 'El amor en los tiempos del cólera',
    autor: 'Gabriel García Márquez',
    calification: 4,
    comentario: 'Una historia de amor que abarca décadas. La prosa de García Márquez es hermosa y poética, y la trama es tan convincente que es difícil dejar de leer. Un libro que demuestra que el amor verdadero puede durar toda una vida.',
  },
  {
    id: '5',
    imag: '/user/user5.png',
    username: 'PáginasDeLuz',
    libro: 'Rayuela',
    autor: 'Julio Cortázar',
    calification: 5,
    comentario: 'Una obra maestra de la literatura experimental. La estructura no lineal y la narrativa innovadora de Cortázar hacen de "Rayuela" una experiencia de lectura única. Un libro que desafía y enriquece al lector con cada página.',
  },
  {
    id: '6',
    imag: '/user/user6.png',
    username: 'NarrativasNocturnas',
    libro: 'El túnel',
    autor: 'Ernesto Sabato',
    calification: 4,
    comentario: 'Una novela oscura y psicológica que explora la mente perturbada de su protagonista. La narrativa de Sabato es intensa y absorbente, creando una atmósfera de suspense que mantiene al lector al borde de su asiento.',
  },
  {
    id: '7',
    imag: '/user/user7.png',
    username: 'HistoriasDeMedianoche',
    libro: 'Pedro Páramo',
    autor: 'Juan Rulfo',
    calification: 5,
    comentario: 'Una obra fundamental del realismo mágico. La historia de Pedro Páramo es fascinante y conmovedora, con una prosa lírica que captura la esencia de la vida y la muerte en un pueblo mexicano. Un libro que deja una impresión duradera.',
  },
  {
    id: '8',
    imag: '/user/user8.png',
    username: 'LectoraApasionada',
    libro: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes',
    calification: 5,
    comentario: 'El clásico de la literatura española que sigue siendo relevante hoy en día. La historia de Don Quijote y su fiel escudero Sancho Panza es tan divertida como profunda, explorando temas de honor, locura y la naturaleza de la realidad.',
  },
  {
    id: '9',
    imag: '/user/user9.png',
    username: 'RelatosDeOro',
    libro: 'Fervor de Buenos Aires',
    autor: 'Jorge Luis Borges',
    calification: 4,
    comentario: 'Una colección de poemas que captura la esencia de Buenos Aires y la mente brillante de Borges. Cada poema es una joya literaria, llena de imágenes vívidas y reflexiones filosóficas. Un tesoro para los amantes de la poesía.',
  },
  {
    id: '10',
    imag: '/user/user10.png',
    username: 'VocesDelTiempo',
    libro: 'Crónica de una muerte anunciada',
    autor: 'Gabriel García Márquez',
    calification: 5,
    comentario: 'Una novela corta pero poderosa que narra los eventos previos a un asesinato. García Márquez teje una trama magistralmente, manteniendo al lector intrigado hasta el último momento. Un ejemplo brillante de su talento narrativo.',
  },
]
//

export default function CardPosts() {
  return (
    <div className="">
      <div className='p-4 m-4 mt-8 ring-0'>
        <Input type="text" placeholder="Crea una publicación" />
      </div>
      <br />
      <p className='right-4 text-right'>Ordenar por Recientes</p>
      <ScrollArea className="h-screen p-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className='block p-2 m-8 hover:border-2 hover:border-amber-200 rounded-lg'>
              <div className='flex gap-2 items-center mb-2'>
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={post.imag}
                    alt={post.username}
                    width={64}
                    height={64}
                    className="object-cover border-4 rounded-full border-amber-400"
                  />
                  <AvatarFallback className='object-cover rounded-full '>
                    <Image src='/logos/logo.png' alt='logo' width={144} height={73} />
                  </AvatarFallback>
                </Avatar>
                <p className='font-semibold'>{post.username}</p>
              </div>
              <div>
                <p className='font-semibold'>{post.libro} - {post.autor}</p>
                <p className='font-semibold flex gap-2'>
                  Calificación: {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} filled={index < post.calification} />
                  ))}
                </p>
              </div>
              <div className='mt-2'>
                {post.comentario}
              </div>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  )
}
