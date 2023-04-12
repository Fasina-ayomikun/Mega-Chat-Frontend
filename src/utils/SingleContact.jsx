import React from "react";
import {
  createConversation,
  deleteConversation,
} from "../features/conversation/conversationSlice";
import { deleteContact, setEditState } from "../features/contact/contactSlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toggle } from "./toggle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SingleContact({ contact, setContactId, contactId }) {
  const { name, bio, _id, phone, profilePicture } = contact;
  const { conversations } = useSelector((s) => s.allConversations);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getConversationId = (id) => {
    const conversation = conversations.filter((c) => c.members[1] === id);
    return conversation[0]._id;
  };

  const { phone: userPhone } = JSON.parse(
    localStorage.getItem("Mega-Chat-User-Info")
  );
  return (
    <li className='contact '>
      <img src={profilePicture} alt='' />
      <div>
        <h4>{name}</h4>

        <p>{bio}</p>
      </div>
      <BiDotsVerticalRounded
        onClick={(e) => {
          setContactId(_id);
          toggle(_id, contactId, setContactId);
          e.stopPropagation();
        }}
      />
      {_id === contactId && (
        <ul className='toggle-details'>
          <li
            onClick={() => {
              const conversationId = getConversationId(phone);

              dispatch(deleteContact(_id));
              dispatch(deleteConversation(conversationId));
            }}
          >
            Delete contact
          </li>

          <li
            onClick={() => {
              navigate(`/edit-contact/${contact._id}`);
              dispatch(
                setEditState({
                  name: contact?.name,
                  phone: contact?.phone,
                })
              );
            }}
          >
            Edit contact
          </li>
          <li
            onClick={() => {
              dispatch(
                createConversation({
                  senderId: userPhone,
                  receiverId: phone,
                  receiverPhone: phone,
                })
              );
            }}
          >
            New conversation
          </li>
        </ul>
      )}
    </li>
  );
}

export default SingleContact;
