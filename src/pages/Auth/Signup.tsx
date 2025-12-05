import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Store, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../../components/Auth/AuthLayout';
import { Input } from '../../components/ui/Input';

export const Signup: React.FC = () => {
    const [userType, setUserType] = useState<'user' | 'shopkeeper'>('user');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        shopName: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Signup attempt:', { userType, ...formData });
        // TODO: Implement actual signup logic
    };

    return (
        <AuthLayout
            title={`Join as a ${userType === 'user' ? 'Customer' : 'Partner'}`}
            subtitle="Create your account to get started"
            userType={userType}
            onUserTypeChange={setUserType}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={User}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                {userType === 'shopkeeper' && (
                    <Input
                        label="Shop Name"
                        type="text"
                        placeholder="My Grocery Store"
                        icon={Store}
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        required
                    />
                )}

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

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 mt-6">
                    Create Account
                    <ArrowRight size={18} />
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
