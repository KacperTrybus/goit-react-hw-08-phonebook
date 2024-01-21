import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/thunks';
import { Navigate } from 'react-router-dom';

const UserMenu = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      Navigate('/homepage');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      {user && user.email ? (
        <p>{user.mail}</p>
      ) : (
        <p>User email not available</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
