import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
  const { _id, bookTitle, imageURL, Price, bookDescription } = useLoaderData();
  
  return (
    <div>
      <div className='navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        {/* Your navbar content goes here */}
      </div>
      <div className='pt-28 px-4 lg:px-24'>
        <div className='flex'>
          <img src={imageURL} alt={bookTitle} className='h-96' />
          <div>
            <h2 className='font-bold pl-4 pr-4'>{bookDescription}</h2>
          </div>
        </div>
        <div className='font-bold pr-4'>
          <h2>{bookTitle}</h2>
          <p>{Price} Tk</p>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
