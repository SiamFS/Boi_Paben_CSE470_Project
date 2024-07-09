import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [sortOrder, category]);

  const fetchBooks = () => {
    let url = 'http://localhost:5000/allbooks';
    if (sortOrder && category) {
      url = `http://localhost:5000/books/category/${category}?order=${sortOrder}`;
    } else if (sortOrder) {
      url = `http://localhost:5000/books/sort/price?order=${sortOrder}`;
    } else if (category) {
      url = `http://localhost:5000/books/category/${category}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className='navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        {/* Your navbar content goes here */}
      </div>
      <div className='pt-28 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0'>
          <h2 className='text-3xl lg:text-5xl font-bold'>All Books are here</h2>
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto'>
            <select onChange={handleSortChange} value={sortOrder} className='border p-2 rounded w-full md:w-auto'>
              <option value=''>Sort by Price</option>
              <option value='asc'>Price: Low to High</option>
              <option value='desc'>Price: High to Low</option>
            </select>
            <select onChange={handleCategoryChange} value={category} className='border p-2 rounded w-full md:w-auto'>
              <option value=''>Sort by Category</option>
              <option value='Fiction'>Fiction</option>
              <option value='Non-Fiction'>Non-Fiction</option>
              <option value='Science Fiction'>Science Fiction</option>
              <option value='Fantasy'>Fantasy</option>
              <option value='Mystery'>Mystery</option>
              <option value='Horror'>Horror</option>
              <option value='Romance'>Romance</option>
              <option value='Thriller'>Thriller</option>
              <option value='Adventure'>Adventure</option>
              <option value='Children'>Children</option>
              <option value='Education'>Education</option>
              <option value='Biography'>Biography</option>
            </select>
          </div>
        </div>
        {books.length === 0 ? (
          <div className='text-center text-3xl font-bold text-red-600'>
            No books in the selected category.
          </div>
        ) : (
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
            {books.map((book) => (
              <Card key={book.id}>
                <img src={book.imageURL} alt={book.bookTitle} className='h-96 w-full object-cover' />
                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  <p>{book.bookTitle}</p>
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  {book.authorName}<br />
                  Category: {book.category} <br />
                  {book.Price}TK
                </p>
                <button className='bg-orange-400 font-semibold text-white px-4 py-2 rounded-lg mt-4'>Buy Now</button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
