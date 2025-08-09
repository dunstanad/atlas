import { useState, useEffect, useRef } from "react";
import places from "../data/places.json";
import {
  getRandomValidWord,
  pickValidWordForLetter,
  validateWord
} from "../utils/gameHelpers";

export default function GameBoard({ onQuit }) {
  const [turn, setTurn] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [usedWords, setUsedWords] = useState(new Set());
  const [playerMisses, setPlayerMisses] = useState(0);
  const [computerMisses, setComputerMisses] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);
  const lastTurnWasComputerMissRef = useRef(false);

  useEffect(() => {
    const word = getRandomValidWord(places, usedWords);
    if (!word) {
      onQuit({ winner: "No valid start word", score: `${playerScore} | ${computerScore}` });
      return;
    }
    setCurrentWord(word);
    setUsedWords(new Set([word.toLowerCase()]));
    setTurn("player");
    setTimeLeft(30);
    lastTurnWasComputerMissRef.current = false;
  }, []);

  useEffect(() => {
    if (!turn) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [turn]);

  useEffect(() => {
    if (timeLeft <= 0) handleTimeout();
  }, [timeLeft]);

  function handleTimeout() {
    clearInterval(timerRef.current);
    if (turn === "player") {
      handleUserFail();
    } else if (turn === "computer") {
      handleComputerFail();
    }
    setTimeLeft(30);
  }

  function handleUserFail() {
    if (lastTurnWasComputerMissRef.current) {
      setPlayerMisses(m => m + 1);
      lastTurnWasComputerMissRef.current = false;
      startNewGameRound("computer");
    } else {
      setPlayerMisses(m => m + 1);
      setTurn("computer");
      setTimeLeft(30);
    }
  }

  function handleComputerFail() {
    setComputerMisses(m => m + 1);
    lastTurnWasComputerMissRef.current = true;
    startNewGameRound("player");
  }

  function startNewGameRound(startingTurn) {
    const word = getRandomValidWord(places, usedWords);
    if (!word) {
      onQuit({ winner: "No valid start word", score: `You: ${playerScore} | Computer: ${computerScore}` });
      return;
    }
    setCurrentWord(word);
    setUsedWords(prev => new Set(prev).add(word.toLowerCase()));
    setTurn(startingTurn);
    setTimeLeft(30);
    lastTurnWasComputerMissRef.current = false;
  }

  function handleSubmit() {
    clearInterval(timerRef.current);
    const lastChar = currentWord.slice(-1);
    const isValid = validateWord(inputValue, lastChar, usedWords, places);

    if (isValid) {
      const word = inputValue.trim();
      setUsedWords(prev => new Set(prev).add(word.toLowerCase()));
      setCurrentWord(word);
      setPlayerScore(score => score + 5);
      setInputValue("");
      setTurn("computer");
      lastTurnWasComputerMissRef.current = false;
      setTimeLeft(30);
    } else {
      handleUserFail();
      setInputValue("");
    }
  }

  useEffect(() => {
    if (turn !== "computer") return;

    const delay = setTimeout(() => {
      const lastChar = currentWord.slice(-1);
      const word = pickValidWordForLetter(lastChar.toUpperCase(), usedWords, places);

      if (!word) {
        handleComputerFail();
      } else {
        setUsedWords(prev => new Set(prev).add(word.toLowerCase()));
        setCurrentWord(word);
        setComputerScore(score => score + 5);
        setTurn("player");
        setTimeLeft(30);
        lastTurnWasComputerMissRef.current = false;
      }
    }, 1000 + Math.random() * 1000);

    return () => clearTimeout(delay);
  }, [turn]);

  // Game over logic
  useEffect(() => {
    if (playerMisses >= 3 || computerMisses >= 3) {
      clearInterval(timerRef.current);

      let winner = "Draw";
      if (playerMisses > computerMisses) {
        winner = "Computer";
      } else if (computerMisses > playerMisses) {
        winner = "You";
      } else {
        // Misses equal, decide by points
        if (playerScore > computerScore) {
          winner = "You";
        } else if (computerScore > playerScore) {
          winner = "Computer";
        }
      }

      const score = `You: ${playerScore} | Computer: ${computerScore}`;
      onQuit({ winner, score });
    }
  }, [playerMisses, computerMisses]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <h3 className="text-2xl text-indigo-400 font-bold">{currentWord}</h3>

      <div className="flex space-x-10">
        <div className="text-left space-y-2">
          <p><strong>You:</strong> {playerScore} points</p>
          <p><strong>Misses:</strong> {playerMisses}</p>
        </div>
        <div className="text-left space-y-2">
          <p><strong>Computer:</strong> {computerScore} points</p>
          <p><strong>Misses:</strong> {computerMisses}</p>
        </div>
      </div>

      <p className="text-lg text-yellow-400">⏱ Time Left: {timeLeft}s</p>

      <input
        type="text"
        placeholder="Enter a place name"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-500 w-72"
      />

      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
        <button
          onClick={() => onQuit({ winner: "Computer", score: `You: ${playerScore} | Computer: ${computerScore}` })}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Quit
        </button>
      </div>
    </div>
  );
}
