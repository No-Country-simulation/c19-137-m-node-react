import React from 'react'
import Recomendados from '@/components/cards/recomendados';
import Sugerencias from '@/components/cards/sugerencias';
import AutoresDestacados from '@/components/cards/autoresDestacados';


export default function Sidebar() {
    return (
        <div className='right-0 w-1/3 '>
            <Recomendados />
            <hr />
            <Sugerencias />
            <hr />
            <AutoresDestacados />
        </div>
    )
}
