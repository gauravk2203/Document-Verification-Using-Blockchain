import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import js-cookie
import styles from "./StudentLogin.module.css";

const StudentLogin = ({ setUserType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/studentlogin", formData);
      alert(response.data.message);

      if (response.data.token) {
        // Store JWT in a cookie
        Cookies.set("jwt", response.data.token, {
          expires: 1, // 1 day
          secure: false, // Set to true in production
          sameSite: "Lax"
        });
      }

      setUserType("student");
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Student Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/registration">Register here</a></p>
      </div>
    </div>
  );
};

export default StudentLogin;
