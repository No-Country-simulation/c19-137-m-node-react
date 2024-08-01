'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface LikeDialogProps {
    children: React.ReactNode;
}

export const LikeDialog: React.FC<LikeDialogProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Likes</DialogTitle>
                    <DialogDescription>
                        {/* Aquí puedes agregar detalles sobre los likes */}
                        <div className="space-y-2">
                            <p className="text-gray-700">A 25 personas les gustó esto.</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
};
