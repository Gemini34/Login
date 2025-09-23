import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup'; // match your folder structure
import ForgotPassword from './Components/LoginSignup/ForgotPassword'; // create this page
import ResetPassword from './Components/LoginSignup/ResetPassword';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
