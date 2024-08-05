import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiShoppingCart, HiSortAscending, HiViewList } from 'react-icons/hi';
import { AuthContext } from '../contexts/AuthProvider';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');
  const [userCart, setUserCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch books
        let url = 'http://localhost:5000/allbooks';
        if (sortOrder && category) {
          url = `http://localhost:5000/books/category/${category}?order=${sortOrder}`;
        } else if (sortOrder) {
          url = `http://localhost:5000/books/sort/price?order=${sortOrder}`;
        } else if (category) {
          url = `http://localhost:5000/books/category/${category}`;
        }
        const booksResponse = await fetch(url);
        const booksData = await booksResponse.json();
        
        // Fetch user cart if logged in
        let cartData = [];
        if (user) {
          const cartResponse = await fetch(`http://localhost:5000/cart/${user.email}`);
          cartData = await cartResponse.json();
        }

        // Update books with cart status
        setBooks(booksData.map(book => ({
          ...book,
          inCart: cartData.some(cartItem => cartItem._id === book._id),
        })));
        setUserCart(cartData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortOrder, category, user]);

  const addToCart = (book) => {
    if (user) {
      if (book.inCart) {
        alert('This book is already in your cart.');
        return;
      }

      const cartItem = {
        ...book,
        user_email: user.email,
      };

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
            // Update local cart state and book status
            setUserCart(prevCart => [...prevCart, cartItem]);
            setBooks(prevBooks => prevBooks.map(b => 
              b._id === book._id ? { ...b, inCart: true } : b
            ));
          } else {
            alert(data.message || 'Failed to add book to cart');
          }
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          alert('An error occurred while adding the book to cart');
        });
    } else {
      alert('You need to be logged in to add items to the cart');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-grow mt-[60px] md:mt-[30px]">
      <div className='container mx-auto pt-28 px-4 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-end items-center mb-8 space-y-4 md:space-y-0 md:space-x-4'>
          <div className='relative w-full md:w-auto'>
            <HiSortAscending className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className='w-full md:w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Sort by Price</option>
              <option value='asc'>Price: Low to High</option>
              <option value='desc'>Price: High to Low</option>
            </select>
          </div>
          <div className='relative w-full md:w-auto'>
            <HiViewList className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className='w-full md:w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Categories</option>
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
          <div className='text-center text-2xl font-semibold text-red-600'>
            No books found in the selected category.
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {books.map((book) => (
              <div key={book._id} className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105'>
                <div className='relative aspect-w-3 aspect-h-4 overflow-hidden'>
                  {book.imageURL ? (
                    <img 
                      src={book.imageURL} 
                      alt={book.bookTitle} 
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
                      <span className='text-gray-600'>No image available</span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100'>
                    <Link to={`/book/${book._id}`} className='text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors duration-300'>
                      <HiEye className='inline-block mr-2' />
                      View Details
                    </Link>
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>{book.bookTitle}</h3>
                  <p className='text-sm text-gray-600 mb-1'>Author: {book.authorName}</p>
                  <p className='text-sm text-gray-600 mb-2'>Category: {book.category}</p>
                  <p className='text-lg font-bold mb-4'>Price: {book.Price} TK</p>
                  {book.email === user?.email ? (
                    <button
                      className='w-full bg-gray-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed'
                      disabled
                    >
                      Your Book
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(book)}
                      className={`w-full ${book.inCart ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'} px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
                      disabled={book.inCart}
                    >
                      <HiShoppingCart className="mr-2" />
                      <span>
                        {book.inCart ? 'In Cart' : 'Add to Cart'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
