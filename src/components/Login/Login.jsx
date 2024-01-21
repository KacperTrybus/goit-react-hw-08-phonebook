// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/thunks';
import { useNavigate } from 'react-router-dom';

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
    } catch (error) {
      console.error('Error during login:', error);

      if (error.message) {
        console.error('Error message:', error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
