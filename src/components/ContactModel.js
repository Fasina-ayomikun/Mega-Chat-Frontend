import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from "../features/allContact/allContactSlice";
import { getAllConversations } from "../features/allConversations/allConversationsSlice";
import SingleContact from "../utils/SingleContact";
import ContactModalNav from "../utils/ContactModalNav";
import Loading from "../utils/loadings/Loading";
import { getFromLocalStorage } from "../utils/localStorage";

function ContactModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState(null);
  const { isLoading, contacts, filteredContacts } = useSelector(
    (s) => s.allContacts
  );

  const user = getFromLocalStorage();
  useEffect(() => {
    dispatch(getAllContacts(user?._id));
    dispatch(getAllConversations(user?.phone));
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section
      className='contact-modal-section'
      onClick={() => {
        setContactId(null);
      }}
    >
      <div className='contact-modal-container'>
        <ContactModalNav contacts={contacts} setOpen={setOpen} open={open} />
        <div>
          <div className='new-contact' onClick={() => navigate("/new-contact")}>
            <AiOutlineUserAdd />
            <h4>New Contact</h4>
          </div>
          <h5>Contacts on MegaChat</h5>
          <ul className='contacts '>
            {filteredContacts.length < 1 ? (
              <p className='p'>Add new contacts</p>
            ) : (
              filteredContacts.map((contact) => {
                return (
                  <SingleContact
                    contact={contact}
                    key={contact._id}
                    setContactId={setContactId}
                    contactId={contactId}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ContactModel;
