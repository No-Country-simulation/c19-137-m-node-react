'use client';

import { gql, useQuery } from '@apollo/client';
import { User } from '@/types/query/typeUser';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import { GET_USER } from '@/graphql/queries/get';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';


export default function AvatarUser() {
  const [defaultImage, setDefaultImage] = useState('');

  const { data, loading, error } = useQuery<{ profile: User }>(GET_USER);
  const { data: session } = useSession();
  // Log data, loading, and error to the console
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.profile) return <div>User not found</div>;

  const user = data.profile;

  return (
    <div className="z-10 w-[900px] mx-auto flex flex-col items-center bg-gray-50 mt-10 rounded-sm">
      <div className='h-64 w-full flex justify-center items-center overflow-hidden'>
        <div className='relative mt-52 z-50 rounded-full w-48 h-48 border-4 border-background overflow-hidden'>
          <Image
            src='/images/1.jpg'
            alt="Avatar"
            width={200}
            height={200}
            className='w-full h-full object-cover'
          />
          {/* <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" /> */}
        </div>
      </div>

      {/* Información del Perfil */}
      <div className="bg-background p-6 rounded-b-lg mt-4 w-full">
        {/* Botón Editar Perfil */}
        <div className="flex justify-between mb-4 items-center">
          <div className="grid gap-1">
            <div className="text-2xl font-bold">{user.firstName} {user.lastName}</div>
            <div className="text-lg text-muted-foreground">@{user.nickName}</div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Editar perfil
          </button>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between mt-2 mb-4">
            <div className="text-lg text-muted-foreground mt-2 mb-4">
              {/* {user.bio} */}
            </div>
            <div className="flex items-center gap-6 text-lg text-muted-foreground mt-2 mb-4">
              <div>
                <span className="font-medium">5</span> Seguidores
              </div>
              <div>
                <span className="font-medium">10</span> Siguiendo
              </div>
              <div>
                <span className="font-medium">30</span> Publicaciones
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
