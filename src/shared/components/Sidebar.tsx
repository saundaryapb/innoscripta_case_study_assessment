import React, { useCallback, useMemo, useState, CSSProperties } from 'react';
import { sidebarStyles } from './styles';
import CustomCard from './Card';
import CustomButton from './Button';

interface SidebarProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   width?: string;
   children: React.ReactNode;
   style?: CSSProperties;
   className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
   isOpen,
   onClose,
   title,
   width = '320px',
   children,
   style = {},
   className = '',
}) => {
   const [isClosing, setIsClosing] = useState(false);

   const handleClose = useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
         onClose();
         setIsClosing(false);
      }, 300);
   }, [onClose]);

   const handleOverlayClick = useCallback(() => {
      handleClose();
   }, [handleClose]);

   const handleSidebarClick = useCallback((event: React.MouseEvent) => {
      event.stopPropagation();
   }, []);

   const overlayStyle = useMemo(
      (): CSSProperties => ({
         ...sidebarStyles.overlay,
         ...(isOpen && !isClosing ? sidebarStyles.overlayOpen : {}),
      }),
      [isOpen, isClosing]
   );

   const containerStyle = useMemo(
      (): CSSProperties => ({
         ...sidebarStyles.container,
         ...sidebarStyles.containerRight,
         ...(isOpen && !isClosing ? sidebarStyles.containerOpen : {}),
         width,
         position: 'fixed',
         top: 0,
         bottom: 0,
         zIndex: 1300,
         margin: 0,
         padding: 0,
         ...style,
      }),
      [isOpen, isClosing, width, style]
   );

   const shouldRender = useMemo(() => isOpen || isClosing, [isOpen, isClosing]);

   if (!shouldRender) {
      return null;
   }

   return (
      <>
         {/* Overlay */}
         <div
            style={overlayStyle}
            onClick={handleOverlayClick}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar"
         />

         {/* Sidebar */}
         <div
            style={containerStyle}
            className={className}
            onClick={handleSidebarClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'sidebar-title' : undefined}
         >
            {/* Header */}
            <div style={sidebarStyles.header}>
               {title && (
                  <h2 id="sidebar-title" style={sidebarStyles.title}>
                     {title}
                  </h2>
               )}
               <CustomButton
                  label="×"
                  handleClick={handleClose}
                  variant="secondary"
                  style={sidebarStyles.closeButton}
               />
            </div>

            {/* Content */}
            <CustomCard style={sidebarStyles.content}>{children}</CustomCard>
         </div>
      </>
   );
};

export default Sidebar;
