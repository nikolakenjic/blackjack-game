import Header from './Header';
import GameBoard from '../game/GameBoard';
import type { Player } from '../../logic/gameState';

interface MainContentProps {
  onReset: () => void;
  onResetStats: () => void;
  onHit: () => void;
  onStand: () => void;
  player: Player;
  dealer: Player;
  result: string | null;
  stats: {
    wins: number;
    losses: number;
    ties: number;
  };
}

const MainContent = ({
  onReset,
  onResetStats,
  onHit,
  onStand,
  player,
  dealer,
  result,
  stats,
}: MainContentProps) => {
  return (
    <>
      <Header onReset={onReset} stats={stats} onResetStats={onResetStats} />
      <GameBoard
        player={player}
        dealer={dealer}
        result={result}
        onHit={onHit}
        onStand={onStand}
        onReset={onReset}
      />
    </>
  );
};

export default MainContent;
