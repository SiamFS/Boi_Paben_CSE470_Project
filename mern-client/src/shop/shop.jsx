import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { HiEye, HiShoppingCart, HiSortAscending, HiViewList } from 'react-icons/hi';
import { AuthContext } from '../contexts/AuthProvider';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useContext(AuthContext);

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
      .then((data) => {
        console.log('Fetched books:', data); // Debugging line
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error); // Debugging line
      });
  };

  const addToCart = (book) => {
    if (user) {
      const cartItem = {
        ...book,
        user_email: user.email,
      };

      // Remove _id from the cartItem object to avoid duplicate key error
      delete cartItem._id;

      fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert('Book added to cart successfully');
          } else {
            console.error('Failed to add book to cart:', data.error);
            alert('Failed to add book to cart');
          }
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    } else {
      alert('You need to be logged in to add items to the cart');
    }
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
            <div className='relative'>
              <HiSortAscending className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className='border p-2 rounded w-full md:w-auto pl-10'
              >
                <option value=''>Sort by Price</option>
                <option value='asc'>Price: Low to High</option>
                <option value='desc'>Price: High to Low</option>
              </select>
            </div>
            <div className='relative'>
              <HiViewList className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className='border p-2 rounded w-full md:w-auto pl-10'
              >
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
        </div>
        {books.length === 0 ? (
          <div className='text-center text-3xl font-bold text-red-600'>
            No books in the selected category.
          </div>
        ) : (
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-6'>
            {books.map((book) => (
              <Card
                key={book._id}
                className='relative group transform transition-transform hover:scale-105 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-full mx-auto'
              >
                <div className='overflow-hidden'>
                  <img src={book.imageURL} alt={book.bookTitle} className='h-80 w-full object-cover mx-auto rounded-t-lg' />
                </div>
                <div className='p-4'>
                  <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    <p>{book.bookTitle}</p>
                  </h5>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {book.authorName}<br />
                    Category: {book.category} <br />
                    {book.Price}TK
                  </p>
                  <div className='mt-4 flex justify-between items-center'>
                    <button
                      onClick={() => addToCart(book)}
                      className='bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors'
                    >
                      <HiShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                    <Link to={`/book/${book._id}`} className='text-gray-500 hover:text-gray-900'>
                      <HiEye className='text-2xl' />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
