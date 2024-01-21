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
import { selectAuthToken } from '../redux/selectors';
const App = () => {
  const token = selectAuthToken;
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
                  <h1>Phonebook</h1>
                  <ContactForm />
                  <UserMenu />
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
