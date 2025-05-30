import type { Card } from './deck';
import {
  checkWinner,
  handleDealerTurn,
  handlePlayerHit,
  isBusted,
  startNewGame,
} from './gameController';
import type { Player } from './gameState';

export interface GameState {
  player: Player | null;
  dealer: Player | null;
  deck: Card[];
  result: string | null;
}

export const initialState: GameState = {
  player: null,
  dealer: null,
  deck: [],
  result: null,
};

export type GameAction =
  | { type: 'NEW_GAME' }
  | { type: 'PLAYER_HIT' }
  | { type: 'PLAYER_STAND' }
  | { type: 'SET_RESULT'; payload: string };

export function gameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'NEW_GAME': {
      const { player, dealer, remainingDeck } = startNewGame();
      return { ...state, player, dealer, deck: remainingDeck, result: null };
    }

    case 'PLAYER_HIT': {
      if (!state.player || state.deck.length === 0) return state;

      const { updatedPlayer, updatedDeck } = handlePlayerHit(
        state.player,
        state.deck
      );
      const isPlayerBusted = isBusted(updatedPlayer.score);

      return {
        ...state,
        player: updatedPlayer,
        deck: updatedDeck,
        result: isPlayerBusted ? 'You are busted! Dealer wins!' : state.result,
      };
    }

    case 'PLAYER_STAND': {
      if (!state.dealer || !state.player || state.deck.length === 0)
        return state;

      const { updatedDealer, updatedDeck } = handleDealerTurn(
        state.dealer,
        state.deck
      );
      const result = checkWinner(state.player.score, updatedDealer.score);

      return {
        ...state,
        dealer: updatedDealer,
        deck: updatedDeck,
        result: result,
      };
    }

    case 'SET_RESULT': {
      return { ...state, result: action.payload };
    }

    default:
      return state;
  }
}
