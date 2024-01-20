import axios from 'axios';
import store from 'redux/store';
import { setAuthenticatedUser, clearAuthenticatedUser } from 'redux/authSlice';

const BASE_URL = 'https://connections-api.herokuapp.com';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const authenticateUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/current`);
    const user = response.data;
    store.dispatch(
      setAuthenticatedUser({ user, token: localStorage.getItem('token') })
    );
  } catch (error) {
    console.error('Authentication Error:', error.message);
    store.dispatch(clearAuthenticatedUser());
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
    });

    const { token } = response.data;
    setAuthToken(token);

    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    const { token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);

    store.dispatch(setAuthenticatedUser({ user: response.data.user, token }));
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    setAuthToken(null);
    localStorage.removeItem('token');
    store.dispatch(clearAuthenticatedUser());
    return { message: 'Logout successful' };
  } catch (error) {
    console.error('Logout Error:', error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/current`);

    return response.data;
  } catch (error) {
    console.error('Get Current User Error:', error.message);
    throw error;
  }
};

export const getUserContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contacts`);

    return response.data;
  } catch (error) {
    console.error('Get User Contacts Error:', error.message);
    throw error;
  }
};

export const postContact = async contact => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);

    return response.data;
  } catch (error) {
    console.error('Post Contact Error:', error.message);
    throw error;
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await axios.delete(`${BASE_URL}/contacts/${contactId}`);

    return response.data;
  } catch (error) {
    console.error('Delete Contact Error:', error.message);
    throw error;
  }
};

export const patchContact = async (contactId, updatedData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/contacts/${contactId}`,
      updatedData
    );

    return response.data;
  } catch (error) {
    console.error('Patch Contact Error:', error.message);
    throw error;
  }
};
