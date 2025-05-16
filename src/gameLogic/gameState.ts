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
