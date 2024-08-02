import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiEye, HiShoppingCart } from 'react-icons/hi';
import { AuthContext } from '../contexts/AuthProvider';

const SearchBox = () => {
  const { title } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [userCart, setUserCart] = useState([]);

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

  useEffect(() => {
    if (user) {
      fetchUserCart();
    } else {
      setUserCart([]);
    }
  }, [user]);

  const fetchUserCart = () => {
    fetch(`http://localhost:5000/cart/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserCart(data);
      })
      .catch((error) => {
        console.error('Error fetching user cart:', error);
      });
  };

  const addToCart = (book) => {
    if (user) {
      if (userCart.some(item => item.original_id === book._id)) {
        alert('This book is already in your cart.');
        return;
      }

      const cartItem = {
        ...book,
        user_email: user.email,
        original_id: book._id  // Store the original book ID
      };

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
            setUserCart([...userCart, data.data]); // Add the new cart item
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
        {/* Your navbar content goes here */}
      </div>
      <div className='container mx-auto pt-28 px-4 lg:px-8'>
        <h2 className='text-5xl font-bold text-center py-4'>Search results for "{title}"</h2>
        {books.length === 0 ? (
          <div className='text-center text-2xl text-gray-600 py-4'>
            No search results found for "{title}"
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
                  <p className='text-lg font-bold text-blue-600 mb-4'>{book.Price} TK</p>
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
                      className={`w-full ${userCart.some(item => item.original_id === book._id) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'} px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
                      disabled={userCart.some(item => item.original_id === book._id)}
                    >
                      <HiShoppingCart className="mr-2" />
                      <span>
                        {userCart.some(item => item.original_id === book._id)
                          ? 'In Cart'
                          : 'Add to Cart'}
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

export default SearchBox;
