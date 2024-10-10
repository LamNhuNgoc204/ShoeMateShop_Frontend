import {createSlice} from '@reduxjs/toolkit';
import {login, registerUser} from '../thunks/UserThunks';

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  token: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  //   reducers: {
  //     logout: state => {
  //       state.user = {};
  //     },
  //   },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(
          '----------------------- fulfilled rejected  --------------------------',
        );
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(
          '----------------------- login rejected  --------------------------',
        );

        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {logout} = UserSlice.actions;
export default UserSlice.reducer;
