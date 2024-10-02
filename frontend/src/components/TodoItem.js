import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleUpdate = () => {
    onUpdate(todo.title, newTitle, newDescription, todo.completed);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col space-y-2 py-3 px-4 bg-gray-50 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-100">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-1 rounded"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
        ) : (
          <span
            onClick={() => onToggle(todo.title, !todo.completed)}
            className={`cursor-pointer text-lg font-semibold text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            } transition-all duration-300`}
          >
            {todo.title}
          </span>
        )}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.title, !todo.completed)}
            className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500"
          />
          {isEditing ? (
            <button onClick={handleUpdate} className="text-green-500 hover:text-green-700 transition duration-200">
              Save
            </button>
          ) : (
            <FaEdit
              className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200"
              onClick={() => setIsEditing(true)}
            />
          )}
          <FaTrashAlt
            className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
            onClick={() => onDelete(todo.title)}
          />
        </div>
      </div>
      <p className="text-gray-600 text-sm">{todo.description}</p>
      <p className="text-gray-400 text-xs">Created: {new Date(todo.createdAt).toLocaleString()}</p>
    </li>
  );
};

export default TodoItem;
