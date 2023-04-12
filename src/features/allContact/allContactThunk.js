import { customUrl } from "../../utils/customUrl";

const getAllContactsThunk = async (userId, thunkAPI) => {
  try {
    const resp = await customUrl(`/contacts/${userId}`);

    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};

export { getAllContactsThunk };
