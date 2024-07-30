'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"

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
    email: z.string().email({ message: "Correo electrónico no válido." }),
});

const ForgotPassword: React.FC = () => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
        onCompleted: (data) => {
            toast({
                title: data.forgotPassword.success ? "Éxito" : "Error",
                description: data.forgotPassword.message,
                variant: data.forgotPassword.success ? "default" : "destructive",
            });
            if (data.forgotPassword.success) {
                setOpen(false);
            }
        },
        onError: (error) => {
            toast({
                title: "Error de servidor",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await forgotPassword({ variables: { email: values.email } });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Link href="#" className="flex items-center justify-center font-medium text-center text-black transition-colors duration-300 border-0 rounded-full hover:text-color1 border-nano dark:text-white hover:dark:text-color6">
                    Recuperar Contraseña
                </Link>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[400px] w-[360px] gap-[32px]'>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-white">
                        <Image src="/logos/logo.png" alt="logo" width={120} height={120} />
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className='flex flex-col items-center justify-center gap-[24px]'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[24px] w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-[#1F2937] dark:text-white'>Correo electrónico</FormLabel>
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
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)} className='font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano dark:hover:text-white'>
                        Cancelar
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ForgotPassword;
