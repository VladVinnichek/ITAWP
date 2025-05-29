import React, { useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactTable from './components/ContactForm/ContactTable';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <div className="App">
      <h1>Лабораторная работа №5</h1>
      <ContactForm onAddContact={handleAddContact} />
      <ContactTable contacts={contacts} />
    </div>
  );
}

export default App;