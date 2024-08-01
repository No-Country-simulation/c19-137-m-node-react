'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { gql, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast"


export interface AddFavoriteBookInput {
    userId: string;
    bookId: string;
}

export interface AddFavoriteBookResponse {
    code: number;
    success: boolean;
    message: string;
}


const ADD_FAVORITE_BOOK = gql`
  mutation AddFavoriteBook($data: AddFavoriteBookInput!) {
    addFavoriteBook(data: $data) {
      code
      success
      message
    }
  }
`;

interface IdBooks {
    idBook: string
}

export default function AddFavoriteBook({ idBook }: IdBooks) {
    const { data: session } = useSession();
    const userId = session?.user.data.sub;

    const [addFavoriteBook, { loading, error }] = useMutation<AddFavoriteBookResponse>(ADD_FAVORITE_BOOK);

    const handleClick = async () => {
        if (!userId) {
            toast({
                description: 'Debe iniciar sesión para agregar un libro a favoritos.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const { data } = await addFavoriteBook({ variables: { data: { userId, bookId: idBook } } });

            if (data?.success) {
                toast({
                    description: 'Libro agregado a favoritos exitosamente!',
                });
            } else {
                toast({
                    description: 'Ocurrió un error al agregar el libro a favoritos.',
                    
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrio un error al agregar el libro a favoritos.',
                
            });
        }
    };

    return (
        <div>
            <Button onClick={handleClick} disabled={loading}>
                {loading ? 'Agregando...' : 'Agregar a Favoritos'}
            </Button>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};