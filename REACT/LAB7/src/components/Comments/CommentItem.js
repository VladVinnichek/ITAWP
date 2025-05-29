import React, { useState } from 'react';
import CommentInfoModal from './CommentInfoModal';

const CommentItem = ({ 
  comment, 
  onEdit, 
  onDelete,
  onViewInfo 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    message: comment.message,
    secretWord: ''
  });
  const [deleteWord, setDeleteWord] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    if (editData.secretWord === comment.secretWord) {
      onEdit(comment.id, editData.message);
      setIsEditing(false);
    } else {
      alert('Неверное секретное слово!');
    }
  };

  const handleDelete = () => {
    if (deleteWord === comment.secretWord) {
      onDelete(comment.id);
    } else {
      alert('Неверное секретное слово!');
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        {comment.avatar ? (
          <img src={comment.avatar} alt={comment.username} className="avatar" />
        ) : (
          <div className="avatar-placeholder">{comment.username.charAt(0)}</div>
        )}
        <div className="user-info">
          <span className="username">{comment.username}</span>
          {comment.email && <span className="email">{comment.email}</span>}
        </div>
      </div>
      
      {isEditing ? (
        <div className="edit-form">
          <textarea
            name="message"
            value={editData.message}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="secretWord"
            value={editData.secretWord}
            onChange={handleEditChange}
            placeholder="Секретное слово"
          />
          <div className="edit-actions">
            <button onClick={handleEditSubmit}>Сохранить</button>
            <button onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
          <p>{comment.message}</p>
        </div>
      )}
      
      <div className="comment-actions">
        <button onClick={() => setIsEditing(true)}>Редактировать</button>
        <button onClick={() => setShowInfoModal(true)}>Информация</button>
        <div className="delete-action">
          <input
            type="text"
            value={deleteWord}
            onChange={(e) => setDeleteWord(e.target.value)}
            placeholder="Секретное слово"
          />
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>

      {showInfoModal && (
        <CommentInfoModal 
          comment={comment} 
          onClose={() => setShowInfoModal(false)} 
        />
      )}
    </div>
  );
};

export default CommentItem;