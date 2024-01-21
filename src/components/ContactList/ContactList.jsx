import React from 'react';

const ContactList = ({ contacts, handleDeleteContact }) => {
  const renderContacts = () =>
    contacts &&
    contacts.map(contact => (
      <li key={contact.id} className="contact">
        {contact.name}: {contact.number}
        <button type="button" onClick={() => handleDeleteContact(contact)}>
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
