import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContactSuccess(state, action) {
      state.contacts.push(action.payload);
    },
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setContacts(state, action) {
      state.contacts = action.payload;
    },
  },
});

export const { addContact, deleteContact, setContacts, addContactSuccess } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;