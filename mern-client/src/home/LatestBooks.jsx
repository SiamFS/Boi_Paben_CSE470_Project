import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BookCards from '../components/BookCards'

const FavoriteBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/allbooks")
            .then(res => res.json())
            .then(data => setBooks(data.slice(0, 8)))
            .catch(error => console.error('Error fetching books:', error));
    }, [])

    return (
        <div className="my-16 px-4 lg:px-24">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Books</h2>
            <BookCards books={books} />
        </div>
    )
}

export default FavoriteBooks