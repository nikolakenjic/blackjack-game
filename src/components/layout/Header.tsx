import Button from '../common/Button';

interface HeaderProps {
  onReset: () => void;
}

const Header = ({ onReset }: HeaderProps) => {
  return (
    <>
      <div className="absolute top-5 left-5">
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
