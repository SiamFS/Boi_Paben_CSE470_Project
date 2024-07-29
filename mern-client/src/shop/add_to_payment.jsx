import React from 'react';
import { useLocation } from 'react-router-dom';

const AddToPayment = () => {
  const location = useLocation();
  const { book } = location.state || {};

  if (!book) {
    return <div className="container mx-auto p-4">No book selected for payment</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Confirm Payment</h1>
      <div className="border rounded-lg overflow-hidden shadow-lg p-4">
        <img src={book.imageURL} alt={book.bookTitle} className="w-full h-64 object-cover mb-4"/>
        <h2 className="text-xl font-semibold mb-2">{book.bookTitle}</h2>
        <p className="text-gray-700 mb-1">By {book.authorName}</p>
        <p className="text-gray-700 mb-1">Category: {book.category}</p>
        <p className="text-gray-700 mb-4">{book.Price}TK</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default AddToPayment;
