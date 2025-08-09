export default function LandingPage({ onPlay }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 px-4">
      <h2 className="text-4xl font-bold text-white drop-shadow-md">Rules</h2>

      <div className="bg-gradient-to-br from-gray-800/70 to-gray-700/70 border border-gray-600 rounded-2xl shadow-2xl p-6 w-full max-w-md text-left text-white">
        <ul className="list-inside list-disc space-y-3 text-lg text-gray-100">
          <li className="drop-shadow-sm">🎮 You vs Computer</li>
          <li className="drop-shadow-sm">🧠 Computer starts</li>
          <li className="drop-shadow-sm">🔤 Use last letter, no repeats</li>
          <li className="drop-shadow-sm">⏱️ 30s per turn</li>
          <li className="drop-shadow-sm">🔁 Take turns</li>
          <li className="drop-shadow-sm">📚 Valid names only [Country, State, City]</li>
          <li className="drop-shadow-sm">❌ 3 misses = game over</li>
        </ul>
      </div>

      <button 
        onClick={onPlay} 
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg transition drop-shadow-sm"
      >
        Play
      </button>
    </div>
  );
}




