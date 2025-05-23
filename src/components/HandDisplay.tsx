import type { Card } from '../gameLogic/deck';

type HandleDisplayProps = {
  title: string;
  score: number;
  hand: Card[];
};

const HandDisplay = ({ title, score, hand }: HandleDisplayProps) => {
  return (
    <div className="mb-4 w-full max-w-sm bg-white dark:bg-gray-800 p-4 rounded shadow text-white">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-2">Score: {score}</p>
      <ul className="space-y-1">
        {hand.map((card, i) => (
          <li
            key={i}
            className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {card.value} of {card.suit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandDisplay;
