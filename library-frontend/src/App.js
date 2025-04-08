import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BookCatalog from "./components/BookCatalog";
import BookmarkedBooks from "./components/BookmarkedBooks"; // ✅ NEW
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Removed Recommendations route */}
        {/* <Route path="/recommendations" element={<Recommendations />} /> */}

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarked"
          element={
            <ProtectedRoute>
              <BookmarkedBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/books"
          element={
            <ProtectedRoute>
              <BookCatalog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
