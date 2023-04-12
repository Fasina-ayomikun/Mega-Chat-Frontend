import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadImageThunk } from "./fileThunk";
import { toast } from "react-toastify";
const initialState = { image: "", isLoading: false };
export const uploadImage = createAsyncThunk("image/upload", uploadImageThunk);

const fileSlice = createSlice({
  initialState,
  name: "file",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.image = payload.image;
        toast.success(payload.msg);
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      });
  },
});
export default fileSlice.reducer;
