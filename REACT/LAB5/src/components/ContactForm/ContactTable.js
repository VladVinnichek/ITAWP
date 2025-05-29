import React from 'react';
import './styles.css';

const ContactTable = ({ contacts }) => {
  if (contacts.length === 0) {
    return null;
  }

  return (
    <div className="contact-table-container">
      <h2>Отправленные контакты</h2>
      <table className="contact-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Пол</th>
            <th>Сообщение</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.gender === 'male' ? 'Мужской' : 'Женский'}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;