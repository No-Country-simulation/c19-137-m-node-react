'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    email: z.string().email({ message: 'Correo electrónico no válido.' }),
    first_name: z.string().min(1, { message: 'El nombre es obligatorio.' }),
    last_name: z.string().min(1, { message: 'El apellido es obligatorio.' }),
    nickname: z.string().min(1, { message: 'El apodo es obligatorio.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    password_confirmation: z.string().min(6, { message: 'La confirmación de la contraseña debe tener al menos 6 caracteres.' })
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas deben coincidir.',
    path: ['password_confirmation'], // Apunta al campo que debe mostrar el error
})

type FormValues = z.infer<typeof formSchema>;

export function Registrar() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            nickname: '',
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            const { data } = await client.mutate({
                mutation: gql`
                mutation SignUp($data: CreateUserInput!) {
                    signUp(data: $data) {
                        code
                        success
                        message
                        token
                    }
                }`,
                variables: {
                    data: {
                        email: values.email,
                        firstName: values.first_name,
                        lastName: values.last_name,
                        nickName: values.nickname,
                        password: values.password,
                        passwordConfirmation: values.password_confirmation
                    }
                }
            });
            toast({
                title: 'Registro exitoso',
                description: 'Tu cuenta ha sido creada con éxito.',
                variant: 'default',
            });
            // Optionally redirect after successful registration
            window.location.href = '/'; // Redirect to login page or desired URL
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error en el registro',
                description: 'Por favor, intenta de nuevo.',
                variant: 'destructive',
            });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className='flex items-center justify-center text-center w-full lg:w-[362px] h-[56px] bg-[#1F2937] text-white hover:text-color1 font-medium rounded-full hover:bg-[#111827] transition-colors duration-300'>
                    Registrarse
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[80vh] max-h-[650px] w-full max-w-[360px] p-4'>
                <ScrollArea className='w-full h-[calc(100vh-200px)] overflow-y-auto'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-gray-100 mb-6">
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
                                            <FormLabel>Correo electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Correo electrónico" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Apellido" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nickname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apodo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Apodo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password_confirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmar Contraseña</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className='font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano mb-2'>
                                    {loading ? 'Registrando...' : 'Registrarse'}
                                </Button>
                            </form>
                        </Form>

                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)} className='font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano'>
                            Cancelar
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    )
}
