import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allbooks')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <div className='navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        {/* Your navbar content goes here */}
      </div>
      <div className='pt-28 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center py-4'>All Books are here</h2>
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
          {books.map((book) => (
            <Card key={book.id}>
              <img src={book.imageURL} alt={book.title} className='h-96 w-full object-cover' />
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                <p>{book.title}</p>
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400'>
                {book.authorName}<br />
                {book.Price}TK
              </p>
              <button className='bg-orange-400 font-semibold text-white px-4 py-2 rounded-lg mt-4'>Buy Now</button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;