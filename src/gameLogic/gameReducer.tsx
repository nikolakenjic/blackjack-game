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
  gameOver: boolean;
  stats: {
    wins: number;
    losses: number;
    ties: number;
  };
}

export const initialState: GameState = {
  player: null,
  dealer: null,
  deck: [],
  result: null,
  gameOver: false,
  stats: {
    wins: 0,
    losses: 0,
    ties: 0,
  },
};

export type GameAction =
  | { type: 'NEW_GAME' }
  | { type: 'PLAYER_HIT' }
  | { type: 'PLAYER_STAND' }
  | { type: 'SET_RESULT'; payload: string }
  | { type: 'RESET_GAME_OVER' }
  | {
      type: 'LOAD_STATS';
      payload: { wins: number; losses: number; ties: number };
    };

export function gameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'NEW_GAME': {
      const { player, dealer, remainingDeck } = startNewGame();
      return {
        ...state,
        player,
        dealer,
        deck: remainingDeck,
        result: null,
        gameOver: false,
      };
    }

    case 'PLAYER_HIT': {
      if (!state.player || state.deck.length === 0) return state;

      const { updatedPlayer, updatedDeck } = handlePlayerHit(
        state.player,
        state.deck
      );
      const isPlayerBusted = isBusted(updatedPlayer.score);

      const newStats = { ...state.stats };
      if (isPlayerBusted) {
        newStats.losses++;
        localStorage.setItem('stats', JSON.stringify(newStats));
      }

      return {
        ...state,
        player: updatedPlayer,
        deck: updatedDeck,
        gameOver: isPlayerBusted,
        stats: newStats,
      };
    }

    case 'PLAYER_STAND': {
      if (!state.dealer || !state.player || state.deck.length === 0)
        return state;

      const { updatedDealer, updatedDeck } = handleDealerTurn(
        state.dealer,
        state.deck
      );

      const winnerMessage = checkWinner(
        state.player.score,
        updatedDealer.score
      );

      const newStats = { ...state.stats };
      if (winnerMessage.includes('You win')) newStats.wins++;
      else if (winnerMessage.includes('Dealer wins')) newStats.losses++;
      else newStats.ties++;

      localStorage.setItem('stats', JSON.stringify(newStats));

      return {
        ...state,
        dealer: updatedDealer,
        deck: updatedDeck,
        gameOver: true,
        stats: newStats,
      };
    }

    case 'SET_RESULT': {
      return { ...state, result: action.payload };
    }

    case 'RESET_GAME_OVER': {
      return { ...state, gameOver: false, result: null };
    }

    case 'LOAD_STATS': {
      return { ...state, stats: action.payload };
    }

    default:
      return state;
  }
}
