'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import CreatePostForm from '@/components/forms/createPost'

export default function Page() {
  const { data: session } = useSession()
  const useId = session?.user.data.iat
  return (
    <div> 
      input para crear post
      <CreatePostForm/>
    </div>
  )
}
