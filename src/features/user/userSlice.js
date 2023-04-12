import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleUserThunk, registerUserThunk } from "./userThunk";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  phone: "",
  profilePicture: "",
  bio: "",
  isLoading: false,
  userExist: false,
  users: [],
};
export const registerUser = createAsyncThunk(
  "auth/register",
  registerUserThunk
);
export const getSingleUser = createAsyncThunk("auth/user", getSingleUserThunk);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setPhoneNumber: (state, { payload }) => {
      state.phone = payload;
      localStorage.setItem("Mega-Chat-PhoneNumber", JSON.stringify(payload));
    },
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      const phone = JSON.parse(localStorage.getItem("Mega-Chat-PhoneNumber"));
      return { ...state, [name]: value, phone };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        localStorage.setItem(
          "Mega-Chat-User-Info",
          JSON.stringify(payload.user)
        );
        toast.success(payload.msg);
        return { ...state, ...payload.user, isLoading: false };
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      .addCase(getSingleUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, { payload }) => {
        localStorage.setItem(
          "Mega-Chat-User-Info",
          JSON.stringify(payload.user)
        );
        return {
          ...state,
          userExist: payload.user ? true : false,
          isLoading: false,
        };
      })
      .addCase(getSingleUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setPhoneNumber, handleChange } = userSlice.actions;
export default userSlice.reducer;
