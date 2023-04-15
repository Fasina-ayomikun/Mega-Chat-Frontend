import { customUrl } from "../../utils/customUrl";
import { getAllContacts } from "../allContact/allContactSlice";
import { getAllConversations } from "../allConversations/allConversationsSlice";
import { clearMessages } from "../message/messageSlice";

const createConversationThunk = async (conversation, thunkAPI) => {
  try {
    const resp = await customUrl.post("/conversation", conversation);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const deleteConversationThunk = async (conversationId, thunkAPI) => {
  try {
    const { phone, _id } = JSON.parse(
      localStorage.getItem("Mega-Chat-User-Info")
    );
    const resp = await customUrl.delete(`/conversation/${conversationId}`);
    thunkAPI.dispatch(getAllConversations(phone));
    thunkAPI.dispatch(getAllContacts(_id));
    thunkAPI.dispatch(clearMessages(conversationId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export { createConversationThunk, deleteConversationThunk };
