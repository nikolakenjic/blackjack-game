import { useState } from 'react';
import toast from 'react-hot-toast';

interface StartScreenProps {
  onStart: (deposit: number) => void;
}
const StartScreen = ({ onStart }: StartScreenProps) => {
  const [deposit, setDeposit] = useState(0);

  const handleStart = () => {
    if (deposit < 100) {
      toast.error('Deposit must be at least $100');
      return;
    }

    onStart(deposit);
  };

  return (
    <div className="text-center space-y-6 bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-lg w-[90%] max-w-md">
      <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-white">
        🃏 Welcome to Blackjack
      </h1>

      <div className="text-left space-y-2">
        <label
          htmlFor="deposit"
          className="block text-lg font-medium text-zinc-700 dark:text-zinc-200"
        >
          Enter Your Deposit ($)
        </label>
        <input
          id="deposit"
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="w-full px-4 py-2 text-lg border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Minimum $100"
          min={0}
        />
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-purple-600 text-white text-lg py-2 rounded-md transition duration-300 hover:bg-purple-700 disabled:opacity-50"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
