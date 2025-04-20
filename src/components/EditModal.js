import { useState } from 'react';

export default function EditModal({ todo, onClose, onSave }) {
  const [value, setValue] = useState(todo.todo);

  const handleSave = async () => {
    // Optional: API update
    await fetch(`https://dummyjson.com/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: value }),
    });

    onSave({ ...todo, todo: value });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-500 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
