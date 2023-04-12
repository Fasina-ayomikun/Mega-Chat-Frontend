import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createConversationThunk,
  deleteConversationThunk,
} from "./conversationThunk";
import { toast } from "react-toastify";
const initialState = {
  senderId: "",
  receiverId: "",
  isLoading: false,
};
export const createConversation = createAsyncThunk(
  "conversation/createConversation",
  createConversationThunk
);
export const deleteConversation = createAsyncThunk(
  "conversation/deleteConversation",
  deleteConversationThunk
);
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { _id } = JSON.parse(localStorage.getItem("Mega-Chat-User-Info"));
      return { ...state, receiverId: payload, senderId: _id };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...state, isLoading: false };
      })
      .addCase(createConversation.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      .addCase(deleteConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteConversation.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...state, isLoading: false };
      })
      .addCase(deleteConversation.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      });
  },
});

export const { handleChange } = conversationSlice.actions;
export default conversationSlice.reducer;
