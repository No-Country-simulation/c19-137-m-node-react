import React from 'react'

export default function page({ params }: { params: { id: string } }) {
    const id = params.id
  return (
    <div>
        aqui va el post {id}
    </div>
  )
}

