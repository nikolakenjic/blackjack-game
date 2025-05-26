import type React from 'react';

interface ThemeButtonProps {
  icon: React.ElementType;
  onClick: () => void;
}

const ThemeButton = ({ icon: Icon, onClick }: ThemeButtonProps) => {
  return (
    <button
      className="bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-100/20 rounded-lg p-3"
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default ThemeButton;
