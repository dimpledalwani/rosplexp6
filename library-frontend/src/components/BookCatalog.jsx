import React, { useState } from "react";

function BookCatalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", available: false },
    { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Book Catalog</h2>
      <input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <ul className="space-y-2">
        {filteredBooks.map((book) => (
          <li key={book.id} className="p-4 bg-white rounded shadow">
            <span className="block font-semibold">{book.title}</span>
            <span className="block">Author: {book.author}</span>
            <span className="block">Genre: {book.genre}</span>
            <span className={`block ${book.available ? "text-green-500" : "text-red-500"}`}>
              {book.available ? "Available" : "Unavailable"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookCatalog;
