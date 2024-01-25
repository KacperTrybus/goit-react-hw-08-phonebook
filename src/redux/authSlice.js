import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isLoaded: false,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoaded = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoaded = true;
    },
    logout: state => {
      state.token = null;
      state.user = null;
      state.isLoaded = true;
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;

export default authSlice.reducer;
