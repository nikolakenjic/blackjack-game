import { useEffect, useState } from 'react';
import { startNewGame } from './gameLogic/gameController';
import type { Player } from './gameLogic/gameState';
import HandDisplay from './components/HandDisplay';

import { LuSun } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';
import ThemeButton from './components/ThemeButton';
import { type Theme, THEMES } from './utils/theme';

function App() {
  const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);
  const [player, setPlayer] = useState<Player | null>(null);
  const [dealer, setDealer] = useState<Player | null>(null);

  // console.log(player, dealer);
  // add dark/light theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === THEMES.DARK) setTheme(THEMES.DARK);
  }, []);

  useEffect(() => {
    if (theme === THEMES.DARK) document.body.classList.add(THEMES.DARK);
    else document.body.classList.remove(THEMES.DARK);

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const { player, dealer } = startNewGame();
    setPlayer(player);
    setDealer(dealer);
  };

  // Handle hit and stand
  const handleHit = () => {
    if (!player || !dealer) return;

    const newCard = {
      suit: 'Hearts',
      value: (Math.floor(Math.random() * 11) + 1).toString(),
    };

    const updateHand = [...player.hand, newCard];
    const updateScore = updateHand.reduce(
      (sum, card) => sum + Number(card.value),
      0
    );

    setPlayer({ ...player, hand: updateHand, score: updateScore });
  };

  const handleStand = () => {
    console.log('stand');
  };

  if (!player || !dealer) return <h1>Loading...</h1>;

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative">
      <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl absolute top-5 right-5 flex gap-2">
        <ThemeButton icon={LuSun} onClick={() => setTheme(THEMES.LIGHT)} />
        <ThemeButton icon={LuMoon} onClick={() => setTheme(THEMES.DARK)} />
      </div>

      <h1 className="font-bold text-3xl mb-6 text-center absolute top-5 dark:text-white">
        Blackjack Game
      </h1>

      <HandDisplay title="Player" score={player.score} hand={player.hand} />
      <HandDisplay title="Dealer" score={dealer.score} hand={dealer.hand} />

      <button
        onClick={() => {
          const { player, dealer } = startNewGame();
          setPlayer(player);
          setDealer(dealer);
        }}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        New Game
      </button>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleHit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Hit
        </button>
        <button
          onClick={handleStand}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Stand
        </button>
      </div>
    </div>
  );
}

export default App;
