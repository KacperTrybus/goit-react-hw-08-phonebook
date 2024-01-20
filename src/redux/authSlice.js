import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setAuthenticatedUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    clearAuthenticatedUser(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuthenticatedUser, clearAuthenticatedUser } =
  authSlice.actions;
export default authSlice.reducer;
