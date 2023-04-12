import React, { useEffect, useState } from "react";
import { getAllMessages } from "../features/allMessages/allMessagesSlice";
import { openChat, openChatDiv } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { checkConnection } from "./functions";

function SingleConversation({
  receiver,
  conversation,

  setReceiver,
  connectionUsers,
}) {
  const [isUserConnected, setConnectedUser] = useState();
  useEffect(() => {
    if (receiver) {
      checkConnection(
        receiver.phone,
        connectionUsers.current,
        setConnectedUser
      );
    }
  }, []);
  const dispatch = useDispatch();
  return (
    <div
      className='chat'
      onClick={() => {
        localStorage.setItem(
          "Mega-Chat-ConversationId",
          JSON.stringify(conversation._id)
        );
        setReceiver(receiver);
        dispatch(openChatDiv());
        dispatch(getAllMessages());
        dispatch(openChat());
      }}
    >
      <div className='img-container'>
        <img src={receiver?.profilePicture} alt='' />
        {isUserConnected && <div className='online-status'></div>}
      </div>

      <div>
        <h4>{receiver?.name || receiver?.phone}</h4>

        <p>{receiver?.bio || "...."}</p>
      </div>
    </div>
  );
}

export default SingleConversation;
