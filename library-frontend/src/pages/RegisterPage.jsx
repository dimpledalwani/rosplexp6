import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Registering with:", { username, password, role });
      await axiosInstance.post("/register", { username, password, role });
      setMessage("✅ Registration successful. You can now login.");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("❌ Registration failed or user already exists.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-2">{message}</p>}
      <input
        className="w-full mb-2 p-2 border"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full mb-2 p-2 border"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}

export default RegisterPage;
