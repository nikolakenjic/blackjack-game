import { createDeck } from './deck';
import { dealInitialCards } from './gameState';

export function startNewGame() {
  const deck = createDeck();

  const { player, dealer, remainingDeck } = dealInitialCards(deck);

  return { player, dealer, remainingDeck };
}
