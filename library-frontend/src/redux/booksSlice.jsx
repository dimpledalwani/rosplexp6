import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  borrowedBooks: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    borrowBook: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        state.borrowedBooks.push(book);
      }
    },
  },
});

export const { setBooks, addBook, updateBook, deleteBook, borrowBook } = booksSlice.actions;
export default booksSlice.reducer;
