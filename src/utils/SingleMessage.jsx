import React, { useRef, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessages, setEditState } from "../features/message/messageSlice";
import { toggle } from "./toggle";
import moment from "moment";
function SingleMessage({ receiver, message }) {
  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();
  const { messages } = useSelector((s) => s.allMessages);
  const messagesRef = useRef();
  const id = JSON.parse(localStorage.getItem("Mega-Chat-ConversationId"));
  const { phone: userPhone } = JSON.parse(
    localStorage.getItem("Mega-Chat-User-Info")
  );
  const { _id, text, senderId, createdAt } = message;
  useEffect(() => {
    messagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <li
      ref={messagesRef}
      className={`${
        senderId === userPhone ? "conversation send" : "conversation receive"
      }`}
    >
      <div>
        <p>{text}</p>
        <small>{moment(createdAt).format("hh:mm A")}</small>
        <BiChevronDown
          onClick={() => {
            toggle(_id, messageId, setMessageId);
            setTimeout(() => {
              setMessageId(null);
            }, [3000]);
          }}
          className='arrow-down'
        />
      </div>
      <h5>{senderId === userPhone ? "You" : receiver.name}</h5>
      {_id === messageId && (
        <ul
          className='toggle-details'
          onClick={() => {
            setMessageId(null);
          }}
        >
          <li onClick={() => dispatch(setEditState({ text, editId: _id }))}>
            Edit message
          </li>
          <li
            onClick={() =>
              dispatch(deleteMessages({ messageId: _id, conversationId: id }))
            }
          >
            Delete message
          </li>
        </ul>
      )}
    </li>
  );
}

export default SingleMessage;
