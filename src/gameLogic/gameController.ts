import { createDeck } from './deck';
import { dealInitialCards } from './gameState';

export function startNewGame() {
  const deck = createDeck();
  //   console.log('deck', deck);

  const { player, dealer, remainingDeck } = dealInitialCards(deck);

  return { player, dealer, remainingDeck };
}
