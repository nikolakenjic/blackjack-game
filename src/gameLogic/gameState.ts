import type { Card } from './deck';

export interface Player {
  name: string;
  score: number;
  hand: Card[];
}

function dealInitialCards(deck: Card[]): {
  updateDeck: Card[];
  player: Player;
  dealer: Player;
} {
  const player: Player = { hand: [], score: 0, name: 'Player' };
  const dealer: Player = { hand: [], score: 0, name: 'Dealer' };

  //   take card from deck and give to player or dealer
  const playerCard1 = deck.shift();
  if (!playerCard1) {
    throw new Error('Not enough cards in deck');
  }
  player.hand.push(playerCard1);

  const dealerCard1 = deck.shift();
  if (!dealerCard1) {
    throw new Error('Not enough cards in deck');
  }
  dealer.hand.push(dealerCard1);

  const playerCard2 = deck.shift();
  if (!playerCard2) {
    throw new Error('Not enough cards in deck');
  }
  player.hand.push(playerCard2);

  const dealerCard2 = deck.shift();
  if (!dealerCard2) {
    throw new Error('Not enough cards in deck');
  }
  dealer.hand.push(dealerCard2);

  //   // Take cards, 2 for player 2 for dealer
  //   const playerCard1 = deck.shift();
  //   const dealerCard1 = deck.shift();
  //   const playerCard2 = deck.shift();
  //   const dealerCard2 = deck.shift();

  //   if (deck.length < 4) {
  //     throw new Error('Not enough cards in deck');
  //   }

  //   if (!playerCard1 || !dealerCard1 || !playerCard2 || !dealerCard2) {
  //     throw new Error('Not enough cards to deal');
  //   }

  //   // Add cards to player and dealer
  //   player.hand.push(playerCard1);
  //   player.hand.push(playerCard2);
  //   dealer.hand.push(dealerCard1);
  //   dealer.hand.push(dealerCard2);

  return {
    updateDeck: deck,
    player,
    dealer,
  };
}
