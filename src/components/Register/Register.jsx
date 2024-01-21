import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'api';

const Register = () => {
  const dispatch = useDispatch();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        password,
      };

      const registrationResult = await registerUser(userData, dispatch);

      if (registrationResult.success) {
        console.log('Registration successful:', registrationResult.message);
      } else {
        console.error('Registration failed:', registrationResult.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setUsername(e.target.value)}
        />
      </label>

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

      <button type="submit">Create account</button>
    </form>
  );
};

export default Register;
