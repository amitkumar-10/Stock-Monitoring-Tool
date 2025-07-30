import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // make sure this path is correct based on your folder
import { toast } from "react-toastify"; 
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://stock-monitoring-tool-9s17.onrender.com/signin", {
        email:email,
        password: password,
      });

      // Set cookie (handled by server using res.cookie)
      if (res.status === 200) {
        toast.success("Signup successful");
        window.location.href = "http://localhost:5174/";
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
