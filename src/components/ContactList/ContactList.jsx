import React, { useEffect } from 'react';
import { selectContacts } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContacts } from '../../redux/thunks';
import './contactlist.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => selectContacts(state));
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async contactId => {
    await dispatch(deleteContact(contactId));
    await dispatch(getContacts());
  };

  const renderContacts = () =>
    filteredContacts.map(contact => (
      <li key={contact.id} className="contactlist-contact">
        {contact.name}: {contact.number}
        <button
          type="button"
          className="contactlist-btn"
          onClick={() => handleDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ));

  return (
    <div>
      <h2>Contacts</h2>
      <ol>{renderContacts()}</ol>
    </div>
  );
};

export default ContactList;
