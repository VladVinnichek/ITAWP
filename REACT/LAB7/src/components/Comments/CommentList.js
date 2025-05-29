import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, onEditComment, onDeleteComment }) => {
  return (
    <div className="comment-list">
      <h3>Комментарии ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>Пока нет комментариев</p>
      ) : (
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={(id, newMessage) => onEditComment(id, newMessage)}
            onDelete={onDeleteComment}
            onViewInfo={(comment) => console.log(comment)}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;