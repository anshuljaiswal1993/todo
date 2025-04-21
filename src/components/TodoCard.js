import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import EditTodoModal from './EditTodoModal';

export default function TodoCard({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      await fetch(`https://dummyjson.com/posts/${todo.id}`, {
        method: 'DELETE',
      });
      onDelete(todo.id);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Error deleting todo');
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white p-3 rounded-lg shadow cursor-move flex justify-between items-start"
      >
        <p className="text-gray-800 w-full">{todo.todo}</p>
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 text-sm"
            title="Edit todo"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm"
            title="Delete todo"
          >
            ✕
          </button>
        </div>
      </div>

      {isEditing && (
        <EditTodoModal
          todo={todo}
          onClose={() => setIsEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
