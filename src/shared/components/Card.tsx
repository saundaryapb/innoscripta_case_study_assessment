import React, { CSSProperties, FC } from 'react';

interface CardProps {
   children: React.ReactNode;
   style?: CSSProperties;
   handleClick?: () => void;
   className?: string;
}

const Card: FC<CardProps> = ({ children, style = {}, handleClick, className = '' }) => {
   const baseStyles: CSSProperties = {
      padding: '20px',
      borderRadius: '5px',
      backgroundColor: 'var(--color-white)',
      border: '1px solid var(--color-gray-100)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      cursor: handleClick ? 'pointer' : 'default',
      transition: 'all 0.2s ease-in-out',
      ...style,
   };

   return (
      <div className={className} style={baseStyles} onClick={handleClick}>
         {children}
      </div>
   );
};

export default Card;
