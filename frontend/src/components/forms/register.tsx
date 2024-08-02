'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
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
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';

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
});

type FormValues = z.infer<typeof formSchema>;

export function Registrar() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Estado para manejar la visibilidad de la contraseña
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Función para alternar la visibilidad de la confirmación de contraseña
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className='flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-white text-[#3B82F6] border-2 border-[#3B82F6] rounded-full hover:bg-[#3B82F6] hover:text-white transition-colors duration-300'>
                    Registrarse
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[85vh] max-h-[700px] w-full max-w-[600px] p-0 overflow-hidden rounded-lg'>
                <ScrollArea className='w-full h-full'>
                    <div className="relative flex flex-col justify-between h-full px-6 py-4">
                        {/* Close Button */}
                        <AlertDialogCancel className="absolute text-gray-600 transition-colors duration-300 cursor-pointer top-4 right-4 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white">
                            ❌ {/* Emoji de "x" */}
                        </AlertDialogCancel>

                        {/* Header */}
                        <AlertDialogHeader className="flex flex-col items-center mb-4">
                            <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-gray-100 mb-4">
                                {/* Imagen más grande y centrada con márgenes */}
                                <Image src="/logos/logo.png" alt="logo" width={150} height={150} className="mx-auto my-4" />
                                <span>Bienvenido al Registro</span>
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
                                                    <div className="relative">
                                                        <Input
                                                            type={passwordVisible ? "text" : "password"}
                                                            placeholder="Contraseña"
                                                            {...field}
                                                        />
                                                        {/* Emoji de ojo para mostrar/ocultar contraseña */}
                                                        <span
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 transition-colors duration-300 cursor-pointer hover:text-gray-800"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {passwordVisible ? '🙈' : '👁️'}
                                                        </span>
                                                    </div>
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
                                                    <div className="relative">
                                                        <Input
                                                            type={confirmPasswordVisible ? "text" : "password"}
                                                            placeholder="Confirmar Contraseña"
                                                            {...field}
                                                        />
                                                        {/* Emoji de ojo para mostrar/ocultar confirmación de contraseña */}
                                                        <span
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 transition-colors duration-300 cursor-pointer hover:text-gray-800"
                                                            onClick={toggleConfirmPasswordVisibility}
                                                        >
                                                            {confirmPasswordVisible ? '🙈' : '👁️'}
                                                        </span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className='mb-2 font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano'>
                                        {loading ? 'Registrando...' : 'Registrarse'}
                                    </Button>
                                </form>
                            </Form>
                        </AlertDialogDescription>
                    </div>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
}