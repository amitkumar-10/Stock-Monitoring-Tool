import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { Link,useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://stock-monitoring-tool-9s17.onrender.com/signup", formData, {
      withCredentials: true
    });

    toast.success(response.data.message || "Signup successful");
    
    // Redirect to local login or dashboard
    window.location.href = "http://localhost:5174/";  // change if needed
  } catch (error) {
    const msg = error?.response?.data?.message || "Signup failed. Please try again.";
    toast.error(msg);
    console.error("Signup error:", error);
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Signup</button>
        </form>

        <p>
            Already have an account {" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
    
  );
};

export default Signup;
