import { useDroppable } from '@dnd-kit/core';
import TodoCard from './TodoCard';

export default function Lane({ status, todos, setTodos }) {
    const { setNodeRef } = useDroppable({ id: status });
  
    const filtered = todos.filter((todo) => todo.status === status);
  
    const handleDelete = (id) => {
        console.log("hello")
        
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
  
    return (
      <div ref={setNodeRef} className="bg-gray-100 rounded-lg p-4 shadow-inner min-h-[300px]">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">{status}</h2>
        <div className="space-y-3">
          {filtered.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    );
  }
  
  
