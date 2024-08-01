'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { gql, useMutation } from '@apollo/client';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "El nombre del libro es requerido.",
    }),
    authorId: z.string().min(1, {
        message: "El ID del autor es requerido.",
    }),
    rating: z.number().min(0).max(5, {
        message: "La puntuación debe estar entre 0 y 5.",
    }),
    genre: z.string().min(1, {
        message: "El género es requerido.",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CREATE_BOOK = gql`
  mutation CreateBook($data: CreateBookInput!) {
    createBook(data: $data) {
      code
      success
      message
      book {
        id
        name
        authorId
        rating
        genre
      }
    }
  }
`;

export default function CreateBookForm() {
    const [createBook, { loading, error }] = useMutation(CREATE_BOOK);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await createBook({ variables: { data: values } });

            if (data.createBook.success) {
                toast({
                    description: 'Libro creado exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al crear el libro.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear el libro.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del libro</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre del libro" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el nombre del libro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="authorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID del autor</FormLabel>
                            <FormControl>
                                <Input placeholder="ID del autor" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el ID del autor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Puntuación</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Puntuación" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese la puntuación del libro (0 a 5).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Género</FormLabel>
                            <FormControl>
                                <Input placeholder="Género" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el género del libro.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Libro'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
