import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const LoginSignup = () => {
  const [action, setAction] = useState("Login"); // "Login" or "Sign Up"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login API call
  const login = async (data) => {
    const res = await fetch("https://dummyjson.com/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    return res.json();
  };

  // Register API call
  const signUp = async (data) => {
    const res = await fetch("https://dummyjson.com/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Sign Up failed");
    }

    const response = await res.json();
    toast.success("Successfully registered!");
    console.log("Sign Up Response:", response);
    return response;
  };

  // Handle submit for both Login and Sign Up
  const handleSubmit = async () => {
    if (action === "Sign Up") {
      // Validate Sign Up fields
      if (!firstName || !lastName || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const signUpData = { firstName, lastName, email, password };
      setLoading(true);
      try {
        await signUp(signUpData);
        
        setAction("Login");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("Sign Up Error:", error);
        toast.error(error.message || "Sign Up failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Login logic
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const loginData = { email, password };
      const response = await login(loginData);

      toast.success("Successfully logged in!");
      if (response?.accessToken) {
        localStorage.setItem("authToken", response.accessToken);
      }

      navigate("/dashboard");
      console.log("Login Response:", response);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action === "Sign Up" && (
          <>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className='input'>
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="Submits">
        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? action === "Login"
              ? "Logging in..."
              : "Submitting..."
            : "Submit"}
        </button>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Forgot Password?{" "}
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/forgot-password')}>
            Click Here
          </span>
        </div>
      )}

      {/* Toggle between Login / Sign Up */}
      <div className="submit-container">
        {action !== "Sign Up" && (
          <div className="submit" onClick={() => setAction("Sign Up")}>
            Sign Up
          </div>
        )}
        {action !== "Login" && (
          <div className="submit" onClick={() => setAction("Login")}>
            Login
          </div>
        )}
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default LoginSignup;
