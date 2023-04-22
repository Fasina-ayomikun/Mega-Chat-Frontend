import React, { useState, useRef, useEffect } from "react";
import "./chats.css";
import DisplayConversationsPage from "../../components/DisplayConversationsPage";
import Sidebar from "../../components/Sidebar";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  closeChatDiv,
  closeChatModal,
  closeModal,
  openChatDiv,
} from "../../features/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/loadings/Loading";
import { getFromLocalStorage } from "../../utils/localStorage";

function ChatsPage() {
  const { isLoading } = useSelector((s) => s.user);
  const [receiver, setReceiver] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChatActive } = useSelector((s) => s.modal);

  const socket = useRef();

  const connectionUsers = useRef(null);
  let user = getFromLocalStorage();
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_LINK, {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "https://mega-chat-frontend.vercel.app",
      },
    });
    if (window.innerWidth < 600) {
      dispatch(openChatDiv());
    }
  }, []);
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    if (user) {
      socket.current.emit("addUser", user?.phone);
      socket.current.on("getUsers", (users) => {
        console.log(users);
        connectionUsers.current = users;
      });
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section
      className={`${
        isChatActive ? "chats-section active-chat" : "chats-section"
      }`}
      onClick={() => {
        dispatch(closeModal());
        dispatch(closeChatModal());
      }}
    >
      <div className='chats-container'>
        <Sidebar connectionUsers={connectionUsers} setReceiver={setReceiver} />
        <DisplayConversationsPage
          connectionUsers={connectionUsers}
          receiver={receiver}
          socket={socket}
        />
        <div
          className='create-container'
          onClick={() => {
            navigate("/contacts");
          }}
        ></div>
      </div>
    </section>
  );
}

export default ChatsPage;
