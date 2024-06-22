import React, { useState } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Horror",
    "Romance",
    "Thriller",
    "Adventure",
    "Children",
    "Education",
    "Biography",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[10]);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const categoryName = form.categoryName.value;
    const Price = form.Price.value;
    const bookDescription = form.bookDescription.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      categoryName,
      Price,
      bookDescription,
    };

    console.log(bookObj);

    fetch('http://localhost:5000/upload-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      alert("Book Uploaded Successfully");
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className="mb-8 text-3xl font-bold">Upload Book</h2>

      <form onSubmit={handleBookSubmit} className="flex flex-col lg:w-[1180px] flex-wrap gap-4">
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="lg:w-1/2">
            <label htmlFor='bookTitle'>Book Title</label>
            <TextInput
              id='bookTitle'
              name='bookTitle'
              placeholder='Book Name'
              required
              type='text'
            />
          </div>
          <div className="lg:w-1/2">
            <label htmlFor='authorName'>Author Name</label>
            <TextInput
              id='authorName'
              name='authorName'
              placeholder='Author Name'
              required
              type='text'
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="lg:w-1/2">
            <label htmlFor='imageURL'>Book Image URL</label>
            <TextInput
              id='imageURL'
              name='imageURL'
              placeholder='Book Image URL'
              required
              type='text'
            />
          </div>
          <div className="lg:w-1/2">
            <label htmlFor='inputState'>Book Category</label>
            <select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="lg:w-1/2">
            <label htmlFor='Price'>Book Price</label>
            <TextInput
              id='Price'
              name='Price'
              placeholder='Price'
              required
              type='number'
            />
          </div>
          <div className="lg:w-1/2">
            <label htmlFor='bookDescription'>Book Description</label>
            <Textarea
              id='bookDescription'
              name='bookDescription'
              placeholder='Book Description'
              required
              className='w-full'
              rows={6}
            />
          </div>
        </div>
        <Button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Upload Book</Button>
      </form>
    </div>
  );
}

export default UploadBook;
