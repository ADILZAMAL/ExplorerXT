import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("app/fetchData", async () => {
  const response = await localStorage.getItem("exploreXT");
  return JSON.parse(response);
});

export const addFileOrFolder = createAsyncThunk(
  "app/addFileOrFolder",
  async ({ type, label, parentId }) => {
    const newEntity = {};
    newEntity.parentId = parentId;
    newEntity.label = label;
    newEntity.open = false;
    newEntity.id = nanoid();

    if (type === "folder") {
      newEntity.type = "folder";
    } else {
      newEntity.type = "file";
      newEntity.content = "";
    }

    const entities =
      (await JSON.parse(localStorage.getItem("exploreXT"))) || {};
    entities[newEntity.id] = newEntity;
    await localStorage.setItem("exploreXT", JSON.stringify(entities));
    return entities;
  }
);

export const saveContent = createAsyncThunk(
  "app/saveContent",
  async ({ id, content }) => {
    let entities = await JSON.parse(localStorage.getItem("exploreXT"));
    entities[id].content = content;
    await localStorage.setItem("exploreXT", JSON.stringify(entities));
    return entities;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.entities = payload;
    },
    [addFileOrFolder.fulfilled]: (state, { payload }) => {
      state.entities = payload;
    },
    [saveContent.fulfilled]: (state, { payload }) => {
      state.entities = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export default appSlice.reducer;
