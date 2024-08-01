'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface ShareDialogProps {
    children: React.ReactNode;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Compartir</DialogTitle>
                    <DialogDescription>
                        {/* Aquí puedes agregar opciones para compartir */}
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded">Compartir en Facebook</button>
                            <button className="w-full px-4 py-2 text-white bg-blue-400 rounded">Compartir en Twitter</button>
                            <button className="w-full px-4 py-2 text-white bg-green-500 rounded">Compartir en WhatsApp</button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
};
