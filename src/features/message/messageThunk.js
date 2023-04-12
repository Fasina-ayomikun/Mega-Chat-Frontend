import { customUrl } from "../../utils/customUrl";
import { getAllMessages } from "../allMessages/allMessagesSlice";

const createMessagesThunk = async (messages, thunkAPI) => {
  try {
    const resp = await customUrl.post("/messages", messages);
    thunkAPI.dispatch(getAllMessages());
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
const editMessagesThunk = async (message, thunkAPI) => {
  try {
    const { editId, conversationId, text, senderId } = message;
    const resp = await customUrl.patch(`/messages/${editId}`, {
      conversationId,
      senderId,
      text,
    });
    thunkAPI.dispatch(getAllMessages());
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
const deleteMessagesThunk = async ({ messageId, conversationId }, thunkAPI) => {
  try {
    const resp = await customUrl.delete(`/messages/${messageId}`);
    thunkAPI.dispatch(getAllMessages(conversationId));
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
const clearMessagesThunk = async (conversationId, thunkAPI) => {
  try {
    const resp = await customUrl.delete(`/messages/clear/${conversationId}`);
    thunkAPI.dispatch(getAllMessages(conversationId));
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export {
  createMessagesThunk,
  editMessagesThunk,
  deleteMessagesThunk,
  clearMessagesThunk,
};