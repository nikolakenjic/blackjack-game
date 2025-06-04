import { useEffect, type Dispatch } from 'react';
import { checkWinner, isBusted } from '../logic/gameController';
import type { GameAction } from '../logic/gameReducer';
import type { Player } from '../logic/gameState';

interface UseGameResultProps {
  player: Player | null;
  dealer: Player | null;
  gameOver: boolean;
  dispatch: Dispatch<GameAction>;
}

export function useGameResult({
  player,
  dealer,
  gameOver,
  dispatch,
}: UseGameResultProps) {
  useEffect(() => {
    if (!gameOver) return;

    const timeOutId = setTimeout(() => {
      if (!player || !dealer) return;

      if (isBusted(player.score)) {
        dispatch({
          type: 'SET_RESULT',
          payload: 'You are busted! Dealer wins!',
        });
      } else {
        const winnerMessage = checkWinner(player.score, dealer.score);
        dispatch({ type: 'SET_RESULT', payload: winnerMessage });
      }
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [dealer, gameOver, player, dispatch]);
}
