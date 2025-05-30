import { createDeck, type Card } from './deck';
import {
  calculateScore,
  dealCard,
  dealInitialCards,
  type Player,
} from './gameState';

export function startNewGame() {
  const deck = createDeck();

  const { player, dealer, remainingDeck } = dealInitialCards(deck);

  return { player, dealer, remainingDeck };
}

export function handlePlayerHit(player: Player, deck: Card[]) {
  const newDeck = [...deck];
  const updatedPlayer: Player = { ...player, hand: [...player.hand] };

  dealCard(newDeck, updatedPlayer);

  updatedPlayer.score = calculateScore(updatedPlayer.hand);

  return { updatedPlayer, updatedDeck: newDeck };
}

export function handleDealerTurn(dealer: Player, deck: Card[]) {
  const newDeck = [...deck];

  const updatedDealer: Player = { ...dealer, hand: [...dealer.hand] };

  while (updatedDealer.score < 17 && newDeck.length > 0) {
    dealCard(newDeck, updatedDealer);
    updatedDealer.score = calculateScore(updatedDealer.hand);
  }

  return {
    updatedDealer,
    updatedDeck: newDeck,
  };
}

export function checkWinner(playerScore: number, dealerScore: number): string {
  if (dealerScore > 21) return 'Dealer is busted! You win!';
  if (playerScore > dealerScore) return 'You win!';
  if (playerScore < dealerScore) return 'Dealer wins!';
  return 'Draw!';
}

export function isBusted(score: number): boolean {
  return score > 21;
}
