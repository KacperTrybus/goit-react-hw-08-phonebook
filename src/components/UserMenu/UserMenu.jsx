import React from 'react';
import { useSelector } from 'react-redux';

const UserMenu = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      <p>{user.email}</p>
      <button>Logout</button>
    </div>
  );
};

export default UserMenu;
