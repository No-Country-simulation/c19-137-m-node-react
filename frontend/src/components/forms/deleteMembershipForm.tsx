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
});

type FormSchemaType = z.infer<typeof formSchema>;

const DELETE_MEMBERSHIP = gql`
  mutation DeleteMembership($id: ID!) {
    deleteMembership(id: $id)
  }
`;

export default function DeleteMembershipForm() {
  const [deleteMembership, { loading, error }] = useMutation(DELETE_MEMBERSHIP);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const { data } = await deleteMembership({
        variables: { id: values.id },
      });

      if (data.deleteMembership) {
        toast({
          description: 'Membresía eliminada exitosamente!',
        });
        form.reset();
      } else {
        toast({
          description: 'Ocurrió un error al eliminar la membresía.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        description: 'Ocurrió un error al eliminar la membresía.',
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
                ID de la membresía que se desea eliminar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar Membresía'}
        </Button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </Form>
  );
}
