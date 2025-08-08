import { CSSProperties } from 'react';

export const boardStyles: { [key: string]: CSSProperties } = {
   container: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      marginTop: '10px',
   },

   header: {
      marginBottom: '32px',
   },

   title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '0 0 6px 0',
      letterSpacing: '-0.3px',
   },

   subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0',
      fontWeight: '400',
   },

   filterSection: {
      marginBottom: '24px',
   },

   contentSection: {
      marginTop: '24px',
   },

   placeholder: {
      padding: '48px 24px',
      textAlign: 'center' as const,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '2px dashed #e5e7eb',
      color: '#9ca3af',
      fontSize: '16px',
   },

   // Filter Section Styles
   filterContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
   },

   filterRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'end',
      flexWrap: 'wrap' as const,
   },

   filterField: {
      flex: '1',
      minWidth: '250px',
   },

   filterFieldSmall: {
      flex: '0 0 200px',
      minWidth: '200px',
   },

   filterActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
   },
};
