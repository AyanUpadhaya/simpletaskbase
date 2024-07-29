import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.auth = { ...state.auth, ...action?.payload };
      localStorage.setItem("tasksBaseAuth", JSON.stringify(state.auth));
    },
    logOutUser: (state) => {
      state.auth = {};
      localStorage.removeItem("tasksBaseAuth");
    },
  },
});

export const { saveAuthData, logOutUser } = authSlice.actions;
export default authSlice.reducer;
