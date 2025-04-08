// src/pages/BookmarkedBooks.js
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function BookmarkedBooks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarked books:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Bookmarked Books 📌</h2>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500 italic">No bookmarks found.</p>
      ) : (
        bookmarks.map((book) => (
          <div
            key={book.isbn}
            className="border p-4 mb-4 rounded shadow flex justify-between items-start"
          >
            <div className="flex-1">
              <h4 className="text-lg font-bold">{book.title}</h4>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-700">ISBN: {book.isbn}</p>
              <p className="mt-2 text-gray-600">{book.description}</p>

              {book.fileUrl ? (
                <div className="flex gap-3 mt-3">
                  <a
                    href={book.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📖 Read Book
                  </a>
                  <button
                    onClick={() => window.open(book.fileUrl, "_blank")}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    View Book
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 italic mt-2">No book file available</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookmarkedBooks;
