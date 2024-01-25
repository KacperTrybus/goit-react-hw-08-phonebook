import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import UserMenu from './UserMenu/UserMenu';
import Login from './Login/Login';
import Register from './Register/Register';
import { selectAuthToken, selectFilter } from '../redux/selectors';
import Filter from './Filter/Filter';
import { useSelector } from 'react-redux';
import './app.css';

const App = () => {
  const token = useSelector(selectAuthToken);
  const filter = useSelector(selectFilter);

  return (
    <Router basename="/goit-react-hw-08-phonebook">
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/contacts"
            element={
              token ? (
                <>
                  <h1>Your phonebook</h1>
                  <UserMenu />
                  <ContactForm />
                  <Filter filter={filter} />
                  <ContactList />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
