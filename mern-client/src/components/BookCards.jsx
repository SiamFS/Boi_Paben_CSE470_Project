import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const bookcard = ({headline, books}) => {
      console.log(books)
  return (
    <div className = 'my-16 px-4 lg:px-24'>
        <h2 className='text-5xl text-center font-bold text-gray-800'>{headline}</h2>
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
        {
          books.map(book => <SwiperSlide key={book._id}>
                 <Link to="/">
                     <div>
                        <img src={book.imageURL} alt={book.title} className='w-full h-64 object-cover' />
                     </div>
                     <div>
                        <h3>{book.bookTile}</h3>
                        
                     </div>
                 </Link>
            </SwiperSlide>)
        }
      </Swiper>
        </div>
    </div>
  
  )
}

export default bookcard