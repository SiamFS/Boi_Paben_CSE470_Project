import React from 'react'
import Banner from '../components/Banner'
import CategoryBooks from './CategoryBooks'
import FavoriteBooks from './LatestBooks'



const Home = () => {
  return (
    <div>
      <Banner />
      <CategoryBooks />
      <FavoriteBooks />
      
    </div>
  )
}

export default Home