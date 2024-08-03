import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, TextInput, Textarea } from 'flowbite-react';

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, category, Price, imageURL, bookDescription } = useLoaderData();
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

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);
  const [imageFile, setImageFile] = useState(null);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const categoryName = form.categoryName.value;
    const Price = form.Price.value;
    const bookDescription = form.bookDescription.value;

    let updatedImageURL = imageURL;

    if (imageFile) {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append('image', imageFile);
      const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=47bd3a08478085812d1960523ecd71ba', {
        method: 'POST',
        body: formData
      }).then(res => res.json());

      updatedImageURL = imgbbResponse.data.url;
    }

    const updateBookObj = {
      bookTitle,
      authorName,
      imageURL: updatedImageURL,
      categoryName,
      Price,
      bookDescription,
    };

    fetch(`http://localhost:5000/book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBookObj)
    }).then(res => res.json()).then(data => {
      alert("Book Updated Successfully");
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className="mb-8 text-3xl font-bold">Update the Book data</h2>

      <form onSubmit={handleUpdate} className="flex flex-col lg:w-[1180px] flex-wrap gap-4">
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="lg:w-1/2">
            <label htmlFor='bookTitle'>Book Title</label>
            <TextInput
              id='bookTitle'
              name='bookTitle'
              placeholder='Book Name'
              required
              type='text'
              defaultValue={bookTitle}
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
              defaultValue={authorName}
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="lg:w-1/2">
            <label htmlFor='imageURL'>Book Image</label>
            <input
              id='imageURL'
              name='imageURL'
              type='file'
              onChange={handleImageChange}
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
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
              defaultValue={Price}
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
              defaultValue={bookDescription}
            />
          </div>
        </div>
        <Button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Book</Button>
      </form>
    </div>
  );
}

export default EditBooks;
