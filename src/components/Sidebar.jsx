import React, { useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import {
  filterConversation,
  getAllConversations,
} from "../features/allConversations/allConversationsSlice";
import { useNavigate } from "react-router-dom";
import { openModal } from "../features/modal/modalSlice";
import { getAllContacts } from "../features/allContact/allContactSlice";
import SingleConversation from "../utils/SingleConversation";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorage";

function Sidebar({ connectionUsers, setReceiver }) {
  const { filteredConversations } = useSelector((s) => s.allConversations);
  const { contacts } = useSelector((s) => s.allContacts);
  const { isModalOpen } = useSelector((s) => s.modal);

  const dispatch = useDispatch();
  const user = getFromLocalStorage();
  const navigate = useNavigate();
  const getReceiverInfo = (id, senderId) => {
    if (id) {
      let receiver = contacts.find(
        (contact) => contact.phone === id || contact.phone === senderId
      );
      if (receiver) {
        return receiver;
      } else {
        receiver = { name: "", bio: "", phone: senderId, profilePicture: "" };
      }
      return receiver;
    }
  };
  const handleFilter = (input) => {
    let conversationReceiver = [];
    if (input) {
      conversationReceiver = contacts.filter(
        (c) =>
          c.name.toLowerCase().startsWith(input.toLowerCase()) ||
          c.phone.toLowerCase().startsWith(input.toLowerCase())
      );
    }
    dispatch(filterConversation(conversationReceiver));
  };
  useEffect(() => {
    if (user) {
      dispatch(getAllConversations(user?.phone));
      dispatch(getAllContacts(user?._id));
    }
  }, []);

  return (
    <section className='sidebar-section'>
      <div className='sidebar-container'>
        <div className='sidebar-top'>
          <img src={user?.profilePicture} alt='User' />
          <ul className='sidebar-top-icons'>
            {isModalOpen && (
              <ul
                className='toggle-details'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <li onClick={() => navigate("/contacts")}>New conversation</li>
                <li onClick={() => navigate("/new-contact")}>New contact</li>
                <li
                  onClick={() => {
                    removeFromLocalStorage();
                    navigate("/");
                  }}
                >
                  Logout
                </li>
              </ul>
            )}
            <li
              className={`${
                isModalOpen
                  ? "sidebar-top-icon active-toggle-icon"
                  : "sidebar-top-icon "
              }`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openModal());
              }}
            >
              <BiDotsVerticalRounded />
            </li>
          </ul>
        </div>
        <input
          type='text'
          placeholder='Search for a name or number'
          onKeyUp={(e) => handleFilter(e.target.value)}
        />
        <div className='chats'>
          {filteredConversations.length < 1 ? (
            <p className='p'>Start a conversation</p>
          ) : (
            filteredConversations?.map((conversation) => {
              const receiver = getReceiverInfo(
                conversation.members[1],
                conversation.members[0]
              );
              return (
                <SingleConversation
                  key={conversation._id}
                  receiver={receiver}
                  connectionUsers={connectionUsers}
                  setReceiver={setReceiver}
                  conversation={conversation}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
