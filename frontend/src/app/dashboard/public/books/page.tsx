'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    ia?: string[];
    availability?: any;
}

// Deshabilitar SSR para componentes que no necesitan renderizarse en el servidor
const BookSearchPage = () => {
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchType, setSearchType] = useState('q'); // Default search type

    const fetchBooks = useCallback(async (isLoadMore = false) => {
        setLoading(true);
        try {
            let query = '';

            switch (searchType) {
                case 'title':
                    query = `title=${search}`;
                    break;
                case 'author':
                    query = `author=${search}&sort=new`;
                    break;
                default:
                    query = `q=${search}`;
                    break;
            }

            const fullQuery = [
                query,
                genre && `subject=${genre}`,
                `page=${page}`,
                `limit=10`,
                `fields=*,availability`
            ].filter(Boolean).join('&');

            const response = await fetch(`https://openlibrary.org/search.json?${fullQuery}`);
            const data = await response.json();
            console.log(response)

            if (isLoadMore) {
                setBooks((prevBooks) => [...prevBooks, ...data.docs]);
            } else {
                setBooks(data.docs);
            }

            setHasMore(data.docs.length > 0);
            console.log()
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }, [search, genre, searchType, page]);

    useEffect(() => {
        if (search) {
            setPage(1);
            setBooks([]);
            fetchBooks();
        }
    }, [search, genre, searchType, fetchBooks]);

    useEffect(() => {
        if (page > 1) {
            fetchBooks(true);
        }
    }, [page, fetchBooks]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = () => {
        setPage(1);
        setBooks([]);
        fetchBooks();
    };

    const loadMoreBooks = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="p-8 space-y-6">
            <div className="space-y-4">
                <Input
                    type="text"
                    placeholder="Buscar por título, autor o palabra clave"
                    value={search}
                    onChange={handleSearch}
                    className="w-full"
                />

                <div className="flex gap-4">
                    <Select onValueChange={setSearchType} value={searchType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Tipo de búsqueda" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="q">Palabra clave</SelectItem>
                            <SelectItem value="title">Título</SelectItem>
                            <SelectItem value="author">Autor</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={setGenre} value={genre}>
                        <SelectTrigger>
                            <SelectValue placeholder="Género" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fiction">Ficción</SelectItem>
                            <SelectItem value="non-fiction">No ficción</SelectItem>
                            <SelectItem value="fantasy">Fantasía</SelectItem>
                            <SelectItem value="science-fiction">Ciencia ficción</SelectItem>
                            <SelectItem value="mystery">Misterio</SelectItem>
                            <SelectItem value="thriller">Suspenso</SelectItem>
                            <SelectItem value="romance">Romance</SelectItem>
                            <SelectItem value="horror">Horror</SelectItem>
                            <SelectItem value="historical">Histórico</SelectItem>
                            <SelectItem value="biography">Biografía</SelectItem>
                            <SelectItem value="self-help">Autoayuda</SelectItem>
                            <SelectItem value="philosophy">Filosofía</SelectItem>
                            <SelectItem value="poetry">Poesía</SelectItem>
                            <SelectItem value="comics">Cómics</SelectItem>
                            <SelectItem value="graphic-novel">Novela gráfica</SelectItem>
                            <SelectItem value="drama">Drama</SelectItem>
                            <SelectItem value="adventure">Aventura</SelectItem>
                            <SelectItem value="children">Infantil</SelectItem>
                            <SelectItem value="young-adult">Juvenil</SelectItem>
                            <SelectItem value="classic">Clásico</SelectItem>
                            <SelectItem value="dystopian">Distópico</SelectItem>
                            <SelectItem value="memoir">Memorias</SelectItem>
                            <SelectItem value="travel">Viajes</SelectItem>
                            <SelectItem value="spirituality">Espiritualidad</SelectItem>
                            <SelectItem value="cookbook">Cocina</SelectItem>
                            <SelectItem value="health">Salud</SelectItem>
                            <SelectItem value="business">Negocios</SelectItem>
                            <SelectItem value="science">Ciencia</SelectItem>
                            <SelectItem value="technology">Tecnología</SelectItem>
                            <SelectItem value="art">Arte</SelectItem>
                            <SelectItem value="music">Música</SelectItem>
                            <SelectItem value="true-crime">Crimen real</SelectItem>
                            <SelectItem value="short-stories">Cuentos cortos</SelectItem>
                            <SelectItem value="essay">Ensayo</SelectItem>
                            <SelectItem value="guide">Guía</SelectItem>
                            <SelectItem value="humor">Humor</SelectItem>
                            <SelectItem value="satire">Sátira</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={handleSearchClick}
                        className="bg-blue-500 text-white"
                    >
                        Buscar
                    </Button>

                    <Button
                        onClick={() => {
                            setSearch('');
                            setGenre('');
                        }}
                        className="bg-gray-500 text-white"
                    >
                        Limpiar
                    </Button>
                </div>
            </div>

            {loading && page === 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            <Skeleton className="w-full h-48" />
                            <div className="p-4">
                                <Skeleton className="h-6 mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map(book => (
                        <div key={book.key} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            {book.cover_i && (
                                <Image
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                    alt={book.title}
                                    className="w-full h-48 object-cover"
                                    width={300}
                                    height={500}
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                {book.author_name && (
                                    <p className="text-gray-600">Autor: {book.author_name.join(', ')}</p>
                                )}
                                <p className="text-gray-600">Primera publicación: {book.first_publish_year}</p>
                                {book.ia && book.ia.length > 0 && (
                                    <p className="text-gray-600">Disponible: {book.availability ? 'Sí' : 'No'}</p>
                                )}
                                <Link href={`/dashboard/public/books/${book.key}`} className='text-blue-500 hover:underline'>
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {hasMore && !loading && (
                <div className="flex justify-center mt-6">
                    <Button onClick={loadMoreBooks} className="bg-blue-500 text-white">
                        Cargar más
                    </Button>
                </div>
            )}
            {loading && page > 1 && (
                <div className="flex justify-center mt-6">
                    <p>Cargando más libros...</p>
                </div>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(BookSearchPage), { ssr: false });
