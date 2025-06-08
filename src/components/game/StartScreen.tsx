import { useState } from 'react';

interface StartScreenProps {
  onStart: (deposit: number) => void;
}
const StartScreen = ({ onStart }: StartScreenProps) => {
  const [deposit, setDeposit] = useState(0);

  const handleStart = () => {
    if (deposit < 100) {
      alert('Deposit must be at least $100');
      return;
    }

    onStart(deposit);
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
        Welcome to Blackjack Game
      </h1>

      <div>
        <label className="block mb-2 font-medium text-lg">Enter Deposit</label>
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="px-4 py-2 border rounded-md w-64"
        />
      </div>
      <button
        onClick={handleStart}
        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
