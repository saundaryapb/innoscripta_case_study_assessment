import React, { CSSProperties, useEffect, useState } from 'react';
import { snackbarStyles } from './styles';
import CustomButton from './Button';

interface SnackbarAction {
   label?: string;
   type?: any;
}

interface CustomSnackbarProps {
   message: string;
   open: boolean;
   handleChange: (open: boolean) => void;
   action?: SnackbarAction;
   style?: CSSProperties;
   className?: string;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
   message,
   open,
   handleChange,
   action,
   style,
   className = '',
}) => {
   const [isVisible, setIsVisible] = useState(false);
   const [shouldRender, setShouldRender] = useState(false);

   useEffect(() => {
      if (open) {
         setShouldRender(true);
         setTimeout(() => setIsVisible(true), 10);
         const timer = setTimeout(() => {
            handleClose();
         }, 4000);

         return () => clearTimeout(timer);
      } else {
         handleClose();
      }
   }, [open]);

   const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
         setShouldRender(false);
         handleChange(false);
      }, 300);
   };

   const handleButtonClick = () => {
      if (action?.label && action?.type) {
         handleChange(action.type);
      }
      handleClose();
   };

   if (!shouldRender) return null;

   const containerStyles: CSSProperties = {
      ...snackbarStyles.container,
      transform: `translateX(-50%) translateY(${isVisible ? '0' : '100%'})`,
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      ...style,
   };

   const buttonLabel = action?.label || '×';

   return (
      <div style={containerStyles} className={className}>
         <span style={snackbarStyles.message}>{message}</span>

         <CustomButton
            handleClick={handleButtonClick}
            label={buttonLabel}
            style={snackbarStyles.closeButton}
            stopPropagation={true}
         />
      </div>
   );
};

export default CustomSnackbar;
