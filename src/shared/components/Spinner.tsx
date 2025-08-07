import React from 'react';

interface SpinnerProps {
   isLoading?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading = false }) => {
   if (!isLoading) return null;

   const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
   };

   const spinnerStyle: React.CSSProperties = {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid var(--color-primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
   };

   const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

   return (
      <>
         <style>{keyframes}</style>
         <div style={overlayStyle}>
            <div style={spinnerStyle}></div>
         </div>
      </>
   );
};

export default Spinner;
