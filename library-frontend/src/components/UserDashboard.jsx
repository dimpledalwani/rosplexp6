import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    axiosInstance.get("/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  // Filtered books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bookmark an eBook
  const handleBookmark = (book) => {
    if (!bookmarkedBooks.includes(book)) {
      setBookmarkedBooks([...bookmarkedBooks, book]);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6">User Dashboard</h2>
      <input
        type="text"
        placeholder="Search eBooks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <h3 className="text-2xl font-semibold mb-4">Available eBooks</h3>
      <ul className="space-y-2">
        {filteredBooks.map((book) => (
          <li key={book._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h4 className="font-bold">{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
            </div>
            <div>
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2">Read Online</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">Download</button>
              <button
                onClick={() => handleBookmark(book)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >Bookmark</button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-6">Bookmarked eBooks</h3>
      <ul className="space-y-2">
        {bookmarkedBooks.map((book) => (
          <li key={book._id} className="p-4 bg-white rounded shadow">
            <h4 className="font-bold">{book.title}</h4>
            <p>Author: {book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
