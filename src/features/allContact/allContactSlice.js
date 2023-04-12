import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createContactThunk, getAllContactsThunk } from "./allContactThunk";
const initialState = {
  contacts: [],
  filteredContacts: [],
  isLoading: false,
};

export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  getAllContactsThunk
);
const allContactSlice = createSlice({
  name: "allContacts",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      let tempContacts = [...state.contacts];
      if (payload) {
        tempContacts = tempContacts.filter(
          (contact) =>
            contact.name.toLowerCase().startsWith(payload.toLowerCase()) ||
            contact.phone.startsWith(payload)
        );
      }

      return { ...state, filteredContacts: tempContacts };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          contacts: payload.contacts,
          filteredContacts: payload.contacts,
          isLoading: false,
        };
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { handleChange } = allContactSlice.actions;
export default allContactSlice.reducer;
