'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface CommentDialogProps {
    children: React.ReactNode;
}

export const CommentDialog: React.FC<CommentDialogProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comentar</DialogTitle>
                    <DialogDescription>
                        {/* Aquí puedes agregar el formulario para comentar */}
                        <form>
                            <textarea className="w-full h-24 p-2 border rounded" placeholder="Escribe tu comentario aquí..."></textarea>
                            <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">Enviar</button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
};
