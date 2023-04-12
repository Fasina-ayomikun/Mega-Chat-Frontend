import React from "react";
import "../pages/login/login.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createContact,
  editContact,
  handleChange,
} from "../features/contact/contactSlice";
import Loading from "../utils/loadings/Loading";
function NewContactModal() {
  const navigate = useNavigate();
  const { name, phone, user, isLoading } = useSelector((s) => s.contact);
  const dispatch = useDispatch();
  const { id: editId } = useParams();
  const editingInfo = JSON.parse(
    localStorage.getItem("Mega-Chat-Contact-Editing")
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingInfo?.isEditing) {
      dispatch(editContact({ editId, name, phone: editingInfo?.phone, user }));
    } else {
      dispatch(createContact({ name, phone, user }));
    }
  };
  const handleKeyUp = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className='login-section'>
      <div className='login-container'>
        <h1 className='h1-m'>
          {editingInfo?.isEditing ? "Edit" : "New"} Contact
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name' className='label'>
            Name:
          </label>
          <input
            onKeyUp={(e) => handleKeyUp(e.target)}
            type='text'
            id='name'
            name='name'
            className='input'
            placeholder='John Doe'
            autoComplete='off'
            minLength='2'
            required
            defaultValue={editingInfo?.name}
            pattern='^[آ-یA-z]{2,}( [آ-یA-z]{2,})+([آ-یA-z]|[ ]?)$'
          />
          <label htmlFor='phone-no' className='label'>
            Phone Number:
          </label>
          <input
            onKeyUp={(e) => handleKeyUp(e.target)}
            type='text'
            id='phone-no'
            className='input'
            name='phone'
            placeholder='+2341234123412'
            required
            style={
              editingInfo?.isEditing && {
                cursor: "no-drop",
                color: "var(--grey-1)",
              }
            }
            value={editingInfo?.isEditing && editingInfo?.phone}
            readOnly={editingInfo?.isEditing ? true : false}
          />
          <button type='submit' className='btn'>
            {editingInfo?.isEditing ? "Edit Contact" : "Add to Contact"}
          </button>
        </form>
        <h5 onClick={() => navigate("/chats")} className='resend-btn'>
          Back to Chats
        </h5>
      </div>
    </section>
  );
}

export default NewContactModal;
