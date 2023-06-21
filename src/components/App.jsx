import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from 'App.module.css';

export class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('Contacts:')) || [
      { id: 'id-1', contact: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', contact: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', contact: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', contact: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContact = (contact, number) => {
    const name = this.state.contacts.map(item => item.contact);
    if (name.includes(contact)) {
      alert(`${contact} is alredy in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            contact,
            id: nanoid(),
            number: number,
          },
        ],
      }));
    }
  };

  componentDidUpdate = () => {
    localStorage.setItem('Contacts:', JSON.stringify(this.state.contacts));
  };

  filtredContacts = () => {
    const { contacts, filter } = this.state;
    const filtredNames = contacts.filter(item =>
      item.contact.toLowerCase().includes(filter.toLowerCase())
    );
    return filtredNames;
  };

  inputFilterChange = e => {
    const value = e.target.value;
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    localStorage.removeItem(id);
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filtredContacts();

    return (
      <div className={css.wrapper}>
        <h1>Phonebooks</h1>
        <ContactForm onSubmit={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.inputFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
