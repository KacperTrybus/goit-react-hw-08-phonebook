import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, logout, registerSuccess } from './authSlice';
import { selectAuthToken } from './selectors';
import { setContacts } from './contactsSlice';

const BASE_URL = 'https://connections-api.herokuapp.com';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch }) => {
    try {
      const response = await instance.post('/users/signup', userData);
      const data = response.data;

      if (data.token) {
        console.log(data.token);
        dispatch(registerSuccess({ token: data.token, user: data.user }));
        return data.token;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch }) => {
    try {
      const response = await instance.post('/users/login', userData);
      const data = response.data;
      if (data.token) {
        dispatch(loginSuccess({ token: data.token, user: data.user }));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, getState }) => {
    try {
      const authToken = selectAuthToken(getState());
      await instance.post('/users/logout', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      dispatch(logout());
    } catch (error) {
      throw error;
    }
  }
);

export const getCurrentUserInfo = createAsyncThunk(
  'auth/getCurrentUserInfo',
  async (_, { dispatch, getState }) => {
    try {
      const authToken = selectAuthToken(getState());
      const response = await instance.get('/users/current', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      dispatch(loginSuccess(data));
      console.log(data);
    } catch (error) {
      throw error;
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { getState, dispatch }) => {
    try {
      const authToken = selectAuthToken(getState());
      const response = await instance.get('/contacts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch(setContacts(response.data));
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, { dispatch, getState }) => {
    try {
      const authToken = selectAuthToken(getState());
      console.log(authToken);
      const response = await instance.post('/contacts', contactData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        dispatch(addContact(data));
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { getState }) => {
    try {
      const authToken = selectAuthToken(getState());
      const response = await instance.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      console.log('Response status:', error.response?.status);
      console.log('Response data:', error.response?.data);

      throw error;
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async payload => {
    const { contactId, updatedData } = payload;
    try {
      const response = await instance.put(
        `/contacts/${contactId}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
