import { customUrl } from "../../utils/customUrl";

const uploadImageThunk = async (file, thunkAPI) => {
  try {
    const resp = await customUrl.post("/upload", file);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export { uploadImageThunk };
