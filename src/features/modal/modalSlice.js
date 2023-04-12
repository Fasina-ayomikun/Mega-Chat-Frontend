import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isChatModalOpen: false,
  isChatActive: false,
  isChatOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openChatModal: (state) => {
      state.isChatModalOpen = !state.isChatModalOpen;
    },
    closeChatModal: (state) => {
      state.isChatModalOpen = false;
    },
    openChat: (state) => {
      state.isChatActive = !state.isChatActive;
    },
    closeChat: (state) => {
      state.isChatActive = false;
    },
    openChatDiv: (state) => {
      state.isChatOpen = true;
    },
    closeChatDiv: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const {
  openChat,
  closeChat,
  openModal,
  closeModal,
  openChatModal,
  closeChatModal,
  openChatDiv,
  closeChatDiv,
} = modalSlice.actions;
export default modalSlice.reducer;
