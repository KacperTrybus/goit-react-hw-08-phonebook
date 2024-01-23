import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;

export default authSlice.reducer;
