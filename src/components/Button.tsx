import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'green' | 'red' | 'blue';
};

const variantClasses = {
  green: 'bg-green-600 hover:bg-green-700',
  red: 'bg-red-600 hover:bg-red-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
};

const Button = ({
  variant = 'blue',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
