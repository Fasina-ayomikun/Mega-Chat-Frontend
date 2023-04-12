import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import contactReducer from "./features/contact/contactSlice";
import modalReducer from "./features/modal/modalSlice";
import allContactReducer from "./features/allContact/allContactSlice";
import conversationReducer from "./features/conversation/conversationSlice";
import allConversationsReducer from "./features/allConversations/allConversationsSlice";
import allMessagesReducer from "./features/allMessages/allMessagesSlice";
import messageReducer from "./features/message/messageSlice";
import fileReducer from "./features/files/fileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    allContacts: allContactReducer,
    allConversations: allConversationsReducer,
    modal: modalReducer,
    file: fileReducer,
    conversation: conversationReducer,
    allMessages: allMessagesReducer,
    messages: messageReducer,
  },
});
