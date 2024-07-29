'use client';

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    email: z.string().email({ message: "Correo electrónico no válido." }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
})

export function Login() {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        })

        if (result?.error) {
            toast({
                title: "Error de autenticación",
                description: result.error,
                variant: "destructive",
            })
        } else if (result?.ok) {
            toast({
                title: "Inicio de sesión exitoso",
                description: "Estás siendo redirigido...",
                variant: "default",
            })
            // Optionally redirect after successful login
            window.location.href = "/"; // Redirect to home page or desired URL
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className='flex items-center justify-center text-center w-full lg:w-[362px] h-[56px] bg-[#1F2937] text-white hover:text-color1 font-medium rounded-full hover:bg-[#111827] transition-colors duration-300'>Iniciar Sesión</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[550px] w-[360px] gap-[32px]'>
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-[#1F2937] dark:text-white'>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Contraseña" {...field} className='dark:bg-gray-700 dark:text-white' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full h-[54px] bg-color5 dark:bg-color6 text-white font-bold rounded-full hover:bg-color6 dark:hover:bg-color7 transition-colors duration-300">Iniciar Sesión</Button>
                        </form>
                    </Form>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)} className='border-nano border-transparent hover:border-nano hover:text-nano dark:hover:text-white font-bold transition-colors duration-300'>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
