import { customUrl } from "../../utils/customUrl";
const getAllMessagesThunk = async (_, thunkAPI) => {
  try {
    const conversationId = JSON.parse(
      localStorage.getItem("Mega-Chat-ConversationId")
    );
    const resp = await customUrl.get(`/messages/${conversationId}`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export { getAllMessagesThunk };
