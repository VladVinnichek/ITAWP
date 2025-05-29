import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    avatar: '',
    message: '',
    secretWord: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.message && formData.secretWord) {
      onAddComment({
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setFormData({
        username: '',
        email: '',
        avatar: '',
        message: '',
        secretWord: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Добавить комментарий</h3>
      <div className="form-group">
        <label>Имя пользователя*</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Ссылка на аватар</label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
      <div className="form-group">
        <label>Сообщение*</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Секретное слово*</label>
        <input
          type="text"
          name="secretWord"
          value={formData.secretWord}
          onChange={handleChange}
          required
          placeholder="Нужно для редактирования/удаления"
        />
      </div>
      <button type="submit" className="submit-btn">Опубликовать</button>
    </form>
  );
};

export default CommentForm;