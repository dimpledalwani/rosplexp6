import React, { useState } from "react";

function AdminDashboard() {
  const [eBooks, setEBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const handleAddBook = () => {
    const newBook = { id: eBooks.length + 1, title: "New eBook", author: "Unknown Author" };
    setEBooks([...eBooks, newBook]);
  };

  const handleDeleteBook = (id) => {
    setEBooks(eBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>
      <button
        onClick={handleAddBook}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Add New eBook
      </button>
      <ul className="space-y-2">
        {eBooks.map((book) => (
          <li key={book.id} className="p-4 bg-white rounded shadow flex justify-between">
            <span>{book.title} by {book.author}</span>
            <button
              onClick={() => handleDeleteBook(book.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
