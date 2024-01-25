import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/thunks';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/selectors';
import './usermenu.css';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      {user && user.email ? (
        <p className="usermenu-mail">Welcome {user.email}!</p>
      ) : (
        <p>User email not available</p>
      )}
      <button className="usermenu-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
