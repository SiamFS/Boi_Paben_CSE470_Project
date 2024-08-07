import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards'

const FavoriteBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/allbooks").then(res => res.json()).then(data => setBooks(data.slice(0, 8)))
    }, [])

    return (
        <div>
            <BookCards books={books} headline="Latest Books" />
        </div>
    )
}

export default FavoriteBooks
