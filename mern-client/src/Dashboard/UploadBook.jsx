import React, { useState, useContext } from 'react';
import { Button, TextInput, Textarea } from 'flowbite-react';
import { AuthContext } from '../contexts/AuthProvider';

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

  const { user } = useContext(AuthContext);
  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[10]);
  const [imageFile, setImageFile] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const category = form.category.value;
    const Price = form.Price.value;
    const bookDescription = form.bookDescription.value;

    // Upload image to imgbb
    const formData = new FormData();
    formData.append('image', imageFile);
    const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=47bd3a08478085812d1960523ecd71ba', {
      method: 'POST',
      body: formData
    }).then(res => res.json());

    const imageURL = imgbbResponse.data.url;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      Price,
      bookDescription,
      email: user.email
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
            <label htmlFor='imageURL'>Book Image</label>
            <input
              id='imageURL'
              name='imageURL'
              required
              type='file'
              onChange={handleImageChange}
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
            />
          </div>
          <div className="lg:w-1/2">
            <label htmlFor='inputState'>Book Category</label>
            <select id='inputState' name='category' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
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
