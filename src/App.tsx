import { useEffect, useState } from 'react';
import { startNewGame } from './gameLogic/gameController';
import type { Player } from './gameLogic/gameState';
import HandDisplay from './components/HandDisplay';

function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [dealer, setDealer] = useState<Player | null>(null);

  console.log(player, dealer);

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
      <HandDisplay title="Player" score={player.score} hand={player.hand} />
      <HandDisplay title="Dealer" score={dealer.score} hand={dealer.hand} />
    </div>
  );
}

export default App;
