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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Define the validation schema with Zod
const formSchema = z.object({
    text: z.string().min(1, "El texto es requerido."),
    rating: z.number().min(0, "La calificación debe ser mayor o igual a 0.").max(5, "La calificación debe ser menor o igual a 5."),
    bookId: z.string().min(1, "El ID del libro es requerido."),
});

type FormSchemaType = z.infer<typeof formSchema>;

// Define the GraphQL mutation
const CREATE_REVIEW = gql`
  mutation CreateReview($data: CreateReviewInput!) {
    createReview(data: $data) {
      code
      success
      message
      review {
        id
        text
        rating
        bookId
      }
    }
  }
`;

export default function CreateReviewForm() {
    const [createReview, { loading, error }] = useMutation(CREATE_REVIEW);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await createReview({
                variables: { data: values },
            });

            if (data.createReview.success) {
                toast({
                    description: 'Reseña creada exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al crear la reseña.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear la reseña.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Texto</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe tu reseña aquí..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Escribe tu reseña sobre el libro.
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
                            <FormLabel>Calificación</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Calificación del libro (0-5)" {...field} />
                            </FormControl>
                            <FormDescription>
                                Calificación del libro (0-5).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bookId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID del Libro</FormLabel>
                            <FormControl>
                                <Input placeholder="ID del libro" {...field} />
                            </FormControl>
                            <FormDescription>
                                El ID del libro al que corresponde la reseña.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Reseña'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
