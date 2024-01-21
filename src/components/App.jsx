import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './Homepage/Homepage';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import UserMenu from './UserMenu/UserMenu';
import Login from './Login/Login';
import Register from './Register/Register';
const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router basename="/goit-react-hw-08-phonebook">
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/contacts"
            element={
              isAuthenticated ? (
                <>
                  <h1>Phonebook</h1>
                  <ContactForm />
                  <UserMenu />
                  <ContactList />
                </>
              ) : (
                <Navigate to="/" replace />
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
