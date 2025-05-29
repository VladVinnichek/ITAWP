import React, { useState } from 'react';
import CommentForm from './components/Comments/CommentForm';
import CommentList from './components/Comments/CommentList';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const editComment = (id, newMessage) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, message: newMessage, updatedAt: new Date().toISOString() } 
        : comment
    ));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="App">
      <h1>Система комментариев</h1>
      <div className="comments-container">
        <CommentForm onAddComment={addComment} />
        <CommentList 
          comments={comments} 
          onEditComment={editComment} 
          onDeleteComment={deleteComment} 
        />
      </div>
    </div>
  );
}

export default App;