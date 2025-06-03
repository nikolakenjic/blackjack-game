import Button from '../common/Button';

interface HeaderProps {
  onReset: () => void;
  stats?: { wins: number; losses: number; ties: number };
}

const Header = ({ onReset, stats }: HeaderProps) => {
  return (
    <>
      <div className="absolute top-5 left-5">
        {stats && (
          <div className=" text-lg dark:text-white mb-6">
            Wins: {stats.wins} Losses: {stats.losses} Ties: {stats.ties}
          </div>
        )}
        <Button variant="blue" onClick={onReset}>
          New Game
        </Button>
      </div>

      <h1 className="font-bold text-3xl mb-6 text-center absolute top-5 dark:text-white">
        Blackjack Game
      </h1>

      {stats && (
        <div className="absolute top-10 right-10 text-lg dark:text-white">
          Wins: {stats.wins} Losses: {stats.losses} Ties: {stats.ties}
        </div>
      )}
    </>
  );
};

export default Header;
