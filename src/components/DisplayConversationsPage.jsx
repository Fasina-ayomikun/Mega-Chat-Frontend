import React, { useState, useRef, useEffect } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { io } from "socket.io-client";
import {} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { createMessages, editMessages } from "../features/message/messageSlice";
import { getAllMessages } from "../features/allMessages/allMessagesSlice";
import DisplayNav from "../utils/DisplayNav";
import SingleMessage from "../utils/SingleMessage";
import SmallLoading from "../utils/loadings/SmallLoading";
import { getFromLocalStorage } from "../utils/localStorage";
import { checkConnection } from "../utils/functions";
function DisplayConversationsPage({ socket, receiver, connectionUsers }) {
  const [isUserConnected, setConnectedUser] = useState([]);

  const [text, setText] = useState("");
  const { messages } = useSelector((s) => s.allMessages);
  const { isChatOpen } = useSelector((s) => s.modal);
  const {
    isEditing,
    editId,
    text: editText,
    isLoading,
  } = useSelector((s) => s.messages);
  const id = JSON.parse(localStorage.getItem("Mega-Chat-ConversationId"));
  const user = getFromLocalStorage();
  const inputRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMessages());
    socket.current = io(process.env.REACT_APP_SOCKET_LINK, {
      withCredentials: true,
    });
//     socket.current.on("getMessage", (data) => {
//       console.log(data);
//       dispatch(getAllMessages());
// //       if (data.senderId !== user?.phone) {
// //         dispatch(
// //           createMessages({
// //             conversationId: id,
// //             senderId: data.senderId,
// //             text: data.text,
// //           })
// //         );
// //       }
//     });
  }, []);
 useEffect(() => {
    
    socket.current.on("getMessage", (data) => {
      console.log(data);
      dispatch(getAllMessages());
    });
  }, [messages]);
  useEffect(() => {
    if (connectionUsers.current) {
      checkConnection(
        receiver.phone,
        connectionUsers.current,
        setConnectedUser
      );
    }
  }, [connectionUsers, receiver]);
  useEffect(() => {
    if (isEditing) {
      inputRef.current.value = editText;
    }
  }, [isEditing]);

  if (!isChatOpen) {
    return (
      <section className='display-section'>
        <h1>Click on a Chat to start a Conversation</h1>
      </section>
    );
  }

  return (
    <section className='display-section'>
      <div className='display-container'>
        <DisplayNav isUserConnected={isUserConnected} receiver={receiver} />
        <ul className='conversations'>
          {messages.map((message) => {
            return (
              <SingleMessage
                key={message._id}
                receiver={receiver}
                message={message}
              />
            );
          })}
        </ul>

        <form className='message-input-container'>
          <input
            type='text'
            ref={inputRef}
            readOnly={isLoading ? true : false}
            placeholder='Type a message'
            onKeyUp={(e) => setText(e.target.value)}
          />
          {isLoading ? (
            <SmallLoading />
          ) : (
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={() => {
                if (text) {
                  if (isEditing) {
                    dispatch(
                      editMessages({
                        conversationId: id,
                        senderId: user?.phone,
                        text: text || editText,
                        editId,
                      })
                    );
                    inputRef.current.value = "";
                    setText("");
                  } else {
                    dispatch(
                      createMessages({
                        conversationId: id,
                        senderId: user?.phone,
                        text,
                      })
                    );

                    inputRef.current.value = "";
                    setText("");
                  }
                  socket.current.emit("sendMessage", {
                    senderId: user?.phone,
                    receiverId: receiver.phone,
                    text,
                  });
                }
                inputRef.current.value = "";
                setText("");
              }}
            />
          )}
        </form>
      </div>
    </section>
  );
}

export default DisplayConversationsPage;
