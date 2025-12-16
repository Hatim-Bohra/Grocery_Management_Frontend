import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Navbar } from '../../components/Layout/Navbar';
import { Footer } from '../../components/Layout/Footer';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

export const Signup: React.FC = () => {
  const { register, loading, error, setError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-error-500' };
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-warning-500' };
    return { strength: 3, label: 'Strong', color: 'bg-success-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center py-12 px-4">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2 className="auth-title">Join Us</h2>
              <p className="auth-subtitle">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="p-4 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm flex items-start gap-3">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  icon={User}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />

                <div>
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    icon={Lock}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={loading}
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-secondary">Password strength:</span>
                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength.strength === 1
                              ? 'text-error-600'
                              : passwordStrength.strength === 2
                                ? 'text-warning-600'
                                : 'text-success-600'
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={loading}
                />

                {formData.confirmPassword && (
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      formData.password === formData.confirmPassword
                        ? 'text-success-600'
                        : 'text-error-600'
                    }`}
                  >
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        <span>Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                aria-label="Create your account"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Creating Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Start Your Journey</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-secondary font-medium">
                    Already have an account?
                  </span>
                </div>
              </div>

              <Link to="/login" className="btn btn-secondary">
                Sign in
              </Link>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
