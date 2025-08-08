import React, { CSSProperties, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { dropdownStyles } from './styles';

interface DropdownOption {
   value: string;
   label: string;
}

interface CustomDropdownProps {
   open?: boolean;
   error?: string;
   label?: string;
   style?: CSSProperties;
   value?: string | string[];
   required?: boolean;
   disabled?: boolean;
   multiple?: boolean;
   options?: DropdownOption[];
   handleChange?: (value: string | string[]) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
   open = false,
   error,
   label,
   style,
   value,
   required = false,
   disabled = false,
   multiple = false,
   options = [],
   handleChange,
}) => {
   const [isOpen, setIsOpen] = useState(open);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const normalizedValue = useMemo(() => {
      return value !== undefined ? value : multiple ? [] : '';
   }, [value, multiple]);

   const handleFieldFocus = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
         if (!disabled) {
            Object.assign(e.currentTarget.style, dropdownStyles.dropdownFieldFocused);
         }
      },
      [disabled]
   );

   const handleFieldBlur = useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
         e.currentTarget.style.borderColor = error ? 'var(--color-error, #ef4444)' : 'var(--color-gray-300, #d1d5db)';
         e.currentTarget.style.boxShadow = 'none';
      },
      [error]
   );

   const handleOptionMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, isSelected: boolean) => {
      if (!isSelected) {
         e.currentTarget.style.backgroundColor = 'var(--color-gray-50, #f9fafb)';
      }
   }, []);

   const handleOptionMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>, isSelected: boolean) => {
      if (!isSelected) {
         e.currentTarget.style.backgroundColor = 'transparent';
      }
   }, []);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleOptionClick = useCallback(
      (optionValue: string) => {
         if (disabled) return;

         let newValue: string | string[];

         if (multiple) {
            const currentValues = Array.isArray(normalizedValue) ? normalizedValue : [];
            if (currentValues.includes(optionValue)) {
               newValue = currentValues.filter((v) => v !== optionValue);
            } else {
               newValue = [...currentValues, optionValue];
            }
         } else {
            newValue = optionValue;
            setIsOpen(false);
         }

         handleChange?.(newValue);
      },
      [disabled, multiple, normalizedValue, handleChange]
   );

   const getDisplayText = useCallback(() => {
      if (multiple && Array.isArray(normalizedValue)) {
         if (normalizedValue.length === 0) return 'Select options...';
         const selectedLabels = normalizedValue
            .map((value) => {
               const option = options.find((opt) => opt.value === value);
               return option?.label || value;
            })
            .join(', ');

         return selectedLabels;
      } else {
         const selectedOption = options.find((opt) => opt.value === normalizedValue);
         return selectedOption?.label || normalizedValue || 'Select an option...';
      }
   }, [multiple, normalizedValue, options]);

   const isOptionSelected = useCallback(
      (optionValue: string) => {
         if (multiple && Array.isArray(normalizedValue)) {
            return normalizedValue.includes(optionValue);
         }
         return normalizedValue === optionValue;
      },
      [multiple, normalizedValue]
   );

   const getFieldStyles = (): CSSProperties => ({
      ...dropdownStyles.dropdownField,
      ...(disabled ? dropdownStyles.dropdownFieldDisabled : dropdownStyles.dropdownFieldDefault),
      ...(error ? dropdownStyles.dropdownFieldError : {}),
      ...style,
   });

   const getArrowStyles = (): CSSProperties => ({
      ...dropdownStyles.arrow,
      ...(isOpen ? dropdownStyles.arrowOpen : dropdownStyles.arrowClosed),
   });

   const getOptionStyles = (optionValue: string): CSSProperties => {
      const isSelected = isOptionSelected(optionValue);
      return {
         ...dropdownStyles.option,
         ...(isSelected ? dropdownStyles.optionSelected : dropdownStyles.optionDefault),
      };
   };

   return (
      <div style={dropdownStyles.container} ref={dropdownRef}>
         {label && (
            <label style={dropdownStyles.label}>
               {label}
               {required && <span style={dropdownStyles.requiredIndicator}> *</span>}
            </label>
         )}

         <div
            style={getFieldStyles()}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            tabIndex={disabled ? -1 : 0}
         >
            <span>{getDisplayText()}</span>
            <span style={getArrowStyles()}>▼</span>
         </div>

         {isOpen && !disabled && (
            <div style={dropdownStyles.optionsContainer}>
               {options.map((option) => {
                  const isSelected = isOptionSelected(option.value);
                  return (
                     <div
                        key={option.value}
                        style={getOptionStyles(option.value)}
                        onClick={() => handleOptionClick(option.value)}
                        onMouseEnter={(e) => handleOptionMouseEnter(e, isSelected)}
                        onMouseLeave={(e) => handleOptionMouseLeave(e, isSelected)}
                     >
                        {option.label}
                        {multiple && isSelected && <span style={dropdownStyles.checkmark}>✓</span>}
                     </div>
                  );
               })}
               {options.length === 0 && (
                  <div style={{ ...dropdownStyles.option, ...dropdownStyles.optionEmpty }}>No options available</div>
               )}
            </div>
         )}

         {error && <div style={dropdownStyles.error}>{error}</div>}
      </div>
   );
};

export default CustomDropdown;
