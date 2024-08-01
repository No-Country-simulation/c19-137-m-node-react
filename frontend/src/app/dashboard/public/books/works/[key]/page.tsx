'use client'; // Indica que este archivo debe ser tratado como un componente de cliente

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    ia?: string[];
    availability?: any;
}

interface BookDetailsProps {
    params: {
        key: string;
    };
}

const BookDetailsPage = ({ params }: BookDetailsProps) => {
    const { key } = params;
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await fetch(`https://openlibrary.org/works/${key}.json`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log('Fetched data:', data); // Debug: Verifica qué datos se están recibiendo
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setBook(null); // Asegúrate de manejar el caso de error
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [key]);

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    if (!book) {
        return <div className="text-center text-red-600">Book not found</div>;
    }

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                {book.cover_i ? (
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                        alt={book.title || 'Book cover'}
                        className="w-full h-96 object-cover"
                        width={400}
                        height={600}
                    />
                ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                        <span>No image available</span>
                    </div>
                )}
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{book.title || 'No Title'}</h1>
                    {book.author_name && book.author_name.length > 0 ? (
                        <p className="text-lg text-gray-700 mb-2">Autor: {book.author_name.join(', ')}</p>
                    ) : (
                        <p className="text-lg text-gray-700 mb-2">Autor no disponible</p>
                    )}
                    {book.first_publish_year ? (
                        <p className="text-lg text-gray-700 mb-4">Publicado en: {book.first_publish_year}</p>
                    ) : (
                        <p className="text-lg text-gray-700 mb-4">Fecha de publicación no disponible</p>
                    )}
                    <Button
                        onClick={() => router.back()}
                        className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
