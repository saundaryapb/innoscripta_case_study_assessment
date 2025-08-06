import { CSSProperties } from 'react';

export const loginStyles: { [key: string]: CSSProperties } = {
   loginCard: {
      padding: '32px',
      maxWidth: '450px',
   },
   mainHeading: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'var(--color-gray-900)',
      textAlign: 'center',
      marginBottom: '8px',
   },
   subHeading: {
      fontSize: '16px',
      color: 'var(--color-gray-600)',
      textAlign: 'center',
      marginBottom: '24px',
   },
   userGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginTop: '24px',
   },
   userCard: {
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      transform: 'scale(1)',
   },
   userName: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'var(--color-gray-900)',
      marginBottom: '4px',
   },
   userRole: {
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'capitalize',
      marginBottom: '4px',
   },
};
