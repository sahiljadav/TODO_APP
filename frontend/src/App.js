import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import Loading from './components/Loading';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:4000/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (title, description) => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false }),
      });

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle completion
  const toggleTodo = async (title, completed) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${title}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.title === updatedTodo.title ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Update Todo (full update)
  const updateTodo = async (oldTitle, newTitle, description, completed) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/update/${oldTitle}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description, completed }),
      });

      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.title === updatedTodo.title ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (title) => {
    try {
      await fetch(`http://localhost:4000/todos/delete/${title}`, {
        method: "DELETE",
      });
      setTodos(todos.filter(todo => todo.title !== title));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo List</h1>

        <div className="sticky top-0 bg-white z-10">
          <CreateTodo onAdd={addTodo} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="overflow-y-auto max-h-[400px]">
            <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} onUpdate={updateTodo} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
