import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Store } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  userType: 'user' | 'shopkeeper';
  onUserTypeChange: (type: 'user' | 'shopkeeper') => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  userType,
  onUserTypeChange,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-20" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 rounded-2xl relative"
      >
        {/* User Type Toggle */}
        <div className="flex p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl mb-8 relative">
          <motion.div
            className="absolute top-1 bottom-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
            initial={false}
            animate={{
              left: userType === 'user' ? '4px' : '50%',
              width: 'calc(50% - 4px)',
              x: userType === 'shopkeeper' ? '0%' : '0%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          <button
            onClick={() => onUserTypeChange('user')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium relative z-10 transition-colors ${
              userType === 'user' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingBag size={18} />
            Customer
          </button>
          
          <button
            onClick={() => onUserTypeChange('shopkeeper')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium relative z-10 transition-colors ${
              userType === 'shopkeeper' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Store size={18} />
            Shopkeeper
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gradient">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};
