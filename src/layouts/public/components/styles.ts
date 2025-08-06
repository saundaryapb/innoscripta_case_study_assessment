import { CSSProperties } from 'react';

export const layoutStyles: { [key: string]: CSSProperties } = {
   container: {
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   content: {
      width: '100%',
      maxWidth: '400px',
      padding: '0 20px',
   },
};
