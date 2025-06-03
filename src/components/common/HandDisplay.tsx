import type { Card } from '../../logic/deck';
import { getCardEmoji } from '../../utils/cardUtils';

type HandleDisplayProps = {
  title: string;
  score: number;
  hand: Card[];
  hideSecondCard?: boolean;
};

const HandDisplay = ({
  title,
  score,
  hand,
  hideSecondCard,
}: HandleDisplayProps) => {
  const displayedHand = hideSecondCard
    ? [hand[0], ...hand.slice(1).map(() => null)]
    : hand;

  return (
    <div className="mb-6 w-full max-w-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border dark:border-gray-600">
      <h2 className="text-xl font-bold mb-2 dark:text-gray-200">{title}</h2>

      {!hideSecondCard && (
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
          Score: <span className="font-semibold">{score}</span>
        </p>
      )}

      <ul className="space-y-1">
        {displayedHand
          .slice()
          .reverse()
          .map((card, i) => (
            <li
              key={i}
              className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm dark:text-gray-400"
            >
              {card
                ? `${getCardEmoji(card.suit)} ${card.value} of ${card.suit}`
                : '🂠 Hidden card'}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HandDisplay;
