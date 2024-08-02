'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);
    const { toast } = useToast();
    const [open, setOpen] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast({
                title: "Las contraseñas no coinciden",
                variant: "default",
            });
            return;
        }

        try {
            const { data } = await resetPassword({
                variables: {
                    data: {
                        newPassword,
                        confirmNewPassword,
                        token,
                    },
                },
            });

            if (data.resetPassword.success) {
                toast({
                    title: 'Contraseña restablecida exitosamente',
                    variant: "default",
                });
            } else {
                toast({
                    title: 'Error al restablecer la contraseña',
                    variant: "default",
                });
            }

            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            console.error(err);
            toast({
                title: 'Error al restablecer la contraseña',
                variant: "default",
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='bg-white dark:bg-gray-800 fixed h-[85vh] max-h-[700px] w-full max-w-[600px] p-0 overflow-hidden rounded-lg'>
                <ScrollArea className='h-full w-full'>
                    <div className="relative flex flex-col justify-between h-full px-6 py-4">
                        {/* Close Button */}
                        <AlertDialogCancel onClick={() => window.location.href = '/'} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white transition-colors duration-300 cursor-pointer">
                            ❌ {/* Emoji de "x" */}
                        </AlertDialogCancel>

                        {/* Header */}
                        <AlertDialogHeader className="flex flex-col items-center mb-4">
                            <AlertDialogTitle className="flex flex-col items-center text-center font-semibold text-[25px] leading-[30px] text-[#1F2937] dark:text-gray-100 mb-4">
                                <Image src="/logos/logo.png" alt="logo" width={150} height={150} className="mx-auto my-4" />
                                <span>Restablece tu contraseña</span>
                            </AlertDialogTitle>
                        </AlertDialogHeader>

                        {/* Scrollable Content */}
                        <AlertDialogDescription className='flex flex-col items-center justify-center gap-[24px]'>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full px-6 py-4 bg-white rounded-lg shadow-md">
                                <div className="relative">
                                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="pr-12" // Add padding to the right for the eye icon
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300"
                                        style={{ transform: 'translateY(6px)' }} // Adjust vertical position of the emoji
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                                <div className="relative">
                                    <Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Label>
                                    <Input
                                        id="confirmNewPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                        className="pr-12" // Add padding to the right for the eye icon
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300"
                                        style={{ transform: 'translateY(6px)' }} // Adjust vertical position of the emoji
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                                <Button type="submit" disabled={loading} className='font-bold transition-colors duration-300 border-transparent border-nano hover:border-nano hover:text-nano mb-2'>
                                    {loading ? 'Enviando...' : 'Restablecer Contraseña'}
                                </Button>
                            </form>
                        </AlertDialogDescription>
                    </div>
                </ScrollArea>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ResetPasswordForm;
