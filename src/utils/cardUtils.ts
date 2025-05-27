export const getCardEmoji = (suit: string): string => {
  switch (suit) {
    case 'Hearts':
      return '♥️';
    case 'Diamonds':
      return '♦️';
    case 'Spades':
      return '♠️';
    case 'Clubs':
      return '♣️';
    default:
      return '';
  }
};
