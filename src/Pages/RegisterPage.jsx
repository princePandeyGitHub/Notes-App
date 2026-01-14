import { Link } from "react-router";
import axios from "axios";
import "./RegisterPage.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export function RegisterPage({ setPopup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // basic frontend validation
    if (!name || !email || !password) {
      setPopup({
        id: Date.now(),
        message: "All fields are required",
        status: "failure",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://notes-app-backend-myak.onrender.com/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setPopup({
        id: Date.now(),
        message: response.data.message || "Registration successful",
        status: "success",
      });

      // optional: clear fields after success
      setName("");
      setEmail("");
      setPassword("");

      navigate('/login');

    } catch (error) {
      setPopup({
        id: Date.now(),
        message: error.response?.data?.message || "Registration failed",
        status: "failure",
      });
    }
  };

  return (
    <div className="card">
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>
      </form>

      <div className="link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
