'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function Login() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Estado para manejar la visibilidad de la contraseña
    const [passwordVisible, setPasswordVisible] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: FormValues) => {
        setLoading(true);
        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        setLoading(false);

        if (result?.error) {
            toast({
                title: 'Error de autenticación',
                description: 'Correo electrónico o contraseña incorrectos',
                variant: 'destructive',
            });
        } else if (result?.ok) {
            toast({
                title: 'Inicio de sesión exitoso',
                description: 'Estás siendo redirigido...',
                variant: 'default',
            });
            window.location.href = '/dashboard/private/';
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className='flex items-center justify-center w-full h-[56px] px-8 py-4 gap-2 bg-[#3B82F6] text-white border border-[#3B82F6] rounded-full hover:bg-[#2563EB] transition-colors duration-300'>
                    Iniciar Sesión
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[85vh] max-h-[700px] w-full max-w-[600px] p-0 overflow-hidden rounded-lg'>
                <ScrollArea className='h-full w-full'>
                    <div className="relative flex flex-col justify-between h-full px-6 py-4">
                        {/* Close Button */}
                        <AlertDialogCancel className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white transition-colors duration-300 cursor-pointer">
                            ❌
                        </AlertDialogCancel>

                        {/* Header */}
                        <AlertDialogHeader className="flex flex-col items-center mb-4">
                            <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-gray-100 mb-16"> {/* Increased margin bottom */}
                                <Image src="/logos/logo.png" alt="logo" width={150} height={150} className="mx-auto my-4" />
                                <span>Iniciar Sesión</span>
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
                                                        <span
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300"
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
                                    <Button type="submit" className='font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano mb-2'>
                                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
