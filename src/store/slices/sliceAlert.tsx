import { createSlice } from "@reduxjs/toolkit";


type AlertsTypeData = "success" | "error";
export interface Store {
  data: AlertsTypeData[];
}

const initialState: Store = {
  data: [],
};

export const { reducer, actions } = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlerts(state, action) {
      state.data = [...state.data, action.payload];
    },
  },
});

export const { setAlerts } = actions;
