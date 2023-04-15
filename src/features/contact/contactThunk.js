import { customUrl } from "../../utils/customUrl";
import { getFromLocalStorage } from "../../utils/localStorage";
import { getAllContacts } from "../allContact/allContactSlice";
import { getAllConversations } from "../allConversations/allConversationsSlice";

const createContactThunk = async (contact, thunkAPI) => {
  try {
    const resp = await customUrl.post("/contacts", contact);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const editContactThunk = async (contact, thunkAPI) => {
  try {
    const { editId, name, phone, user } = contact;
    const resp = await customUrl.patch(`/contacts/${editId}`, {
      name,
      phone,
      user,
    });
    thunkAPI.dispatch(getAllContacts(user?._id));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const deleteContactThunk = async (contactId, thunkAPI) => {
  try {
    let user = getFromLocalStorage();

    const resp = await customUrl.delete(`/contacts/${contactId}`);
    thunkAPI.dispatch(getAllContacts(user?._id));
    thunkAPI.dispatch(getAllConversations(user?._id));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export { createContactThunk, editContactThunk, deleteContactThunk };
