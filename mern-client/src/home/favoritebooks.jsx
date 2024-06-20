import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards'

const FavoriteBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/allbooks").then(res => res.json()).then(data => setBooks(data))
    }, [])

    return (
        <div>
            <BookCards books={books} headline="Books For Sell" />
        </div>
    )
}

export default FavoriteBooks
