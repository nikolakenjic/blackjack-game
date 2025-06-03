import Button from '../common/Button';
import StatsDisplay from '../game/StatsDisplay';

interface HeaderProps {
  onReset: () => void;
  stats?: { wins: number; losses: number; ties: number };
  onResetStats?: () => void;
}

const Header = ({ onReset, stats, onResetStats }: HeaderProps) => {
  return (
    <>
      <div className="absolute top-5 left-5">
        {stats && <StatsDisplay stats={stats} onResetStats={onResetStats} />}

        <Button variant="blue" onClick={onReset}>
          New Game
        </Button>
      </div>

      <h1 className="font-bold text-3xl mb-6 text-center absolute top-5 dark:text-white">
        Blackjack Game
      </h1>
    </>
  );
};

export default Header;
