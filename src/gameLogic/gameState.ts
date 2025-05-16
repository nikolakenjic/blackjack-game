import type { Card } from './deck';

export interface Player {
  name: string;
  score: number;
  hand: Card[];
}

function dealCard(deck: Card[], player: Player) {
  const card = deck.shift();
  if (!card) throw new Error('Not enough cards in deck');

  player.hand.push(card);
}

function calculateScore(hand: Card[]): number {
  let score = 0;
  let aceCount = 0;

  // go through the cards
  for (const card of hand) {
    if (card.value === 'Ace') {
      aceCount++;
    } else if (['Jack', 'Queen', 'King'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }

  //   Add "Aces" to score
  for (let i = 0; i < aceCount; i++) {
    // If you can add 11 without going over 21, add 11, otherwise add 1
    if (score + 11 <= 21) {
      score += 11;
    } else {
      score += 1;
    }
  }

  return score;
}

function dealInitialCards(deck: Card[]): {
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

  return {
    remainingDeck: deck,
    player,
    dealer,
  };
}
