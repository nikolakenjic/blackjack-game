import Button from '../common/Button';

interface StatsDisplayProps {
  stats: { wins: number; losses: number; ties: number };
  onResetStats?: () => void;
}

const StatsDisplay = ({ stats, onResetStats }: StatsDisplayProps) => {
  return (
    <div className=" text-lg dark:text-white mb-6">
      <p className="text-lg font-medium mb-2">
        Wins: <span className="font-bold">{stats.wins}</span> | Losses:{' '}
        <span className="font-bold">{stats.losses}</span> | Ties:{' '}
        <span className="font-bold">{stats.ties}</span>
      </p>
      <Button variant="purple" onClick={onResetStats}>
        Reset Stats
      </Button>
    </div>
  );
};

export default StatsDisplay;
