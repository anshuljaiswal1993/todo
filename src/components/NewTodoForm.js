import { useState } from 'react';

export default function NewTodoForm({ onAdd }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: value,
          userId: 1,
        }),
      });

      const data = await res.json();

      // Add to local state with status 'Pending'
      const newTodo = {
        id: data.id,
        todo: data.title,
        completed: false,
        userId: data.userId,
        status: 'Pending',
      };

      onAdd(newTodo); // Send to parent (Board)
      setValue('');
    } catch (err) {
      console.error('Error creating todo:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
