import HandDisplay from '../common/HandDisplay';
import Button from '../common/Button';
import type { Player } from '../../gameLogic/gameState';

interface GameBoardProps {
  player: Player;
  dealer: Player;
  result: string | null;
  onHit: () => void;
  onStand: () => void;
}

const GameBoard = ({
  player,
  dealer,
  result,
  onHit,
  onStand,
}: GameBoardProps) => {
  return (
    <>
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
          onClick={onHit}
          disabled={!!result}
          className={`${result ? 'opacity-50 ' : ''}`}
        >
          Hit
        </Button>
        <Button
          variant="red"
          onClick={onStand}
          disabled={!!result}
          className={`${result ? 'opacity-50 ' : ''}`}
        >
          Stand
        </Button>
      </div>
    </>
  );
};

export default GameBoard;
