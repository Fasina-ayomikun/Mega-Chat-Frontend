import { customUrl } from "../../utils/customUrl";

const getAllConversationsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/conversation/${userId}`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export { getAllConversationsThunk };
