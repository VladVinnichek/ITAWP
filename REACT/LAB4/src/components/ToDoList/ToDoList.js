import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoItems from './ToDoItems';
import './styles.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSubmit = () => {
    let filteredTasks = tasks;
    if (filter === 'completed') {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === 'active') {
      filteredTasks = tasks.filter((task) => !task.completed);
    }
    setDisplayedTasks(filteredTasks);
  };

  return (
    <div className="todo-list">
      <h2>ToDo List</h2>
      <ToDoForm onAddTask={addTask} />
      <div className="filter-controls">
        <label>
          <input
            type="radio"
            name="filter"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          Все
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Выполненные
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            checked={filter === 'active'}
            onChange={() => setFilter('active')}
          />
          Активные
        </label>
      </div>
      <ToDoItems
        tasks={displayedTasks}
        onToggleTask={toggleTask}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ToDoList;