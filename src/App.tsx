import { useEffect, useReducer } from 'react';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';
import Header from './components/layout/Header';
import GameBoard from './components/game/GameBoard';
import { gameReducer, initialState } from './gameLogic/gameReducer';
import { checkWinner, isBusted } from './gameLogic/gameController';

function App() {
  const { theme, setTheme } = useTheme();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { player, dealer, result, gameOver, stats } = state;
  console.log(stats);

  // // Initialize game
  useEffect(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  const onHit = () => {
    if (!gameOver) dispatch({ type: 'PLAYER_HIT' });
  };
  const onStand = () => {
    if (!gameOver) dispatch({ type: 'PLAYER_STAND' });
  };
  const onReset = () => {
    dispatch({ type: 'NEW_GAME' });
    dispatch({ type: 'RESET_GAME_OVER' });
  };

  // When game ends, delay showing the final result by 1 second
  useEffect(() => {
    if (!gameOver) return;

    const timeOutId = setTimeout(() => {
      if (!player || !dealer) return;

      if (isBusted(player.score)) {
        dispatch({
          type: 'SET_RESULT',
          payload: 'You are busted! Dealer wins!',
        });
      } else {
        const winnerMessage = checkWinner(player.score, dealer.score);
        dispatch({ type: 'SET_RESULT', payload: winnerMessage });
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [dealer, gameOver, player]);

  if (!player || !dealer)
    return <h1 className="text-3xl text-center mt-16">Loading...</h1>;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header onReset={onReset} stats={stats} />
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
