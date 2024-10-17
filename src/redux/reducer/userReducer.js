import {createSlice} from '@reduxjs/toolkit';
import {login, loginWithGG, register} from '../thunks/UserThunks';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  token: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
    },
  },
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
      })
      .addCase(loginWithGG.pending, (state, action) => {
        console.log('login with gg........');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGG.fulfilled, (state, action) => {
        console.log('login with gg: successful!');
        state.isLoading = false;
        console.log('user: ', action.payload);
        state.user = action.payload;
      })
      .addCase(loginWithGG.rejected, (state, action) => {
        console.log('login with gg: failure!');
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = UserSlice.actions;
export default UserSlice.reducer;
