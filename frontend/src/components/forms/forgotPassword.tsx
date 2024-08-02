'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
        code
        success
        message
    }
  }
`;

const formSchema = z.object({
    email: z.string().email({ message: 'Correo electrónico no válido.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION, {
        onCompleted: (data) => {
            toast({
                title: data.forgotPassword.success ? 'Éxito' : 'Error',
                description: data.forgotPassword.message,
                variant: data.forgotPassword.success ? 'default' : 'destructive',
            });
            if (data.forgotPassword.success) {
                setOpen(false);
            }
        },
        onError: (error) => {
            toast({
                title: 'Error de servidor',
                description: error.message,
                variant: 'destructive',
            });
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        setLoading(true);
        await forgotPassword({ variables: { email: values.email } });
        setLoading(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>


            <p
    className="w-[362px] h-[24px] font-montserrat font-semibold text-[20px] leading-[24px] text-[#1F2937] cursor-pointer text-center"
>
    ¿Ya tienes una cuenta?
</p>


            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[85vh] max-h-[700px] w-full max-w-[600px] p-0 overflow-hidden rounded-lg'>
                <ScrollArea className='w-full h-full'>
                    <div className="relative flex flex-col justify-between h-full px-6 py-4">
                        {/* Close Button */}
                        <AlertDialogCancel className="absolute text-gray-600 transition-colors duration-300 cursor-pointer top-4 right-4 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white">
                            ❌
                        </AlertDialogCancel>

                        {/* Header */}
                        <AlertDialogHeader className="flex flex-col items-center mb-4">
                            <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-gray-100 mb-16">
                                <Image src="/logos/logo.png" alt="logo" width={150} height={150} className="mx-auto my-4" />
                                <span>Recuperar Contraseña</span>
                            </AlertDialogTitle>
                        </AlertDialogHeader>

                        {/* Scrollable Content */}
                        <AlertDialogDescription className='flex flex-col items-center justify-center gap-[24px]'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[24px] w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo electrónico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Correo electrónico" {...field} className='dark:bg-gray-700 dark:text-white' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={loading} className="w-full h-[54px] bg-color5 dark:bg-color6 text-white font-bold rounded-full hover:bg-color6 dark:hover:bg-color7 transition-colors duration-300">
                                        {loading ? 'Enviando...' : 'Enviar'}
                                    </Button>
                                </form>
                            </Form>
                        </AlertDialogDescription>
                    </div>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ForgotPassword;