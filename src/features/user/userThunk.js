import { customUrl } from "../../utils/customUrl";

const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customUrl.post("/user/register", user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const getSingleUserThunk = async (phone, thunkAPI) => {
  try {
    const resp = await customUrl(`/user/${phone}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export { registerUserThunk, getSingleUserThunk };
