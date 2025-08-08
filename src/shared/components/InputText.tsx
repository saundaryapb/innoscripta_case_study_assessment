import React, { CSSProperties, ChangeEvent, KeyboardEvent } from 'react';

interface CustomInputTextProps {
   label?: string;
   value?: string;
   error?: string;
   required?: boolean;
   disabled?: boolean;
   inputType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
   handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   handleKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
   className?: string;
   placeholder?: string;
   style?: CSSProperties;
}

const CustomInputText: React.FC<CustomInputTextProps> = ({
   label,
   value = '',
   error,
   required = false,
   disabled = false,
   inputType = 'text',
   handleChange,
   handleKeyPress,
   className = '',
   placeholder,
   style,
}) => {
   const baseInputStyles: CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      border: `1px solid ${error ? 'var(--color-error, #ef4444)' : 'var(--color-gray-300, #d1d5db)'}`,
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'inherit',
      backgroundColor: disabled ? 'var(--color-gray-50, #f9fafb)' : 'var(--color-white, #ffffff)',
      color: disabled ? 'var(--color-gray-400, #9ca3af)' : 'var(--color-gray-900, #111827)',
      cursor: disabled ? 'not-allowed' : 'text',
      transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      outline: 'none',
      ...style,
   };

   const labelStyles: CSSProperties = {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: 500,
      color: 'var(--color-gray-700, #374151)',
   };

   const errorStyles: CSSProperties = {
      marginTop: '4px',
      fontSize: '12px',
      color: 'var(--color-error, #ef4444)',
   };

   const containerStyles: CSSProperties = {
      width: '100%',
   };

   return (
      <div style={containerStyles} className={className}>
         {label && (
            <label style={labelStyles}>
               {label}
               {required && <span style={{ color: 'var(--color-error, #ef4444)' }}> *</span>}
            </label>
         )}

         <input
            type={inputType}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            style={baseInputStyles}
            onFocus={(e) => {
               e.target.style.borderColor = 'var(--color-primary)';
               e.target.style.boxShadow =
                  '0 0 0 3px var(--color-primary-light, rgba(var(--color-primary-rgb, 59, 130, 246), 0.1))';
            }}
            onBlur={(e) => {
               e.target.style.borderColor = error ? 'var(--color-error, #ef4444)' : 'var(--color-gray-300, #d1d5db)';
               e.target.style.boxShadow = 'none';
            }}
         />

         {error && <div style={errorStyles}>{error}</div>}
      </div>
   );
};

export default CustomInputText;
