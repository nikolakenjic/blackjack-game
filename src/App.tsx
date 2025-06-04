import { useReducer } from 'react';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';
import Header from './components/layout/Header';
import GameBoard from './components/game/GameBoard';
import { gameReducer, initialState } from './logic/gameReducer';
import { useInitializeGame } from './hooks/useInitializeGame';
import { useGameResult } from './hooks/useGameResult';
import { useGameActions } from './hooks/useGameActions';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme, setTheme } = useTheme();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { player, dealer, result, gameOver, stats } = state;

  const { onHit, onStand, onReset, onResetStats } = useGameActions(
    dispatch,
    gameOver
  );

  // // Initialize game
  useInitializeGame(dispatch);

  // When game ends, delay showing the final result by 1 second
  useGameResult({ player, dealer, gameOver, dispatch });

  if (!player || !dealer)
    return (
      <div className="text-center mt-16">
        <h1 className="text-3xl">Loading...</h1>
        <p className="text-zinc-500">
          If this takes too long, please refresh the page.
        </p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <Toaster position="top-center" />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header onReset={onReset} stats={stats} onResetStats={onResetStats} />
      <GameBoard
        player={player}
        dealer={dealer}
        result={result}
        onHit={onHit}
        onStand={onStand}
        onReset={onReset}
      />
    </div>
  );
}

export default App;
