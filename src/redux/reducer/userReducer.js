import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../thunks/UserThunks';

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  token: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled');
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login rejected');
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register fulfilled');
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        console.log('Register rejected');
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export actions as needed, e.g., logout action
// export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
