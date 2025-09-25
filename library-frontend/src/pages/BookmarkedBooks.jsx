import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookmarkedBooks = () => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBookmarkedBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarkedBooks(res.data.bookmarked_books);
    } catch (err) {
      console.error("Error fetching bookmarked books:", err);
    }
  };

  const handleReadBook = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    fetchBookmarkedBooks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Bookmarked Books</h1>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/user")}
        >
          Back to Dashboard
        </button>
      </div>

      {bookmarkedBooks.length === 0 ? (
        <p className="text-gray-700">You haven't bookmarked any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarkedBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
              <p className="text-sm mb-1 text-gray-700">Author: {book.author}</p>
              {book.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {book.description.length > 100
                    ? book.description.substring(0, 100) + "..."
                    : book.description}
                </p>
              )}
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleReadBook(book.file_url)}
              >
                Read Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedBooks;
