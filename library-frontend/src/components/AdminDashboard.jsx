import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 for route change detection
import axiosInstance from "../utils/axiosInstance";

function AdminDashboard() {
  const location = useLocation(); // 👈 track current route

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    link: "",
  });
  const [editingISBN, setEditingISBN] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // 🔁 Re-fetch books on route change
  useEffect(() => {
    fetchBooks();
  }, [location.pathname]);

  const handleAddOrUpdateBook = async () => {
    const trimmedForm = {
      ...form,
      isbn: form.isbn.trim(),
      link: form.link.trim(),
    };

    try {
      if (editingISBN) {
        await axiosInstance.put(`/books/${editingISBN.trim()}`, trimmedForm);
        setEditingISBN(null);
      } else {
        await axiosInstance.post("/books", trimmedForm);
      }
      setForm({ title: "", author: "", description: "", isbn: "", link: "" });
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditingISBN(book.isbn);
  };

  const handleDelete = async (isbn) => {
    try {
      await axiosInstance.delete(`/books/${isbn.trim()}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">
          {editingISBN ? "Update Book" : "Add Book"}
        </h3>
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Author"
          name="author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <textarea
          className="w-full p-2 mb-2 border"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <input
          className="w-full p-2 mb-2 border"
          placeholder="ISBN"
          name="isbn"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Book Link (optional)"
          name="link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <button
          onClick={handleAddOrUpdateBook}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          {editingISBN ? "Update" : "Add Book"}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Books List</h3>
      <div className="grid grid-cols-1 gap-4">
        {books.map((book, index) => (
          <div
            key={book.isbn || `${book.title}-${index}`} // ✅ fallback key to avoid warnings
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-bold">{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>{book.description}</p>
              {book.link && (
                <p>
                  Link:{" "}
                  <a
                    href={book.link}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Book
                  </a>
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(book)}
                className="bg-yellow-400 px-2 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.isbn)}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
