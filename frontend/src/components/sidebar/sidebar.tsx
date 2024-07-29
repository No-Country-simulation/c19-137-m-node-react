import React from 'react'
import Recomendados from '@/components/cards/recomendados';
import Sugerencias from '@/components/cards/sugerencias';
import AutoresDestacados from '@/components/cards/autoresDestacados';


export default function Sidebar() {
    return (
        <div className='w-[250px] bg-gray-100 dark:bg-gray-800 p-4'>
            <Recomendados />
            <hr className='my-4 border-gray-300 dark:border-gray-600' />
            <Sugerencias />
            <hr className='my-4 border-gray-300 dark:border-gray-600' />
            <AutoresDestacados />
        </div>
    )
}
