import React, { useState } from 'react';

const CreateTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo Title"
        className="border p-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Todo Description"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Add Todo
      </button>
    </form>
  );
};

export default CreateTodo;
