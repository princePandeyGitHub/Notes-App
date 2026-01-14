import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './LoginPage.css';
import { useState } from 'react';

export function LoginPage({ setPopup, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopup({
        id: Date.now(),
        message: "Email and password are required",
        status: "failure"
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://notes-app-backend-myak.onrender.com/auth/login',
        { email, password }
      );

      localStorage.setItem('token', response.data.token);
      setToken(localStorage.getItem('token'));

      setPopup({
        id: Date.now(),
        message: "Login Success",
        status: "success"
      });

      navigate('/')

    } catch (error) {
      setPopup({
        id: Date.now(),
        message: error.response?.data?.message || "Login Failed",
        status: "failure"
      });
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <div className="link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
