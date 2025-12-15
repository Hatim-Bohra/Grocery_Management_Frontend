import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { getErrorMessage } from '../api/utils';

export const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: Parameters<typeof api.auth.login>[0]) => {
        setLoading(true);
        setError(null);
        try {
            await api.auth.login(credentials);
            navigate('/');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: Parameters<typeof api.auth.register>[0]) => {
        setLoading(true);
        setError(null);
        try {
            await api.auth.register(userData);
            navigate('/login');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        api.auth.logout();
        navigate('/login');
    };

    return { login, register, logout, loading, error, setError };
};
