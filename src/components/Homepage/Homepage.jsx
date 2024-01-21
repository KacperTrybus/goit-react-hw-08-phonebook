import { Link } from 'react-router-dom';

export const Homepage = () => {
  return (
    <div>
      <h1>
        <Link to="register">Create an account</Link> or
        <Link to="login">Login</Link> into exisiting one
      </h1>
    </div>
  );
};

export default Homepage;
