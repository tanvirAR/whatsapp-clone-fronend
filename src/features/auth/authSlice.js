import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  userAvatar: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      localStorage.clear(); /* if any */
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
    updateUserName: (state, action) => {
      state.user = { ...state.user, username: action.payload };
    },
    updateUserStatus: (state, action) => {
      state.user = { ...state.user, status: action.payload };
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setUserAvatar,
  updateUserName,
  updateUserStatus,
} = authSlice.actions;
export default authSlice.reducer;
