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
    id: z.string().min(1, "El ID de la membresía es requerido."),
    name: z.string().min(1, "El nombre de la membresía es requerido."),
    cost: z.number().int().min(1, "El costo debe ser un número entero positivo."),
    duration: z.number().int().min(1, "La duración debe ser un número entero positivo."),
});

type FormSchemaType = z.infer<typeof formSchema>;

const UPDATE_MEMBERSHIP = gql`
  mutation UpdateMembership($data: UpdateMembershipInput!) {
    updateMembership(data: $data) {
      id
      name
      cost
      duration
    }
  }
`;

export default function UpdateMembershipForm() {
    const [updateMembership, { loading, error }] = useMutation(UPDATE_MEMBERSHIP);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await updateMembership({
                variables: { data: values },
            });

            if (data.updateMembership) {
                toast({
                    description: 'Membresía actualizada exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al actualizar la membresía.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al actualizar la membresía.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input placeholder="ID de la membresía" {...field} />
                            </FormControl>
                            <FormDescription>
                                ID de la membresía que se desea actualizar.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre de la membresía" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre de la membresía (Ej: Básico, Premium).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Costo</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Costo de la membresía" {...field} />
                            </FormControl>
                            <FormDescription>
                                Costo de la membresía en unidades monetarias.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duración</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Duración en días" {...field} />
                            </FormControl>
                            <FormDescription>
                                Duración de la membresía en días.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar Membresía'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
