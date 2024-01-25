import { Link } from 'react-router-dom';
import './homepage.css';

export const Homepage = () => {
  return (
    <div className="homepage">
      <ul className="homepage-list">
        <li className="homepage-list-element">
          <Link className="homepage-link" to="register">
            Create an account
          </Link>
        </li>
        <li className="homepage-list-element">
          or <br />
          <Link className="homepage-link" to="login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Homepage;
