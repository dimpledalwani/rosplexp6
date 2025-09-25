import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in with:", { username, password });
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });

      const { access_token, role } = response.data;

      // Store token & role
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-2 font-semibold">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        className="block border p-2 mb-2 w-full"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="block border p-2 mb-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;