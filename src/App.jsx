import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

function App() {
  const [screen, setScreen] = useState("landing");
  const [result, setResult] = useState({ winner: "", score: "" });

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex-grow w-full px-4 py-10 flex items-center justify-center">
        {screen === "landing" && <LandingPage onPlay={() => setScreen("game")} />}
        {screen === "game" && (
          <GameBoard
            onQuit={(res) => {
              setResult(res);
              setScreen("gameover");
            }}
          />
        )}
        {screen === "gameover" && (
          <GameOver
            winner={result.winner}
            score={result.score}
            onPlayAgain={() => setScreen("game")}
            onHome={() => setScreen("landing")}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
