// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/thunks';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { getContacts } from '../../redux/thunks';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userData = {
        email: email,
        password: password,
      };

      await dispatch(loginUser(userData));
      navigate('/contacts');
      await dispatch(getContacts());
    } catch (error) {
      console.error('Error during login:', error);

      if (error.message) {
        console.error('Error message:', error.message);
      }
    }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <ul className="login-form-list">
        <li>
          <label className="login-form-label">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="login-input"
            />
          </label>
        </li>

        <li>
          <label className="login-form-label">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
        </li>

        <button className="login-btn" type="submit">
          Login
        </button>
      </ul>
    </form>
  );
};

export default Login;
