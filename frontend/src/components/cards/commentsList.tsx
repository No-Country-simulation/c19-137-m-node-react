'use client';

import * as React from 'react';
import { CommentDialog } from '@/components/forms/commentDialog';
import { ShareDialog } from '@/components/button/ShareDialo';
import { LikeDialog } from '@/components/button/likeDialog';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { BiSolidLike } from "react-icons/bi";

import { gql } from '@apollo/client';

const ON_SS_EVENT_SUBSCRIPTION = gql`
  subscription OnSSEvent {
    onSSEvent {
      id
      title
      content
      media {
        id
        url
        type
        fileName
        hashName
        mimeType
      }
      user {
        nickName
        id
      }
    }
  }
`;


interface Comment {
    id: number;
    author: string;
    content: string;
}

const comments: Comment[] = [
    { id: 1, author: 'Ana Pérez', content: 'Me encantó "Cien Años de Soledad" de Gabriel García Márquez. Es un libro fascinante lleno de realismo mágico.' },
    { id: 2, author: 'Juan López', content: 'La trilogía de "El Señor de los Anillos" es increíble. Tolkien creó un mundo tan detallado y envolvente.' },
    { id: 3, author: 'María González', content: 'Recomiendo "La Sombra del Viento" de Carlos Ruiz Zafón. Es una historia maravillosa ambientada en la Barcelona de la posguerra.' },
    { id: 4, author: 'Pedro Sánchez', content: 'Acabo de terminar "1984" de George Orwell. Es impresionante cómo refleja temas de control y vigilancia.' },
    { id: 5, author: 'Luisa Martínez', content: 'Me fascinó "Orgullo y Prejuicio" de Jane Austen. Los personajes son tan vívidos y la historia es intemporal.' },
    { id: 6, author: 'Carlos Fernández', content: 'Leí "Crónica de una Muerte Anunciada" y me impresionó la narrativa única de Gabriel García Márquez.' },
    { id: 7, author: 'Laura Jiménez', content: 'No puedo dejar de recomendar "El Principito". Es un libro para todas las edades con una enseñanza profunda.' },
    { id: 8, author: 'Miguel Torres', content: 'Stephen King nunca decepciona. "It" es uno de los libros más aterradores que he leído.' },
    { id: 9, author: 'Elena Rodríguez', content: '"Matar a un Ruiseñor" de Harper Lee es una lectura obligatoria. Aborda temas de racismo y justicia de una manera poderosa.' },
    { id: 10, author: 'Raúl Moreno', content: 'Si te gusta la ciencia ficción, "Dune" de Frank Herbert es imprescindible. Un universo complejo y fascinante.' },
    { id: 11, author: 'Carmen García', content: 'Disfruté mucho "La Casa de los Espíritus" de Isabel Allende. Una saga familiar con toques de realismo mágico.' },
    { id: 12, author: 'Javier Ruiz', content: 'La serie de "Harry Potter" de J.K. Rowling es simplemente mágica. Crecí con estos libros y siempre tendrán un lugar especial.' },
];

export const CommentsList: React.FC = () => {
    return (
        <ScrollArea className="p-12 space-y-4 rounded-md h-[800px] border-color4">
            {comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded shadow-sm">
                    <div className="font-bold">{comment.author}</div>
                    <div>{comment.content}</div>
                    <div className="flex mt-2 space-x-4">
                        <CommentDialog>
                            <Button variant="secondary" className="px-4 py-2 text-black rounded bg-color9">Comentar</Button>
                        </CommentDialog>
                        <ShareDialog>
                            <Button variant="secondary" className="px-4 py-2 text-black rounded bg-color10">Compartir</Button>
                        </ShareDialog>
                        <LikeDialog>
                            <BiSolidLike className="w-6 h-auto cursor-pointer" />
                        </LikeDialog>
                    </div>
                </div>
                
            ))}
        </ScrollArea>
    );
};
