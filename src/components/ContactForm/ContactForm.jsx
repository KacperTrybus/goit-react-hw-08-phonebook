import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  setContacts
} from '../../redux/contactsSlice';
import { getContacts } from 'api';

const ContactForm = () => {
  const token = useSelector(state => state.auth.user.token);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const contact = {
      name,
      number,
    };

    dispatch(addContact(contact));

    try {
      const contacts = await getContacts(token);
      dispatch(setContacts(contacts));
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }

    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className="phonebook-menu" onSubmit={handleSubmit}>
        <label className="phonebook-label">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleNameChange}
        />
        <label className="phonebook-label">Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleNumberChange}
        />
        <button type="submit" className="phonebook-btn">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
