import React, { useState } from 'react';
import './styles.css';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gender: 'male'
  });

  const [errors, setErrors] = useState({});
  const [submittedContacts, setSubmittedContacts] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newContact = { ...formData, id: Date.now() };
      onAddContact(newContact);
      setSubmittedContacts([...submittedContacts, newContact]);
      setFormData({
        name: '',
        email: '',
        message: '',
        gender: 'male'
      });
      setErrors({});
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Форма обратной связи</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Пол:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Женский
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Сообщение:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default ContactForm;