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
    name: z.string().min(1, "El nombre de la membresía es requerido."),
    cost: z.number().int().min(1, "El costo debe ser un número entero positivo."),
    duration: z.number().int().min(1, "La duración debe ser un número entero positivo."),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CREATE_MEMBERSHIP = gql`
  mutation CreateMembership($data: CreateMembershipInput!) {
    createMembership(data: $data) {
      id
      name
      cost
      duration
    }
  }
`;

export default function CreateMembershipForm() {
    const [createMembership, { loading, error }] = useMutation(CREATE_MEMBERSHIP);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await createMembership({
                variables: { data: values },
            });

            if (data.createMembership) {
                toast({
                    description: 'Membresía creada exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al crear la membresía.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear la membresía.',
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
                    {loading ? 'Creando...' : 'Crear Membresía'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
