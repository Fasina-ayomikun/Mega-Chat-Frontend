import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createContactThunk,
  deleteContactThunk,
  editContactThunk,
} from "./contactThunk";
import { toast } from "react-toastify";
const initialState = {
  user: "",
  name: "",
  phone: "",
  profilePicture: "",
  bio: "",
  editId: "",
  isLoading: false,
};
export const createContact = createAsyncThunk(
  "contact/createContact",
  createContactThunk
);
export const editContact = createAsyncThunk(
  "contact/editContact",
  editContactThunk
);
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  deleteContactThunk
);
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      const { _id } = JSON.parse(localStorage.getItem("Mega-Chat-User-Info"));
      return { ...state, [name]: value, user: _id };
    },
    setEditState: (state, { payload }) => {
      const { name, phone } = payload;
      localStorage.setItem(
        "Mega-Chat-Contact-Editing",
        JSON.stringify({ isEditing: true, name, phone })
      );
    },
    setAddState: (state, { payload }) => {
      state.phone = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...state, ...payload.contact, isLoading: false };
      })
      .addCase(createContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
        state.isEditing = true;
      })
      .addCase(editContact.fulfilled, (state, { payload }) => {
        localStorage.removeItem("Mega-Chat-Contact-Editing");

        toast.success(payload.msg);
        return { ...state, isLoading: false };
      })
      .addCase(editContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isEditing = true;
        toast.error(payload.msg);
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return { ...state, isLoading: false };
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.msg);
      });
  },
});

export const { handleChange, setAddState, setEditState } = contactSlice.actions;
export default contactSlice.reducer;
