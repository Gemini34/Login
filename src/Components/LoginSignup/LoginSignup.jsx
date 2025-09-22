import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          email,
          password,
          action,
        }
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
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
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Forgot Password link */}
      {action === "Login" && (
        <div className="forgot-password">
          Forgot Password?{" "}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/forgot-password')}
          >
            Click Here
          </span>
        </div>
      )}

      {/* Toggle buttons */}
      <div className="submit-container">
        {action !== "Sign Up" && (
          <div className="submit" onClick={() => setAction("Sign Up")}>
            SignUp
          </div>
        )}
        {action !== "Login" && (
          <div className="submit" onClick={() => setAction("Login")}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
