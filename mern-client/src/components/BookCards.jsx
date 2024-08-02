import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaEye } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthProvider';

const BookCard = ({ headline, books }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const { user } = useContext(AuthContext);
  const [userCart, setUserCart] = useState([]);

  const addToCart = (e, book) => {
    e.preventDefault();

    if (user) {
      if (userCart.some(item => item._id === book._id)) {
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
            setUserCart(prevCart => [...prevCart, cartItem]);
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
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-5xl text-center font-bold text-gray-800 pb-10'>{headline}</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {books.map(book => (
            <SwiperSlide key={book._id}>
              <div 
                className='relative'
                onMouseEnter={() => setHoveredBook(book._id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                <img src={book.imageURL} alt="" className="w-full h-auto" />
                <button 
                  onClick={(e) => addToCart(e, book)}
                  className='absolute top-3 right-3 bg-orange-400 hover:bg-blue-600 p-2 rounded z-10'
                >
                  <FaCartShopping className='w-4 h-4 text-white'/>
                </button>
                {hoveredBook === book._id && (
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0'>
                    <Link 
                      to={`/book/${book._id}`}
                      className='bg-orange-400 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center'
                    >
                      <FaEye className="mr-2" /> View Details
                    </Link>
                  </div>
                )}
              </div>
              <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>Name: {book.bookTitle}</h3>
                  <p className='text-sm text-gray-600 mb-1'>Author: {book.authorName}</p>
                  <p className='text-sm text-gray-600 mb-2'>Category: {book.category}</p>
                  <p className='text-lg font-bold mb-4'>Price: {book.Price} TK</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookCard;