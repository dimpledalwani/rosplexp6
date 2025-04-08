import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">eLibrary Hub</h1>
        <ul className="flex space-x-6">
          <li className="hover:text-gray-300">
            <Link to="/">Home</Link>
          </li>

          {role === "admin" && (
            <>
              <li className="hover:text-gray-300">
                <Link to="/admin">Admin Dashboard</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/admin/books">Manage Books</Link>
              </li>
            </>
          )}

          {role === "user" && (
            <>
              <li className="hover:text-gray-300">
                <Link to="/user">User Dashboard</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/bookmarked">Bookmarked</Link>
              </li>
            </>
          )}

          {!role && (
            <>
              <li className="hover:text-gray-300">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {role && (
            <li className="hover:text-gray-300">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
