import type React from 'react';

interface ThemeButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  active?: boolean;
}

const ThemeButton = ({ icon: Icon, onClick, active }: ThemeButtonProps) => {
  return (
    <button
      className={`bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-100/20 rounded-lg p-3 cursor-pointer ${
        active ? 'bg-zinc-300 dark:bg-zinc-600' : ''
      }`}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default ThemeButton;
