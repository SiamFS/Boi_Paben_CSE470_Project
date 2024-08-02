import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCard from '../home/BannerCard';

function Banner() {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Books <span className='text-orange-400'>for the Best Price</span></h2>
          <p>Easily buy and sell your books at unbeatable prices. Find new reads or earn from your old ones. Enjoy great value and a vast selection. Join our community and start trading today!</p>
        </div>

        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
}

export default Banner;
