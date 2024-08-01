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

const formSchema = z.object({
    text: z.string().min(1, {
        message: "El texto del comentario es requerido.",
    }),
    postId: z.string().min(1, {
        message: "El ID del post es requerido.",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const POST_COMMENT = gql`
  mutation PostComment($data: PostCommentInput!) {
    postComment(data: $data) {
      code
      success
      message
      comment {
        id
        text
        postId
      }
    }
  }
`;

export default function PostCommentForm() {
    const [postComment, { loading, error }] = useMutation(POST_COMMENT);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await postComment({ variables: { data: values } });

            if (data.postComment.success) {
                toast({
                    description: 'Comentario creado exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al crear el comentario.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear el comentario.',
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
                            <FormLabel>Texto del comentario</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Escribe tu comentario" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el texto del comentario.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="postId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID del post</FormLabel>
                            <FormControl>
                                <Input placeholder="ID del post" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ingrese el ID del post.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Comentario'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
