import { useState } from 'react';
import { loginUser } from '../api';
import { useDispatch } from 'react-redux';

export const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(email, password));
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

      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
