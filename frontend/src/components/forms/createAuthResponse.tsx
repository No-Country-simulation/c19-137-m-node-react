'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import { gql, useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast"


export interface AddFavoriteBookInput {
    userId: string;
    bookId: string;
}

export interface AddFavoriteBookResponse {
    code: number;
    success: boolean;
    message: string;
}


const ADD_FAVORITE_BOOK = gql`
  mutation CreateAuthorInput($data: AddFavoriteBookInput!) {
    addFavoriteBook(data: $data) {
      code
      success
      message
    }
  }
`;


export default function CreateAuthResponse() {
    return (
        <div>

        </div>
    )
}
