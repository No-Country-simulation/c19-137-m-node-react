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
  id: z.string().min(1, "El ID de la suscripción es requerido."),
});

// Define the GraphQL mutation
const REMOVE_SUBSCRIPTION_PLAN = gql`
  mutation RemoveSubscriptionPlan($id: ID!) {
    removeSubscriptionPlan(id: $id) {
      code
      success
      message
    }
  }
`;

export default function RemoveSubscriptionPlanForm() {
  const [removeSubscriptionPlan, { loading, error }] = useMutation(REMOVE_SUBSCRIPTION_PLAN);
  const form = useForm<{ id: string }>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: { id: string }) => {
    try {
      const { data } = await removeSubscriptionPlan({
        variables: { id: values.id },
      });

      if (data?.removeSubscriptionPlan.success) {
        toast({
          description: 'Suscripción eliminada exitosamente!',
        });
        form.reset();
      } else {
        toast({
          description: data?.removeSubscriptionPlan.message || 'Error al eliminar la suscripción.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        description: 'Ocurrió un error al eliminar la suscripción.',
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
              <FormLabel>ID de la Suscripción</FormLabel>
              <FormControl>
                <Input placeholder="ID de la suscripción" {...field} />
              </FormControl>
              <FormDescription>
                El ID de la suscripción que se desea eliminar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar Suscripción'}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </Form>
  );
}
