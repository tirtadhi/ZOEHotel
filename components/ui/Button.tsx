import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-3d transform-gpu';

  const variants = {
    primary:
      'bg-red-800 text-white hover:bg-red-900 shadow-lg hover:shadow-2xl active:scale-95',
    secondary:
      'bg-gray-500 text-white hover:bg-gray-600 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-red-800 text-red-800 hover:bg-red-50 hover:border-red-900',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
