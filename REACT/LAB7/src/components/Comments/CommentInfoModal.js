import React from 'react';

const CommentInfoModal = ({ comment, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="info-modal">
        <h3>Информация о комментарии</h3>
        <div className="info-row">
          <span className="info-label">Имя пользователя:</span>
          <span>{comment.username}</span>
        </div>
        {comment.email && (
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span>{comment.email}</span>
          </div>
        )}
        <div className="info-row">
          <span className="info-label">Дата создания:</span>
          <span>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Последнее изменение:</span>
          <span>{new Date(comment.updatedAt).toLocaleString()}</span>
        </div>
        <button onClick={onClose} className="close-btn">Закрыть</button>
      </div>
    </div>
  );
};

export default CommentInfoModal;