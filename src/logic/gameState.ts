import type { Card } from './deck';

export interface Player {
  name: string;
  score: number;
  hand: Card[];
}

export function dealCard(deck: Card[], player: Player) {
  const card = deck.shift();
  if (!card) throw new Error('Not enough cards in deck');

  player.hand.push(card);
  player.score = calculateScore(player.hand);
}

export function calculateScore(hand: Card[]): number {
  let score = 0;
  let aceCount = 0;

  // go through the cards
  for (const card of hand) {
    if (card.value === 'Ace') {
      aceCount++;
      score += 11;
    } else if (['Jack', 'Queen', 'King'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value, 10);
    }
  }

  // adjust score for aces
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}

export function dealInitialCards(deck: Card[]): {
  remainingDeck: Card[];
  player: Player;
  dealer: Player;
} {
  const player: Player = { hand: [], score: 0, name: 'Player' };
  const dealer: Player = { hand: [], score: 0, name: 'Dealer' };

  //   take card from deck and give to player or dealer
  dealCard(deck, player);
  dealCard(deck, dealer);
  dealCard(deck, player);
  dealCard(deck, dealer);

  // calculate scores
  player.score = calculateScore(player.hand);
  dealer.score = calculateScore(dealer.hand);

  return {
    remainingDeck: deck,
    player,
    dealer,
  };
}
