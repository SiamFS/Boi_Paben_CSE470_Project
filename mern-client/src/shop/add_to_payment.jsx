import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { HiTrash } from 'react-icons/hi';
import { Card } from 'flowbite-react';

const AddToPayment = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = () => {
    fetch(`http://localhost:5000/cart/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  };

  const handleRemoveItem = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(cartItems.filter((item) => item._id !== id));
        }
      });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.Price), 0);

  return (
    <div className='pt-28 px-4 lg:px-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/4 p-4 border rounded shadow-lg'>
          <h2 className='text-3xl lg:text-5xl font-bold mb-4'>Order Summary</h2>
          <p className='text-xl mb-2'>Subtotal: {totalPrice.toFixed(2)} TK</p>
          <p className='text-xl mb-2'>Estimated Shipping: 50.00 TK</p>
          <p className='text-xl mb-4'>Total: {(totalPrice + 50).toFixed(2)} TK</p>
          <Link to='/checkout' className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors mt-4'>
            Checkout
          </Link>
        </div>
        <div className='lg:w-3/4 p-4'>
          {cartItems.length === 0 ? (
            <div className='text-center text-3xl font-bold text-red-600'>
              No items in the cart.
            </div>
          ) : (
            <div>
              <h2 className='text-3xl lg:text-5xl font-bold mb-4'>My Shopping Cart</h2>
              <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-6'>
                {cartItems.map((item) => (
                  <Card
                    key={item._id}
                    className='relative group transform transition-transform hover:scale-105 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg w-full mx-auto'
                  >
                    <div className='flex'>
                      <img src={item.imageURL} alt={item.bookTitle} className='h-32 w-32 object-cover mx-auto rounded-lg' />
                      <div className='p-4 flex flex-col justify-between'>
                        <div>
                          <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            {item.bookTitle}
                          </h5>
                          <p className='font-normal text-gray-700 dark:text-gray-400'>
                            {item.authorName}<br />
                            Category: {item.category} <br />
                            {item.Price} TK
                          </p>
                        </div>
                        <div className='mt-4 flex justify-between items-center'>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className='bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors'
                          >
                            <HiTrash />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPayment;
