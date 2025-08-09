export default function GameOver({ winner, score, onPlayAgain, onHome }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <h2 className="text-3xl font-bold">
        {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
      </h2>
      <p className="text-xl">Final Score: {score}</p>

      <div className="flex space-x-4">
        <button 
          onClick={onPlayAgain}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg"
        >
          Play Again
        </button>
        <button 
          onClick={onHome}
          className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          Home
        </button>
      </div>
    </div>
  );
}
