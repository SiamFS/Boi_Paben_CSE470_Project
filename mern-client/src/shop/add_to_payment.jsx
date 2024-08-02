import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { HiTrash } from 'react-icons/hi';

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
      .then((data) => setCartItems(data))
      .catch((error) => console.error('Error fetching cart items:', error));
  };

  const handleRemoveItem = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(cartItems.filter((item) => item._id !== id));
        } else {
          console.error('Failed to remove item:', data.message);
          // Optionally, show an error message to the user
        }
      })
      .catch((error) => {
        console.error('Error removing item:', error);
        // Optionally, show an error message to the user
      });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.Price), 0);

  return (
    <div className='pt-28 px-4 lg:px-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-3/4 p-4'>
          {cartItems.length === 0 ? (
            <div className='text-center text-3xl font-bold text-red-600'>
              No items in the cart.
            </div>
          ) : (
            <div>
              <h2 className='text-3xl lg:text-5xl font-bold mb-4'>My Shopping Cart</h2>
              <div className='flex flex-col space-y-4'>
                {cartItems.map((item) => (
                  <div key={item._id} className='flex items-center border p-2 rounded-lg'>
                    <img src={item.imageURL} alt={item.bookTitle} className='h-20 w-20 object-cover rounded-lg' />
                    <div className='ml-4 flex-grow'>
                      <h5 className='text-lg font-bold text-gray-900'>{item.bookTitle}</h5>
                      <p className='text-sm font-medium text-gray-700'>
                        Author: {item.authorName} <br />
                        Category: {item.category} <br />
                        Price: {item.Price} TK
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className='bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors'
                    >
                      <HiTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='lg:w-1/4 p-4  border rounded shadow-lg lg:ml-4'>
          <h2 className='text-3xl lg:text-5xl font-bold mb-4'>Order Summary</h2>
          <p className='text-xl mb-2'>Subtotal: {totalPrice.toFixed(2)} TK</p>
          <p className='text-xl mb-2'>Estimated Shipping: 50.00 TK</p>
          <p className='text-xl mb-10'>Total: {(totalPrice + 50).toFixed(2)} TK</p>
          <Link to='/checkout' className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors mt-4'>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToPayment;