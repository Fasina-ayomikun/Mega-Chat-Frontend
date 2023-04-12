import { customUrl } from "../../utils/customUrl";

const uploadImageThunk = async (file, thunkAPI) => {
  try {
    const resp = await customUrl.post("/upload", file);
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response);
  }
};
export { uploadImageThunk };
