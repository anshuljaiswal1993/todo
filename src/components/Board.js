import { DndContext } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import Lane from './Lane';
import NewTodoForm from './NewTodoForm';
export default function Board() {
  const [todos, setTodos] = useState([]);

  const statuses = ['Pending', 'In Progress', 'Completed'];

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://dummyjson.com/todos?limit=15');
      const data = await res.json();

      // Add status field for local drag/drop support
      const enriched = data.todos.map((todo) => ({
        ...todo,
        status: todo.completed ? 'Completed' : 'Pending',
      }));

      setTodos(enriched);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = parseInt(active.id);
    const newStatus = over.id;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === draggedId ? { ...todo, status: newStatus } : todo
      )
    );
  };

  return (
    <div>
    <NewTodoForm onAdd={handleAddTodo} />

    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => (
  <Lane key={status} status={status} todos={todos} setTodos={setTodos} />
))}

      </div>
    </DndContext>
  </div>
  );
}
