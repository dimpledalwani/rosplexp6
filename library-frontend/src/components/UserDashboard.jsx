import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchBookmarks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookmarkedIsbns = res.data.map((book) => book.isbn);
      setBookmarks(bookmarkedIsbns);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  const handleBookmark = async (isbn) => {
    try {
      const token = localStorage.getItem("token");
      const alreadyBookmarked = bookmarks.includes(isbn);

      if (!token) {
        console.error("No token found. Please log in again.");
        return;
      }

      if (!alreadyBookmarked) {
        await axiosInstance.post(
          "/bookmark",
          { isbn },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookmarks((prev) => [...prev, isbn]);
      } else {
        await axiosInstance.delete(`/bookmark/${isbn}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarks((prev) => prev.filter((b) => b !== isbn));
      }
    } catch (err) {
      console.error("Error bookmarking:", err.response?.data || err.message);
    }
  };

  const isBookmarked = (isbn) => bookmarks.includes(isbn);

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
                    <button
                      onClick={() => window.open(book.fileUrl, "_blank")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Read Now
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-400 italic mt-2">
                    No book file available
                  </p>
                )}
              </div>

              <button
                className={`px-3 py-1 h-fit rounded text-white ml-4 ${
                  isBookmarked(book.isbn) ? "bg-green-600" : "bg-blue-600"
                } hover:opacity-90`}
                onClick={() => handleBookmark(book.isbn)}
              >
                {isBookmarked(book.isbn) ? "Bookmarked ✅" : "Bookmark"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
