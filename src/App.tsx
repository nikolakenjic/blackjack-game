import { useEffect, useState } from 'react';
import {
  handleDealerTurn,
  handlePlayerHit,
  startNewGame,
} from './gameLogic/gameController';
import { type Player } from './gameLogic/gameState';
import HandDisplay from './components/HandDisplay';

import { LuSun } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';
import ThemeButton from './components/ThemeButton';
import { THEMES } from './utils/theme';
import Button from './components/Button';
import type { Card } from './gameLogic/deck';
import { useTheme } from './hooks/useTheme';

function App() {
  const { setTheme } = useTheme();
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

  // Handle hit and stand
  const handleHit = () => {
    if (!player || deck.length === 0) return;

    const { updatedPlayer, updatedDeck } = handlePlayerHit(player, deck);

    setPlayer(updatedPlayer);
    setDeck(updatedDeck);
  };

  // Check if player is busted
  useEffect(() => {
    if (player && player.score > 21) {
      setResult('You are busted! Dealer wins!');
    }
  }, [player]);

  const checkWinner = (playerScore: number, dealerScore: number) => {
    if (dealerScore > 21) {
      setResult('Dealer is busted! You win!');
    } else if (playerScore > dealerScore) {
      setResult('You win!');
    } else if (playerScore < dealerScore) {
      setResult('Dealer wins!');
    } else {
      setResult('Draw!');
    }
  };

  const handleStand = () => {
    if (!dealer || !player || deck.length === 0) return;

    const { updatedDealer, updatedDeck } = handleDealerTurn(dealer, deck);

    setDealer(updatedDealer);
    setDeck(updatedDeck);

    setTimeout(() => {
      checkWinner(player.score, updatedDealer.score);
    }, 500);
  };

  if (!player || !dealer)
    return <h1 className="text-3xl text-center mt-16">Loading...</h1>;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <div className="absolute top-5 left-5">
        <Button variant="blue" onClick={() => resetGame()}>
          New Game
        </Button>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl absolute top-5 right-5 flex gap-2">
        <ThemeButton icon={LuSun} onClick={() => setTheme(THEMES.LIGHT)} />
        <ThemeButton icon={LuMoon} onClick={() => setTheme(THEMES.DARK)} />
      </div>

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
        <Button variant="green" onClick={handleHit}>
          Hit
        </Button>
        <Button variant="red" onClick={handleStand}>
          Stand
        </Button>
      </div>
    </div>
  );
}

export default App;
