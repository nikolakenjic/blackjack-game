import { useEffect, type Dispatch } from 'react';
import type { GameAction } from '../logic/gameReducer';

export function useInitializeGame(dispatch: Dispatch<GameAction>) {
  useEffect(() => {
    const storedStats = localStorage.getItem('stats');
    if (storedStats) {
      dispatch({ type: 'LOAD_STATS', payload: JSON.parse(storedStats) });
    }

    dispatch({ type: 'NEW_GAME' });
  }, [dispatch]);
}
