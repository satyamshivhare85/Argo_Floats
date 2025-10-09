import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // This function contains the simple, frontend-only logic.
  // It does NOT try to contact any server.
  const handleSignIn = (e) => {
    e.preventDefault(); // Stop the page from reloading
    
    // As long as the fields are not empty, the login will "succeed"
    if (email && password) {
      // 1. Tell our app's context that we are logged in
      login(); 
      
      // 2. Go to the chatbot page
      navigate('/chatbot');
      
    } else {
      // 3. If a field is empty, show an error
      setError('Login failed. Please fill in both fields.');
    }
  };

  return (
    <div className="login-page-container">
        <div className="login-form-wrapper">
          <div className="form-section">
            <form onSubmit={handleSignIn}>
              <h1>Sign In</h1>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit">SIGN IN</button>
            </form>
          </div>
          <div className="panel-section">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us</p>
              {/* This button doesn't need to do anything for now */}
              <button type="button" className="overlay-button">SIGN UP</button>
          </div>
        </div>
      </div>
  );
}