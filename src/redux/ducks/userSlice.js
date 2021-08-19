import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    username: "demoa@live.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const userData = action.payload;
      return { ...state, ...userData };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
