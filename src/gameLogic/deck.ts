export interface Card {
  suit: string;
  value: string;
}

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace',
];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return shuffleDeck(deck);
}

function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
