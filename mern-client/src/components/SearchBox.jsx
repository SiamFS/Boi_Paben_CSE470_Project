import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'flowbite-react';


const SearchBox = () => {
  const { title } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search/${title}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [title]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (books.length === 0) return <div>No matches found for "{title}"</div>;

  return (
    <div>
    <div className='navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
      {/* Your navbar content goes here */}
    </div>
    <div className='pt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center py-4'>Search found "{title}"</h2>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4'>
        {books.map((book) => (
          <Card key={book.id}>
            <img src={book.imageURL} alt={book.bookTitle} className='h-96 w-full object-cover' />
            <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              <p>{book.bookTitle}</p>
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

export default SearchBox;
