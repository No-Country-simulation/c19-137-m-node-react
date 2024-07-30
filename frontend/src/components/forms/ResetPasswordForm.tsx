'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { gql } from "@apollo/client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      code
      message
      success
    }
  }
`;

const ResetPasswordForm: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [token, setToken] = useState('');
    const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            await resetPassword({
                variables: {
                    data: {
                        confirmNewPassword,
                        newPassword,
                        token,
                    },
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
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
            <div className="mb-4">
                <Label htmlFor="token">Token</Label>
                <Input
                    id="token"
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Resetear Contraseña'}
            </Button>
            {data && <p>{data.resetPassword.message}</p>}
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default ResetPasswordForm;
