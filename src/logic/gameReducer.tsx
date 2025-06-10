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
  gameStarted: boolean;
  bankroll: number;
  currentBet: number;
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
  gameStarted: false,
  bankroll: 0,
  currentBet: 0,
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
    }
  | { type: 'RESET_STATS' }
  | { type: 'SET_DEPOSIT'; payload: number }
  | { type: 'SET_BET'; payload: number };

export function gameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case 'NEW_GAME': {
      if (state.bankroll < state.currentBet) return state;

      const { player, dealer, remainingDeck } = startNewGame();
      return {
        ...state,
        player,
        dealer,
        deck: remainingDeck,
        result: null,
        gameOver: false,
        bankroll: state.bankroll - state.currentBet,
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

    case 'RESET_STATS': {
      const resetStats = { wins: 0, losses: 0, ties: 0 };
      localStorage.setItem('stats', JSON.stringify(resetStats));
      return { ...state, stats: resetStats };
    }

    case 'SET_DEPOSIT': {
      return {
        ...state,
        bankroll: action.payload,
        gameStarted: true,
      };
    }

    case 'SET_BET': {
      return {
        ...state,
        currentBet: action.payload,
      };
    }

    default:
      return state;
  }
}
