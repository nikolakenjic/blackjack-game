import { useReducer } from 'react';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';
import { gameReducer, initialState } from './logic/gameReducer';
import { useInitializeGame } from './hooks/useInitializeGame';
import { useGameResult } from './hooks/useGameResult';
import { useGameActions } from './hooks/useGameActions';
import { Toaster } from 'react-hot-toast';
import StartScreen from './components/game/StartScreen';
import MainContent from './components/layout/MainContent';
import LoadingPage from './components/common/LoadingPage';

function App() {
  const { theme, setTheme } = useTheme();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { player, dealer, result, gameOver, stats } = state;

  const { onHit, onStand, onReset, onResetStats, onStartGame } = useGameActions(
    dispatch,
    gameOver
  );

  // // Initialize game
  useInitializeGame(dispatch);

  // When game ends, delay showing the final result by 1 second
  useGameResult({ player, dealer, gameOver, dispatch });

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <Toaster position="top-center" />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {!state.gameStarted ? (
        <StartScreen onStart={(deposit) => onStartGame(deposit)} />
      ) : !player || !dealer ? (
        <LoadingPage />
      ) : (
        <MainContent
          onReset={onReset}
          onResetStats={onResetStats}
          onHit={onHit}
          onStand={onStand}
          player={player}
          dealer={dealer}
          result={result}
          stats={stats}
        />
      )}
    </div>
  );
}

export default App;
