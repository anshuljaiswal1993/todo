import { useState } from 'react';

export default function EditTodoModal({ todo, onClose, onUpdate }) {
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://dummyjson.com/posts/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const updatedTodo = await res.json();
      onUpdate(updatedTodo);
      onClose();
    } catch (err) {
      console.error('Failed to update todo:', err);
      alert('Something went wrong while updating.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
