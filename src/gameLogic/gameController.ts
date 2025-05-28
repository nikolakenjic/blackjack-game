import { createDeck, type Card } from './deck';
import { calculateScore, dealInitialCards, type Player } from './gameState';

export function startNewGame() {
  const deck = createDeck();
  //   console.log('deck', deck);

  const { player, dealer, remainingDeck } = dealInitialCards(deck);

  return { player, dealer, remainingDeck };
}

export function handlePlayerHit(player: Player, deck: Card[]) {
  const newCard = deck[0];
  const newDeck = deck.slice(1);

  const updateHand = [...player.hand, newCard];
  const updateScore = calculateScore(updateHand);

  return {
    updatedPlayer: { ...player, hand: updateHand, score: updateScore },
    updatedDeck: newDeck,
  };
}

export function handleDealerTurn(dealer: Player, deck: Card[]) {
  const newDeck = [...deck];

  const updatedDealer = { ...dealer };
  while (calculateScore(updatedDealer.hand) < 17 && newDeck.length > 0) {
    const card = newDeck.shift();
    if (card) updatedDealer.hand.push(card);
  }

  updatedDealer.score = calculateScore(updatedDealer.hand);

  return {
    updatedDealer,
    updatedDeck: newDeck,
  };
}
