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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Define the validation schema with Zod
const formSchema = z.object({
    title: z.string().min(1, "El título es requerido."),
    content: z.string().min(1, "El contenido es requerido."),
    mediaIds: z.array(z.string()).optional(), // Media IDs are optional
});

type FormSchemaType = z.infer<typeof formSchema>;

// Define the GraphQL mutation
const CREATE_POST = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      code
      success
      message
      post {
        id
        title
        content
      }
    }
  }
`;

export default function CreatePostForm() {
    const [createPost, { loading, error }] = useMutation(CREATE_POST);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await createPost({
                variables: { data: values },
            });

            if (data.createPost.success) {
                toast({
                    description: 'Publicación creada exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al crear la publicación.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear la publicación.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Título de la publicación" {...field} />
                            </FormControl>
                            <FormDescription>
                                El título de tu publicación.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contenido</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Contenido de la publicación" {...field} />
                            </FormControl>
                            <FormDescription>
                                El contenido de tu publicación.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mediaIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Archivos Multimedia (opcional)</FormLabel>
                            <FormControl>
                                <Input placeholder="IDs de archivos multimedia (separados por comas)" {...field} />
                            </FormControl>
                            <FormDescription>
                                IDs de archivos multimedia adjuntos a la publicación (separados por comas).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Publicación'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
