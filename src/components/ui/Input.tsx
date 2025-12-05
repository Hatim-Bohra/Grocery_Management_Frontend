import React from 'react';
import type { InputHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

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
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`
            w-full bg-white/50 dark:bg-gray-800/50 border 
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500'}
            rounded-lg py-2.5 ${Icon ? 'pl-10' : 'pl-4'} pr-4
            text-gray-900 dark:text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            transition-all duration-200
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};
