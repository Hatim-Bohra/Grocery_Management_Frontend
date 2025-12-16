import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Navbar } from '../../components/Layout/Navbar';
import { Footer } from '../../components/Layout/Footer';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

export const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex items-center justify-center py-12 px-4">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Sign in to continue to your account</p>
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
                  label="Email Address"
                  type="email"
                  name="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />

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
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 transition-all cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                aria-label="Sign in to your account"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Account</span>
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
                    New to our platform?
                  </span>
                </div>
              </div>

              <Link to="/signup" className="btn btn-secondary">
                Create account
              </Link>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
