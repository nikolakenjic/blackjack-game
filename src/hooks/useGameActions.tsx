import { useCallback, type Dispatch } from 'react';
import type { GameAction } from '../logic/gameReducer';

export function useGameActions(
  dispatch: Dispatch<GameAction>,
  gameOver: boolean
) {
  // Check if game is over before dispatching action
  const isGameOver = useCallback(
    (action: GameAction) => {
      if (!gameOver) dispatch(action);
      else alert('Game is already over! Please start a new game.');
    },
    [dispatch, gameOver]
  );

  //   Actions
  const onHit = useCallback(() => {
    isGameOver({ type: 'PLAYER_HIT' });
  }, [isGameOver]);

  const onStand = useCallback(() => {
    isGameOver({ type: 'PLAYER_STAND' });
  }, [isGameOver]);

  const onReset = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
    dispatch({ type: 'RESET_GAME_OVER' });
  }, [dispatch]);

  const onResetStats = useCallback(() => {
    dispatch({ type: 'RESET_STATS' });
  }, [dispatch]);

  const onStartGame = useCallback(
    (deposit: number) => {
      dispatch({ type: 'INIT_GAME', deposit });
    },
    [dispatch]
  );

  return { onHit, onStand, onReset, onResetStats, onStartGame };
}
