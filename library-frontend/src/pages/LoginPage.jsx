import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      alert("Login successful!");
      // Redirect to dashboard or home
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
