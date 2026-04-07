import { useState, useEffect } from 'react';

const ToDo = () => {
  // Read: Initialize state from local storage or empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  // Persist data to LocalStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Create: Add a new task
  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask('');
  };

  // Delete: Remove a task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Update: Toggle completed status
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Update: Edit text
  const startEdit = (id, text) => {
    setIsEditing(id);
    setTask(text);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setTodos(
      todos.map(todo =>
        todo.id === isEditing ? { ...todo, text: task } : todo
      )
    );
    setIsEditing(null);
    setTask('');
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={isEditing ? saveEdit : addTodo}>
        <input
          id="task-input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">{isEditing ? 'Save' : 'Add'}</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input id="task-checkbox" type="checkbox" checked={todo.completed} onClick={() => toggleComplete(todo.id)}/>
            {todo.text}
            <div>
              <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;