import { CSSProperties } from 'react';

export const dropdownStyles: { [key: string]: CSSProperties } = {
   container: {
      width: '100%',
      position: 'relative',
   },

   label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: 500,
      color: 'var(--color-gray-700, #374151)',
   },

   dropdownField: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      outline: 'none',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   dropdownFieldDefault: {
      border: '1px solid var(--color-gray-300, #d1d5db)',
      backgroundColor: 'var(--color-white, #ffffff)',
      color: 'var(--color-gray-900, #111827)',
      cursor: 'pointer',
   },

   dropdownFieldDisabled: {
      border: '1px solid var(--color-gray-300, #d1d5db)',
      backgroundColor: 'var(--color-gray-50, #f9fafb)',
      color: 'var(--color-gray-400, #9ca3af)',
      cursor: 'not-allowed',
   },

   dropdownFieldError: {
      border: '1px solid var(--color-error, #ef4444)',
   },

   dropdownFieldFocused: {
      borderColor: 'var(--color-primary)',
      boxShadow: '0 0 0 3px var(--color-primary-light, rgba(var(--color-primary-rgb, 59, 130, 246), 0.1))',
   },

   arrow: {
      fontSize: '12px',
      color: 'var(--color-gray-400, #9ca3af)',
      transition: 'transform 0.2s ease-in-out',
   },

   arrowOpen: {
      transform: 'rotate(180deg)',
   },

   arrowClosed: {
      transform: 'rotate(0deg)',
   },

   optionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'var(--color-white, #ffffff)',
      border: '1px solid var(--color-gray-300, #d1d5db)',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      maxHeight: '200px',
      overflowY: 'auto',
      marginTop: '2px',
   },

   option: {
      padding: '12px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      borderBottom: '1px solid var(--color-gray-100, #f3f4f6)',
      transition: 'background-color 0.2s ease-in-out',
   },

   optionDefault: {
      backgroundColor: 'transparent',
      color: 'var(--color-gray-900, #111827)',
   },

   optionSelected: {
      backgroundColor: 'var(--color-primary-light, #eff6ff)',
      color: 'var(--color-primary)',
   },

   optionHovered: {
      backgroundColor: 'var(--color-gray-50, #f9fafb)',
   },

   optionEmpty: {
      color: 'var(--color-gray-400, #9ca3af)',
   },

   checkmark: {
      float: 'right' as const,
      color: 'var(--color-primary)',
   },

   requiredIndicator: {
      color: 'var(--color-error, #ef4444)',
   },

   error: {
      marginTop: '4px',
      fontSize: '12px',
      color: 'var(--color-error, #ef4444)',
   },
};

export const snackbarStyles: { [key: string]: CSSProperties } = {
   container: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '288px',
      maxWidth: '500px',
      padding: '12px 16px',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      fontSize: '14px',
      fontFamily: 'inherit',
      fontWeight: 500,
      backgroundColor: 'var(--color-primary, #3b82f6)',
      color: 'var(--color-white, #ffffff)',
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1300,
   },

   message: {
      flex: 1,
      margin: 0,
      lineHeight: '1.4',
   },

   closeButton: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '2px',
      fontSize: '16px',
      fontWeight: 'bold',
      opacity: 0.8,
      transition: 'opacity 0.2s ease-in-out',
   },

   closeButtonHover: {
      opacity: 1,
   },
};
