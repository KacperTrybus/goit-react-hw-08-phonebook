import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import authReducer from './authSlice';

const rootReducer = {
  contacts: contactsReducer,
  filter: filterReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
