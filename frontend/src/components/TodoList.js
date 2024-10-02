import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle, onUpdate }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.title} todo={todo} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default TodoList;
