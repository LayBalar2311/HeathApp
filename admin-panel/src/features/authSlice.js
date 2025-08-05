import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    users: [],
    error: null,
  },
  reducers: {
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure(state, action) {
      state.error = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const { registerSuccess, loginSuccess, registerFailure, setUsers, deleteUser } = authSlice.actions;
export default authSlice.reducer;