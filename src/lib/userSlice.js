import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }; // Spread the new object into the state
    },
    clearUser: () => {
      return {}; // Clear the user state by returning an empty object
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
