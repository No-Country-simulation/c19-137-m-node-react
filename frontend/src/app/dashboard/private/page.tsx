import React from 'react'
import { CarouselPublic } from '@/components/carrusels/CarruselPublic';
import { CommentsList } from '@/components/cards/commentsList';

export default function page() {
  return (
    <div>
      <div className="-mt-20">
        <CarouselPublic />
      </div><div className="container p-4 mx-auto">
        <CommentsList />
      </div>    
      </div>
  )
}
