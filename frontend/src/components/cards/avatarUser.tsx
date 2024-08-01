'use client';

import { gql, useQuery } from '@apollo/client';
import { User } from '@/types/query/typeUser';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import { GET_USER } from '@/graphql/queries/get';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function AvatarUser() {
  const [defaultImage, setDefaultImage] = useState('');


  const { data, loading, error } = useQuery<{ profile: User }>(GET_USER);
  console.log(data?.profile.firstName)
  const { data: session } = useSession();


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.profile) {
    return <div>User not found</div>;
  }

  const user = data.profile;

  return (
    <div className="mt-10 p-4 w-full">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src='/images/1.jpg' className="w-full h-full object-cover rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">{user.firstName} {user.lastName}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{user.nickName}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <p><strong>Email:</strong> {user.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}