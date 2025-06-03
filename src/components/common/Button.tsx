import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'green' | 'red' | 'blue' | 'gradient' | 'purple';
};

const variantClasses = {
  green: 'bg-green-600 hover:bg-green-700',
  red: 'bg-red-600 hover:bg-red-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  gradient:
    'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
};

const Button = ({
  variant = 'blue',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded transition ${variantClasses[variant]} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
