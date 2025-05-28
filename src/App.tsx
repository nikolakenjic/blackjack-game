import { useEffect, useState } from 'react';
import {
  handleHit,
  handleStand,
  isBusted,
  startNewGame,
} from './gameLogic/gameController';
import { type Player } from './gameLogic/gameState';
import HandDisplay from './components/common/HandDisplay';

// import { LuSun } from 'react-icons/lu';
// import { LuMoon } from 'react-icons/lu';
// import ThemeButton from './components/common/ThemeButton';
// import { THEMES } from './utils/theme';
import Button from './components/common/Button';
import type { Card } from './gameLogic/deck';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';

function App() {
  const { theme, setTheme } = useTheme();
  const [deck, setDeck] = useState<Card[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [dealer, setDealer] = useState<Player | null>(null);
  const [result, setResult] = useState<string | null>(null);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const { player, dealer, remainingDeck } = startNewGame();
    setPlayer(player);
    setDealer(dealer);
    setDeck(remainingDeck);
    setResult(null);
  };

  // Check if player is busted
  useEffect(() => {
    if (player && isBusted(player.score)) {
      setResult('You are busted! Dealer wins!');
    }
  }, [player]);

  if (!player || !dealer)
    return <h1 className="text-3xl text-center mt-16">Loading...</h1>;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <div className="absolute top-5 left-5">
        <Button variant="blue" onClick={() => resetGame()}>
          New Game
        </Button>
      </div>

      <ThemeToggle theme={theme} setTheme={setTheme} />

      <h1 className="font-bold text-3xl mb-6 text-center absolute top-5 dark:text-white">
        Blackjack Game
      </h1>

      {result && (
        <div className="mt-4 text-2xl font-bold dark:text-white text-center mb-6">
          {result}
        </div>
      )}

      <HandDisplay title="Player" score={player.score} hand={player.hand} />
      <HandDisplay title="Dealer" score={dealer.score} hand={dealer.hand} />

      <div className="flex gap-4 mt-4">
        <Button
          variant="green"
          onClick={() => handleHit(player, deck, setPlayer, setDeck)}
        >
          Hit
        </Button>
        <Button
          variant="red"
          onClick={() =>
            handleStand(dealer, player, deck, setDealer, setDeck, setResult)
          }
        >
          Stand
        </Button>
      </div>
    </div>
  );
}

export default App;
