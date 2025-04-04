import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BookCatalog from "./components/BookCatalog";
import Recommendations from "./components/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recommendations" element={<Recommendations />} />

        {/* Protected User Route */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
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
