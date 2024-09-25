import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const FavoriteBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/allbooks");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Sort books by createdAt in descending order (newest first)
                const sortedBooks = data.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                
                // Take only the first 20 books and reverse their order
                const reversedBooks = sortedBooks.slice(0, 20).reverse();
                
                setBooks(reversedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to load books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center my-8">Loading...</div>;
    if (error) return <div className="text-center my-8 text-red-500">{error}</div>;

    return (
        <div className="my-16 px-4 lg:px-24">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Books</h2>
            {books.length > 0 ? (
                <BookCards books={books} />
            ) : (
                <p className="text-center">No books available at the moment.</p>
            )}
        </div>
    );
};

export default FavoriteBooks;