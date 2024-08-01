import React from 'react'
import AvatarUser from '@/components/cards/avatarUser'
import Tabs from '@/components/cards/tabs'

export default function page() {
  return (
    <div className='items-center justify-center place-items-center'>
      < AvatarUser/>
      <Tabs/>
    </div>
  )
}
