import ThemeButton from '../common/ThemeButton';
import { LuSun } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';
import { THEMES, type Theme } from '../../utils/theme';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  // todo add dark/light theme active for theme props...

  return (
    <div className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-xl absolute top-5 right-5 flex gap-2">
      <ThemeButton icon={LuSun} onClick={() => setTheme(THEMES.LIGHT)} />
      <ThemeButton icon={LuMoon} onClick={() => setTheme(THEMES.DARK)} />
    </div>
  );
};

export default ThemeToggle;
