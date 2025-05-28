import { useEffect, useState } from 'react';
import { THEMES, type Theme } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);

  // add dark/light theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === THEMES.DARK) setTheme(THEMES.DARK);
  }, []);

  useEffect(() => {
    if (theme === THEMES.DARK) document.body.classList.add(THEMES.DARK);
    else document.body.classList.remove(THEMES.DARK);

    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
