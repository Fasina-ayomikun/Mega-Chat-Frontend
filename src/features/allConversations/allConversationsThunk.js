import { customUrl } from "../../utils/customUrl";

const getAllConversationsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/conversation/${userId}`);

    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export { getAllConversationsThunk };
