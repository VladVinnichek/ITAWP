import React, { useState } from 'react';
import './EmailForm.css';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsValid(true);
      setMessage('Форма успешно отправлена!');
    } else {
      setIsValid(false);
      setMessage('Пожалуйста, введите корректный email адрес');
    }
  };

  return (
    <div className="email-form">
      <h2>Форма отправки email</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
          />
        </label>
        <button type="submit">Отправить</button>
      </form>
      {message && (
        <p className={isValid ? 'success' : 'error'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailForm;