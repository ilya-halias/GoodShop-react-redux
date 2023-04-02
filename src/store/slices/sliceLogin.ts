import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginData } from "../api";
import { useNavigate } from "react-router-dom";

const SLICE_NAME = "user";
export const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (credentials: { login: string; password: string }) => {
    const response = await loginData(credentials);

    const user = { login: response.login, token: response.token };
    localStorage.setItem("user", JSON.stringify(user));

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
  login: res.login,
  token: res.token,
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log("act", action.payload);
      state.isAuth = true;
      console.log(state.isAuth, "is");
      state.token = action.payload.token;
      console.log(action.payload.token, "token");
      state.login = action.payload.login;
      console.log(action.payload.login, "login");
    });
  },
});
