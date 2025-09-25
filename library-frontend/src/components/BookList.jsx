import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index} className="border p-2 mb-2">
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;