import Board from '../components/Board';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Trello Board</h1>
      <Board />
    </main>
  );
}
