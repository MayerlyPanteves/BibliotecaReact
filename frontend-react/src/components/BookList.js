import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/libros');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Lista de Libros</h2>
            <ul className="list-group">
                {books.map(book => (
                    <li key={book.id} className="list-group-item">
                        {book.titulo} - {book.autor}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;