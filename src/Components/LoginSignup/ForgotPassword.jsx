import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // For now, just alert and navigate to Reset Password page
    alert(`Password reset link sent to ${email}`);
    navigate('/reset-password'); // go to reset password page
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="Submits">
        <button onClick={handleSubmit}>Send Reset Link</button>
      </div>

      <div
        className="submit-container"
        style={{ marginTop: '20px', textAlign: 'center' }}
      >
        <span
          className="submit gray"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
