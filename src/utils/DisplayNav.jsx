import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChat,
  closeChatDiv,
  openChatDiv,
  openChatModal,
} from "../features/modal/modalSlice";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setAddState, setEditState } from "../features/contact/contactSlice";
import { clearMessages } from "../features/message/messageSlice";
import { deleteConversation } from "../features/conversation/conversationSlice";
import { useNavigate } from "react-router-dom";

function DisplayNav({ isUserConnected, receiver }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChatModalOpen } = useSelector((s) => s.modal);
  const id = JSON.parse(localStorage.getItem("Mega-Chat-ConversationId"));
  return (
    <nav>
      <BsArrowLeft
        className='arrow-back'
        onClick={() => dispatch(closeChat())}
      />
      <div className='img-container'>
        <img src={receiver?.profilePicture} alt='' />

        {isUserConnected && <div className='online-status'></div>}
      </div>
      <div>
        <h3>{receiver?.name || receiver?.phone}</h3>
        <p>{isUserConnected ? "online" : receiver?.bio || "..."}</p>
      </div>
      <BiDotsVerticalRounded
        className={`${isChatModalOpen && "active-toggle-icon"}`}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(openChatModal());
        }}
      />
      {isChatModalOpen && (
        <ul className='toggle-details' onClick={() => dispatch(openChatDiv())}>
          <li
            onClick={() => {
              if (!receiver?._id) {
                dispatch(setAddState(receiver?.phone));
                navigate("/new-contact");
              } else {
                dispatch(
                  setEditState({
                    name: receiver?.name,
                    phone: receiver?.phone,
                  })
                );
                navigate(`/edit-contact/${receiver._id}`);
              }
            }}
          >
            {receiver?._id ? "Edit" : "Add"} contact
          </li>
          <li onClick={() => dispatch(clearMessages(id))}>Clear messages</li>
          <li
            onClick={() => {
              dispatch(deleteConversation(id));
              dispatch(closeChatDiv());
            }}
          >
            Delete chat
          </li>
        </ul>
      )}
    </nav>
  );
}

export default DisplayNav;
