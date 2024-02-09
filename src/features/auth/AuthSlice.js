import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut } from "./AuthAPI";
import { updateUser } from "../user/userApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (logInInfo) => {
    const response = await checkUser(logInInfo);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async (userId) => {
  const response = await signOut(userId);
  return response.data;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // createUser
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      // updateUserAsync
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      // checkUser
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      // signOutAsync
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
