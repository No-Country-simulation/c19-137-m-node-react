'use client';

import { useSession } from "next-auth/react";
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    firstName: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }),
    bio: z.string().min(10, {
        message: "La biografía debe tener al menos 10 caracteres.",
    }),
    birthDate: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }, {
        message: "Debe ser una fecha válida (YYYY-MM-DD).",
    }),
});

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($data: CreateAuthorInput!) {
    createAuthor(data: $data) {
      code
      success
      message
    }
  }
`;

export function CreateAuthor() {
    const { data: session } = useSession();
    const userId = session?.user.data.sub;

    const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            bio: "",
            birthDate: "",
        },
    });

    const onSubmit = async (values: any) => {
        if (!userId) {
            toast({
                description: 'Debe iniciar sesión para crear un autor.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const { data } = await createAuthor({ variables: { data: values } });

            if (data?.createAuthor.success) {
                toast({
                    description: 'Autor creado exitosamente!',
                });
            } else {
                toast({
                    description: 'Ocurrió un error al crear el autor.',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear el autor.',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el nombre del autor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="Apellido" {...field} />
                            </FormControl>
                            <FormDescription>
                                Este es el apellido del autor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biografía</FormLabel>
                            <FormControl>
                                <Input placeholder="Biografía" {...field} />
                            </FormControl>
                            <FormDescription>
                                Esta es la biografía del autor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <FormControl>
                                <Input placeholder="YYYY-MM-DD" {...field} />
                            </FormControl>
                            <FormDescription>
                                Esta es la fecha de nacimiento del autor.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Autor'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
