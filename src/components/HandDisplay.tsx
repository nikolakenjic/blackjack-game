import type { Card } from '../gameLogic/deck';

type HandleDisplayProps = {
  title: string;
  score: number;
  hand: Card[];
};

const HandDisplay = ({ title, score, hand }: HandleDisplayProps) => {
  return (
    <div className="mb-6 w-full max-w-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border dark:border-gray-600">
      <h2 className="text-xl font-bold mb-2 dark:text-gray-200">{title}</h2>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        Score: <span className="font-semibold">{score}</span>
      </p>
      <ul className="space-y-1">
        {hand.map((card, i) => (
          <li
            key={i}
            className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm dark:text-gray-400"
          >
            {card.value} of {card.suit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandDisplay;
