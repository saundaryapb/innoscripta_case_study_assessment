import React, { CSSProperties } from 'react';

interface ButtonProps {
   handleClick?: () => void;
   type?: 'button' | 'submit' | 'reset';
   variant?: 'primary' | 'secondary';
   disabled?: boolean;
   style?: CSSProperties;
   label?: string;
   stopPropagation?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   handleClick,
   type = 'button',
   variant = 'primary',
   disabled = false,
   style,
   label,
   stopPropagation = false,
}) => {
   // stopPropagation is used to prevent the event from bubbling up to parent elements
   // This is useful in drag-and-drop scenarios or when you want to prevent default behavior
   const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
         event.stopPropagation();
      }
      if (handleClick) {
         handleClick();
      }
   };

   const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
         event.stopPropagation();
      }
   };

   const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      if (stopPropagation) {
         event.stopPropagation();
      }
   };

   return (
      <button
         type={type}
         onClick={handleChange}
         onMouseDown={handleMouseDown}
         onPointerDown={handlePointerDown}
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
