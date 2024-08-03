import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
  const { _id, bookTitle, imageURL, Price, bookDescription } = useLoaderData();

  return (
    <div>
      <div className='pt-28 px-4 lg:px-24'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start'>
          <img src={imageURL} alt={bookTitle} className='h-96 object-cover object-center rounded-lg shadow-md' />
          <div className='lg:pl-8 mt-4 lg:mt-0'>
            <h2 className='text-2xl font-bold mb-4'>{bookTitle}</h2>
            <p className='text-lg text-gray-700 mb-4'>{bookDescription}</p>
            <p className='text-xl font-semibold'>{Price} Tk</p>
          </div>
        </div>
        {/* Placeholder for additional sections */}
        <div className='mt-8 space-y-8'>
          <div>
            <h3 className='text-xl font-bold mb-2'>Location</h3>
            <p className='text-gray-700'>Location details will go here.</p>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-2'>Report</h3>
            <button className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700'>
              Report this Book
            </button>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-2'>Advertisement</h3>
            <div className='bg-gray-200 p-4 rounded-lg shadow-md'>
              Ad content will go here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
