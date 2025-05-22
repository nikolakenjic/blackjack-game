import { useEffect, useState } from 'react';
import { startNewGame } from './gameLogic/gameController';
import type { Player } from './gameLogic/gameState';

function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [dealer, setDealer] = useState<Player | null>(null);

  useEffect(() => {
    const { player, dealer } = startNewGame();
    setPlayer(player);
    setDealer(dealer);
  }, []);

  if (!player || !dealer) return <h1>Loading...</h1>;

  return (
    <div className="p4 flex justify-center items-center flex-col">
      <h1 className="font-bold text-3xl mb-6 text-center mt-3">
        Blackjack Game
      </h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Player</h2>
        <p>Score: {player.score}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Dealer</h2>
        <p>Score: {dealer.score}</p>
      </div>
    </div>
  );
}

export default App;
