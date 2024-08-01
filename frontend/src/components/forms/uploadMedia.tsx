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
    file: z
        .instanceof(FileList)
        .refine(files => files.length === 1, "Debe seleccionar un archivo.")
        .transform(files => files[0]),
    convertToBase64: z.boolean().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const UPLOAD_MEDIA = gql`
  mutation UploadMedia($file: Upload!, $convertToBase64: Boolean) {
    uploadMedia(file: $file, convertToBase64: $convertToBase64) {
      code
      success
      message
      media {
        id
        url
      }
    }
  }
`;

export default function UploadMediaForm() {
    const [uploadMedia, { loading, error }] = useMutation(UPLOAD_MEDIA);
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormSchemaType) => {
        try {
            const { data } = await uploadMedia({
                variables: {
                    file: values.file,
                    convertToBase64: values.convertToBase64 || false,
                },
            });

            if (data.uploadMedia.success) {
                toast({
                    description: 'Archivo subido exitosamente!',
                });
                form.reset();
            } else {
                toast({
                    description: 'Ocurrió un error al subir el archivo.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                description: 'Ocurrió un error al subir el archivo.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Archivo</FormLabel>
                            <FormControl>
                                <input
                                    type="file"
                                    onChange={(e) => field.onChange(e.target.files)}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    disabled={field.disabled}
                                    name={field.name}
                                />
                            </FormControl>
                            <FormDescription>
                                Seleccione el archivo que desea subir.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="convertToBase64"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Convertir a Base64</FormLabel>
                            <FormControl>
                                <input
                                    type="checkbox"
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    disabled={field.disabled}
                                    name={field.name}
                                    checked={field.value}
                                />
                            </FormControl>
                            <FormDescription>
                                ¿Desea convertir el archivo a Base64?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Subiendo...' : 'Subir Archivo'}
                </Button>
                {error && <p>Error: {error.message}</p>}
            </form>
        </Form>
    );
}