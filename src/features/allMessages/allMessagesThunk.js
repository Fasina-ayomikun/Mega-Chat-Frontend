import { customUrl } from "../../utils/customUrl";
import { getAllContacts } from "../allContact/allContactSlice";

const getAllMessagesThunk = async (_, thunkAPI) => {
  try {
    const conversationId = JSON.parse(
      localStorage.getItem("Mega-Chat-ConversationId")
    );
    const resp = await customUrl.get(`/messages/${conversationId}`);

    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export { getAllMessagesThunk };
