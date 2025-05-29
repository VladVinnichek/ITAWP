import React from 'react';
import './styles.css';

const ToDoItems = ({ tasks, onToggleTask, onSubmit }) => {
  return (
    <div className="todo-items">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default ToDoItems;