import { useCallback, type Dispatch } from 'react';
import type { GameAction } from '../logic/gameReducer';

export function useGameActions(
  dispatch: Dispatch<GameAction>,
  gameOver: boolean
) {
  const onHit = useCallback(() => {
    if (!gameOver) dispatch({ type: 'PLAYER_HIT' });
  }, [dispatch, gameOver]);

  const onStand = useCallback(() => {
    if (!gameOver) dispatch({ type: 'PLAYER_STAND' });
  }, [dispatch, gameOver]);

  const onReset = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
    dispatch({ type: 'RESET_GAME_OVER' });
  }, [dispatch]);

  const onResetStats = useCallback(() => {
    dispatch({ type: 'RESET_STATS' });
  }, [dispatch]);

  return { onHit, onStand, onReset, onResetStats };
}
