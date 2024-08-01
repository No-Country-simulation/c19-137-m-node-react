'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import Link from 'next/link';
import { toast } from "@/components/ui/use-toast"


const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      code
      message
      success
    }
  }
`;

interface ResetPasswordFormProps {
    token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast({
                title: "Contrasenas no coinciden",
                variant: "default",
            })
            return;
        }

        try {
            const response = await resetPassword({
                variables: {
                    data: {
                        newPassword,
                        confirmNewPassword,
                        token,
                    },
                },
            });

            if (response.data.resetPassword.success) {
                toast({
                    title: 'Contrasena reseteada exitosamente',
                    variant: "default",
                })
            } else {
                toast({
                    title: 'Error al resetear la contraseña',
                    variant: "default",
                })
            }

            // Limpiar los campos después de un reset exitoso si es necesario
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            console.error(err);
            toast({
                title: 'Error al resetear la contraseña',
                variant: "default",
            })
        }
    };


    return (
        <div className='bg-color6 p-2 rounded-md justify-center items-center'>
            <div className='flex justify-center items-center bg-color6 h-20'>
                <Image src="/logos/logo.png" alt="logo" width={120} height={120} />
            </div>
            <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md text-black">
                <div className="mb-4">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Label>
                    <Input
                        id="confirmNewPassword"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" disabled={loading} className='justify-center items-center text-center hover:text-color7 p-2'>
                    {loading ? 'Enviando...' : 'Resetear Contraseña'}
                </Button>
            </form>
            <div className="mt-4 justify-center items-center text-center">
                <Link href="/" className="text-black text-center hover:text-color7">
                    Volver a la página principal
                </Link>
            </div>
        </div>

    );
};

export default ResetPasswordForm;
