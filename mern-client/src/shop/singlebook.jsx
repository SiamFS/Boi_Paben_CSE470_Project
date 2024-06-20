import React from 'react'
import { useLoaderData } from 'react-router-dom'

const singlebook = () => {
    const{_id,bookTitle, imageURL,Price,bookDescription} = useLoaderData()
return (
    <div className='mt-28 px-4 lg:px-24 p-20'>
        <div className='flex' >
            <img src={imageURL} alt="" className='h-96' />
            <div>
                <h2 className='font-bold pl-4 pr-4'>{bookDescription}</h2>
            </div>
        </div>
        <div className='font-bold pr-4'>
            <h2 >{bookTitle}</h2>
            <p>{Price} Tk</p>
        </div>
    </div>
)
}

export default singlebook