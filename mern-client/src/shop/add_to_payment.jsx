import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { HiTrash } from 'react-icons/hi';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PiZwnGRR4keZPjYev4QMRdtJjbwUM1oNCJW2ZzJ75kE7lg49NHPsoYn6rxibQ4ERYKROtZp5bRJULLrC20P8UZ500NWNb7Fj3');

const AddToPayment = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
        }
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.Price), 0);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        email: user.email, // Add user email to the request body if needed
      }),
    });

    const session = await response.json();

    if (response.ok) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Failed to create checkout session:', session.message);
    }
  };

  return (
    <div className='pt-28 px-4 lg:px-24'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-3/4 p-4'>
          {cartItems.length === 0 ? (
            <div className="pl-20 pt-10 text-3xl text-center font-bold text-black">
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
        <div className='lg:w-1/4 p-4 border rounded shadow-lg lg:ml-4'>
          <h2 className='text-3xl lg:text-5xl font-bold mb-4'>Order Summary</h2>
          <p className='text-xl mb-2'>Subtotal: {totalPrice.toFixed(2)} TK</p>
          <p className='text-xl mb-2'>Estimated Shipping: 50.00 TK</p>
          <p className='text-xl mb-10'>Total: {(totalPrice + 50).toFixed(2)} TK</p>
          <button
            onClick={handlePayment}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPayment;
