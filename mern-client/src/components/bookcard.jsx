import React from 'react'


const bookcard = ({headline, books}) => {
  return (
    <div className = 'my-16 px-4 lg:px-24'>
        <h2 className='text-5xl text-center font-bold text-gray-800'>{headline}</h2>
    </div>
  )
}

export default bookcard