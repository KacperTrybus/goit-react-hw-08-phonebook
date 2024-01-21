import { loginSuccess, logoutSuccess } from './redux/authSlice';
import { selectAuthToken } from './redux/selectors';
import { addContactSuccess } from './redux/contactsSlice';
const BASE_URL = 'https://connections-api.herokuapp.com';

export const registerUser = async (userData, dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log('Response data:', data);

    if (data.token) {
      dispatch(loginSuccess(data.token));
    }

    return data;
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.response) {
      console.error('Server response data:', error.response.data);
      console.error('Server response status:', error.response.status);
      console.error('Server response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
    }

    throw error;
  }
};

export const loginUser = async (userData, dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log('Login response data:', data);

    if (data.token) {
      dispatch(loginSuccess(data.token));
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logoutUser = async (dispatch, getState) => {
  try {
    await fetch(`${BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });
    dispatch(logoutSuccess());

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export const getCurrentUserInfo = async (dispatch, getState) => {
  try {
    const authToken = selectAuthToken(getState());

    const response = await fetch(`${BASE_URL}/users/current`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    dispatch(loginSuccess(data));

    return data;
  } catch (error) {
    console.error('Error fetching current user information:', error);
    throw error;
  }
};

export const getContacts = async token => {
  try {
    console.log('Authorization Header:', `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContact = async (contactData, dispatch, getState) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    console.log('Add Contact Response:', data);

    if (response.ok) {
      dispatch(addContactSuccess(data));
    } else {
      console.error('Error adding contact:', data);
    }

    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
