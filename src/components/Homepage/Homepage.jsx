import { Link } from 'react-router-dom';
import './homepage.css';

export const Homepage = () => {
  return (
    <div className="homepage">
      <ul className="homepage-list">
        <p className="homepage-text">
          Welcome to your phonebook! Choose either to:
        </p>
        <li className="homepage-list-element">
          <Link className="homepage-link" to="register">
            Create an account
          </Link>
        </li>
        <span className="homepage-text">or</span>
        <li className="homepage-list-element">
          <Link className="homepage-link" to="login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Homepage;
