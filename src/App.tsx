import { useEffect, useReducer } from 'react';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';
import Header from './components/layout/Header';
import GameBoard from './components/game/GameBoard';
import { gameReducer, initialState } from './gameLogic/gameReducer';

function App() {
  const { theme, setTheme } = useTheme();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { player, dealer, result } = state;

  // // Initialize game
  useEffect(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  const onHit = () => dispatch({ type: 'PLAYER_HIT' });
  const onStand = () => dispatch({ type: 'PLAYER_STAND' });
  const onReset = () => dispatch({ type: 'NEW_GAME' });

  if (!player || !dealer)
    return <h1 className="text-3xl text-center mt-16">Loading...</h1>;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header onReset={onReset} />
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
