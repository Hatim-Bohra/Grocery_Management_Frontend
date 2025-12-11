import React from 'react';
import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="input-wrapper">
      <div className="input-container">
        {Icon && (
          <div className="input-icon">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`input ${Icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''} ${className}`}
          {...props}
          placeholder=" "
        />
        <label className={`label ${Icon ? 'label-with-icon' : ''}`}>{label}</label>
      </div>
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};
