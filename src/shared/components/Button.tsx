import React, { CSSProperties } from 'react';

interface ButtonProps {
   handleClick?: () => void;
   type?: 'button' | 'submit' | 'reset';
   variant?: 'primary' | 'secondary';
   disabled?: boolean;
   style?: CSSProperties;
   label?: string;
}

const Button: React.FC<ButtonProps> = ({
   handleClick,
   type = 'button',
   variant = 'primary',
   disabled = false,
   style,
   label,
}) => {
   return (
      <button
         type={type}
         onClick={handleClick}
         disabled={disabled}
         style={{
            backgroundColor: variant === 'primary' ? 'var(--color-primary)' : 'var(--color-gray-600)',
            color: 'var(--color-white)',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            fontWeight: 500,
            ...style,
         }}
      >
         {label}
      </button>
   );
};

export default Button;
