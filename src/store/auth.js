import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isPassword: false,
    password: "",
    activeFolderId: null,
  },
  reducers: {
    setActiveFolderId: (state, action) => {
      state.activeFolderId = action.payload;
    },
  },
  extraReducers: {},
});

export const { setActiveFolderId } = authSlice.actions;

export default authSlice.reducer;
