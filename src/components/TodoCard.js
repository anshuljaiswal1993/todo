import { useDraggable } from '@dnd-kit/core';

export default function TodoCard({ todo, onDelete }) {
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
      const res = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      console.log('DELETE RESPONSE:', data);

      // DummyJSON might not return isDeleted, so just remove from UI
      onDelete(todo.id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      alert('Something went wrong while deleting.');
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded-lg shadow cursor-move flex justify-between items-start"
    >
      <p className="text-gray-800">{todo.todo}</p>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 text-sm ml-2"
        title="Delete todo"
      >
        ✕
      </button>
    </div>
  );
}
