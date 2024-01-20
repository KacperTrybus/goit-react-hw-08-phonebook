import { useState } from 'react';
import { registerUser } from '../api';
import { useDispatch } from 'react-redux';

export const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="username"></input>
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
      </label>

      <button type="submit">Create account</button>
    </form>
  );
};
export default Register;
