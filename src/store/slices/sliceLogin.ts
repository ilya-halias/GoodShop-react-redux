import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPostData } from "../api";
import { useNavigate } from "react-router-dom";

const SLICE_NAME = "user";
export const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (credentials: { login: string; password: string }) => {
    const response = await loginPostData(credentials);

    // const user = { login: response.login, token: response.token };
    localStorage.setItem("user", JSON.stringify(response.token));

    return response;
  }
);

export interface LoginStore {
  isAuth: boolean;
  token: string;
  login: string;
}

let res: any = localStorage.getItem("user");

const initialState: LoginStore = {
  isAuth: Boolean(localStorage.getItem("userToken")),
  login: "",
  token: String(localStorage.getItem("user")),
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.login = action.payload.login;
    });
  },
});
