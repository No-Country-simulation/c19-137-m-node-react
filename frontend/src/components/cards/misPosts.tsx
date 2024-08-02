import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Image from 'next/image'
import StarIcon from '@/components/icons/icons';

interface Post {
    id: number
    username: string
    calification: number
    autor: string
    libro: string
    imag: string
    comentario?: string
}

const posts: Post[] = [
    {
        id: 1,
        username: 'Javier',
        calification: 4,
        autor: 'Javier',
        libro: 'Cien años de soledad',
        imag: '/user/user1.png',
        comentario: 'Un comentario sobre el libro'
    },
];

export default function MisPosts() {
    return (
        <div className="flex-1 p-4 mt-10 dark:bg-gray-900 dark:text-gray-100">
            <ScrollArea className="h-[800px] p-4 dark:bg-gray-800">
                {posts.map((post) => (
                    <Link key={post.id} href={`dashboard/public/posts/${post.id}`}>
                        <div className='block p-4 m-4 transition-transform transform rounded-lg hover:shadow-2xl hover:border-amber-200 hover:scale-105 dark:bg-transparent dark:border-transparent'>
                            <div className='flex items-center gap-2 mb-4'>
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
                                <p className='flex gap-2 font-semibold'>
                                    Calificación: {[...Array(5)].map((_, index) => (
                                        <StarIcon key={index} filled={index < post.calification} />
                                    ))}
                                </p>
                            </div>
                            <div className='mt-4'>
                                {post.comentario}
                            </div>
                        </div>
                    </Link>
                ))}
            </ScrollArea>
        </div>
    )
}
