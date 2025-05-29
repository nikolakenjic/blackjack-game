import { useEffect, useState } from 'react';
import {
  handleHit,
  handleStand,
  isBusted,
  startNewGame,
} from './gameLogic/gameController';
import { type Player } from './gameLogic/gameState';
import type { Card } from './gameLogic/deck';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/layout/ThemeToggle';
import Header from './components/layout/Header';
import GameBoard from './components/game/GameBoard';

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
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header onReset={() => resetGame()} />
      <GameBoard
        player={player}
        dealer={dealer}
        result={result}
        onHit={() => handleHit(player, deck, setPlayer, setDeck)}
        onStand={() =>
          handleStand(dealer, player, deck, setDealer, setDeck, setResult)
        }
      />
    </div>
  );
}

export default App;
