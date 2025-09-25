import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, User 📚</h2>

      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search by title, author or ISBN"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4">
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500 italic">No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.isbn}
              className="border p-4 rounded shadow flex justify-between items-start"
            >
              <div className="flex-1">
                <h4 className="text-lg font-bold">{book.title}</h4>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">ISBN: {book.isbn}</p>
                <p className="mt-2 text-gray-600">{book.description}</p>

                {book.link ? (
                  <div className="mt-3">
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 inline-block"
                    >
                      📖 Read Now
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400 italic mt-2">
                    No book link available
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
