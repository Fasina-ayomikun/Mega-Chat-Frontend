import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../features/allContact/allContactSlice";

function ContactModalNav({ contacts, setOpen, open }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='contact-modal-top'>
      {open ? (
        <>
          <BsArrowLeft onClick={() => setOpen(false)} />
          <input
            type='text'
            placeholder='Search for a name or number'
            onKeyUp={(e) => dispatch(handleChange(e.target.value))}
          />
        </>
      ) : (
        <>
          <BsArrowLeft onClick={() => navigate("/chats")} />
          <div>
            <h3>Select contact</h3>
            <p>{contacts.length} contacts</p>
          </div>
        </>
      )}
      <AiOutlineSearch onClick={() => setOpen(true)} />
    </div>
  );
}

export default ContactModalNav;
