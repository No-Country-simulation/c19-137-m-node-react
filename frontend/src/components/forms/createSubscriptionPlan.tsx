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

// Define the validation schema with Zod
const formSchema = z.object({
    user_id: z.string().min(1, "El ID del usuario es requerido."),
    membershipId: z.string().min(1, "El ID de la membresía es requerido."),
    startDate: z.string().min(1, "La fecha de inicio es requerida."),
    endDate: z.string().min(1, "La fecha de finalización es requerida."),
});

type FormSchemaType = z.infer<typeof formSchema>;

// Define the GraphQL mutation
const CREATE_SUBSCRIPTION_PLAN = gql`
  mutation CreateSubscriptionPlan($data: CreateSubscriptionPlanInput!) {
    createSubscriptionPlan(data: $data) {
      id
      userId
      membershipId
      startDate
      endDate
    }
  }
`;

export default function CreateSubscriptionPlanForm() {
    const [createSubscriptionPlan, { loading, error }] = useMutation(CREATE_SUBSCRIPTION_PLAN);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await createSubscriptionPlan({
                variables: { data: values },
            });

            if (data) {
                toast({
                    description: 'Suscripción creada exitosamente!',
                });
                form.reset();
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al crear la suscripción.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID del Usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="ID del usuario" {...field} />
                            </FormControl>
                            <FormDescription>
                                El ID del usuario registrado.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="membershipId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID de la Membresía</FormLabel>
                            <FormControl>
                                <Input placeholder="ID de la membresía" {...field} />
                            </FormControl>
                            <FormDescription>
                                El ID del tipo de membresía.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de Inicio</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                                Fecha en la que la suscripción comenzó.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de Finalización</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                                Fecha en la que la suscripción finalizará.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Suscripción'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}
