import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { Input } from '../../components/ui/Input';

export const Login: React.FC = () => {
    const [userType, setUserType] = useState<'user' | 'shopkeeper'>('user');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempt:', { userType, ...formData });
        // TODO: Implement actual login logic
    };

    return (
        <AuthLayout
            title={`Welcome Back, ${userType === 'user' ? 'Customer' : 'Partner'}`}
            subtitle="Sign in to continue to your account"
            userType={userType}
            onUserTypeChange={setUserType}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        Remember me
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Forgot password?
                    </a>
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 mt-6">
                    Sign In
                    <ArrowRight size={18} />
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Create account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
