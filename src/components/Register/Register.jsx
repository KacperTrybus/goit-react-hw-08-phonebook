import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/thunks';
import { useNavigate } from 'react-router-dom';
// import { registerSuccess } from '../../redux/authSlice';
import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const token = await dispatch(registerUser(formData));

      if (token) {
        navigate('/login');
        console.log('Token after registration:', token);
      } else {
        console.log('Login failed. Stay on the current page.');
      }
      // dispatch(registerSuccess(token));
    } catch (error) {
      navigate('/register');
      console.error('Error during registration:', error);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <ul className="register-form-list">
        <li>
          <label className="register-form-label">
            Username:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="register-input"
            />
          </label>
        </li>

        <li>
          <label className="register-form-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="register-input"
            />
          </label>
        </li>

        <li>
          <label className="register-form-label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="register-input"
            />
          </label>
        </li>
        <button className="register-btn" type="submit">
          Create account
        </button>
      </ul>
    </form>
  );
};

export default Register;
