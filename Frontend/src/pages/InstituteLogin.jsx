import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import js-cookie
import styles from "./InstituteLogin.module.css";

const InstituteLogin = ({ setUserType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailOrCode: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/institutelogin", {
        email: formData.emailOrCode.includes("@") ? formData.emailOrCode : undefined,
        instituteCode: !formData.emailOrCode.includes("@") ? formData.emailOrCode : undefined,
        password: formData.password,
      });

      alert(response.data.message);

      if (response.data.token) {
        // Store JWT in a cookie
        Cookies.set("jwt", response.data.token, {
          expires: 1, // 1 day
          secure: false, // Change to true in production
          sameSite: "Lax"
        });
      }

      setUserType("institute");
      navigate("/institute-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Institute Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrCode"
            placeholder="Email or Institute Code"
            value={formData.emailOrCode}
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

export default InstituteLogin;
