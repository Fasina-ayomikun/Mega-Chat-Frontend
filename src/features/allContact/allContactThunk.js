import { customUrl } from "../../utils/customUrl";

const getAllContactsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customUrl(`/contacts/${userId}`);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export { getAllContactsThunk };
