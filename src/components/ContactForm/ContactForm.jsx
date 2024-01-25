import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, getContacts } from '../../redux/thunks';
import './contactform.css';

const ContactForm = () => {
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
    await dispatch(addContact(contact));

    await dispatch(getContacts());

    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 className="contact-form-header">Add your contact</h2>
        <ul className="contact-form-list">
          <li>
            <label className="contact-form-label">
              Name
              <input
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={handleNameChange}
                className="contact-form-input"
              />
            </label>
          </li>

          <li>
            <label className="contact-form-label">
              Number
              <input
                type="tel"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                onChange={handleNumberChange}
                className="contact-form-input"
              />
            </label>
          </li>
          <button type="submit" className="contact-form-btn">
            Add Contact
          </button>
        </ul>
      </form>
    </div>
  );
};

export default ContactForm;
