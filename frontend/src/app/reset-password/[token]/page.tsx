'use client';

import { useRouter } from 'next/navigation';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const { token } = params;

    return (
        <div className="flex items-center justify-center min-h-screen bg-color10">
            <ResetPasswordForm token={token} />
        </div>
    );
}