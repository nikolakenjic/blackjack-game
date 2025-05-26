import { useEffect, useState } from 'react';
import { startNewGame } from './gameLogic/gameController';
import type { Player } from './gameLogic/gameState';
import HandDisplay from './components/HandDisplay';

import { LuSun } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';

function App() {
  const [theme, setTheme] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [dealer, setDealer] = useState<Player | null>(null);

  // console.log(player, dealer);

  useEffect(() => {
    const { player, dealer } = startNewGame();
    setPlayer(player);
    setDealer(dealer);
  }, []);

  if (!player || !dealer) return <h1>Loading...</h1>;

  return (
    <div
      className={`bg-white dark:bg-zinc-800 p-4 flex justify-center items-center flex-col h-screen w-full relative ${
        theme ? 'dark' : ''
      }`}
    >
      <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl absolute top-5 right-5 flex gap-2">
        <button
          className="bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-100/20 rounded-lg p-3"
          onClick={() => setTheme('dark')}
        >
          <LuMoon />
        </button>
        <button
          className="bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-100/20 rounded-lg p-3"
          onClick={() => setTheme('')}
        >
          <LuSun />
        </button>
      </div>

      <h1 className="font-bold text-3xl mb-6 text-center absolute top-5 dark:text-white">
        Blackjack Game
      </h1>

      <HandDisplay title="Player" score={player.score} hand={player.hand} />
      <HandDisplay title="Dealer" score={dealer.score} hand={dealer.hand} />
    </div>
  );
}

export default App;

// <div className="bg-white dark:bg-zinc-800 grid place-items-center h-screen w-full">
//     <div className="bg-zinc-100 p-2 rounded-xl">
//       <button className="bg-transparent hover:bg-zinc-200 rounded-lg text-black">
//         <LuMoon />
//       </button>
//       <button className="bg-transparent hover:bg-zinc-200 rounded-lg text-black">
//         <LuSun />
//       </button>
//     </div>
