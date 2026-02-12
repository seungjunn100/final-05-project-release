'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'rounded-[50px] font-semibold shadow-lg transition';
  
  const variantStyles = {
    primary: 'bg-yg-primary text-white hover:bg-yg-primary/80',
    secondary: 'bg-yg-secondary text-white hover:bg-yg-secondary/80',
    gray: 'bg-yg-gray text-white hover:bg-yg-gray/80',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-3',
  };

  const disabledStyles = 'disabled:bg-yg-gray disabled:cursor-not-allowed';
  const cursorStyle = disabled ? '' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${cursorStyle} ${className}`}
    >
      {children}
    </button>
  );
}