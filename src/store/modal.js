import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    type: null,
    data: null,
  },
  reducers: {
    showDialog: (state, action) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    hideDialog: (state, action) => {
      state.type = null;
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showDialog, hideDialog } = counterSlice.actions;

export default counterSlice.reducer;
