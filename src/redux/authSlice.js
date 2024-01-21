import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from 'api';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const clearUserData = () => dispatch => {
  dispatch(logoutSuccess());
};

export const logoutUserAsync = () => async dispatch => {
  try {
    await logoutUser();

    dispatch(logoutSuccess());
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};
