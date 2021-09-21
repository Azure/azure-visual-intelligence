import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: [],
  reducers: {
    getDetail() {},
    setDetail(state, action) {
      return action.payload;
    },
  },
});

export const { getDetail, setDetail } = detailSlice.actions;

export default detailSlice.reducer;
