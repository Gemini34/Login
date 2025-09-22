import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Password successfully reset!");
    setPassword('');
    setConfirmPassword('');

    // Optional: navigate back to login after 1.5 seconds
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

      <div className="Submits">
        <button onClick={handleSubmit}>Reset Password</button>
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

export default ResetPassword;
