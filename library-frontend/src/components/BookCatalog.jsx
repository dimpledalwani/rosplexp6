import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function BookCatalog() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Book Catalog</h2>
      <ul className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <li key={book._id} className="border p-4 shadow rounded">
            <h3 className="font-bold text-xl">{book.title}</h3>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookCatalog;