import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Services/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =  "http://localhost:5000";

export const StudentLoginPage = () => {
  const { setUser } = useContext(AuthContext);
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
      const response = await axios.post(`${API_BASE_URL}/api/auth/studentlogin`, {
        ...formData,
        userType: "student",
      });

      alert(response.data.message);

      if (response.data.token) {
        Cookies.set("jwt", response.data.token, {
          expires: 2 / 24,
          secure: false,
          sameSite: "Lax",
        });
      }

      const token = Cookies.get("jwt");
      const UserAuth = await axios.get(`${API_BASE_URL}/api/auth/UserDetails`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUser(UserAuth.data);
      navigate(UserAuth.data.role === "student" ? "/student-dashboard" : "*");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="hidden lg:flex w-1/2 justify-center items-center relative bg-white">
        <img src="../src/assets/studentlogin.svg" alt="Document Verification" className="w-3/4" />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8 shadow-lg">
        <img src="../src/assets/Logo.svg" alt="logo" className="h-24 w-72" />
        <p className="mt-2 text-gray-500">Student Login into your account</p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
          <label className="text-gray-700">Email ID:</label>
          <input
            type="email"
            name="email"
            placeholder="info@provistechnologies.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-green-500"
          />

          <label className="text-gray-700 mt-4 block">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-green-500"
          />

          <Link className="text-green-500 text-sm mt-2 inline-block" to="/forgot-password">
            Forgot password?
          </Link>

          <button type="submit" className="w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
            Login now
          </button>
        </form>
      </div>
    </div>
  );
};
