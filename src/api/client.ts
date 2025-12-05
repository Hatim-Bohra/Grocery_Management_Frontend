import axios, { AxiosError } from 'axios';
import type { User, Product, GroceryList, ShareLink, ListItem } from '../types';

// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            // For now, we'll just clear the token
            sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const api = {
    auth: {
        login: async (credentials: { email: string; password: string }) => {
            const { data } = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
            sessionStorage.setItem('accessToken', data.token);
            return data.user;
        },
        signup: async (userData: { email: string; password: string; name: string; role: 'customer' | 'shopkeeper' }) => {
            const { data } = await apiClient.post<{ user: User; token: string }>('/auth/signup', userData);
            sessionStorage.setItem('accessToken', data.token);
            return data.user;
        },
        logout: () => {
            sessionStorage.removeItem('accessToken');
        }
    },
    products: {
        getAll: async (params?: { search?: string; category?: string }) => {
            // Mock data for initial development if backend isn't ready
            // Remove this mock return when connecting to real backend
            /*
          const { data } = await apiClient.get<Product[]>('/products', { params });
          return data;
          */
            // Mock return for visual testing
            return new Promise<Product[]>((resolve) => {
                setTimeout(() => {
                    resolve([
                        { id: '1', name: 'Apples', category: 'Fruits', price: 2.5, unit: 'kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300' },
                        { id: '2', name: 'Milk', category: 'Dairy', price: 1.2, unit: 'L', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300' },
                        { id: '3', name: 'Bread', category: 'Bakery', price: 3.0, unit: 'loaf', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300' },
                        { id: '4', name: 'Bananas', category: 'Fruits', price: 1.8, unit: 'bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=300' },
                        { id: '5', name: 'Pasta', category: 'Pantry', price: 1.5, unit: 'pack', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=300' },
                    ].filter(p => !params?.search || p.name.toLowerCase().includes(params.search.toLowerCase())));
                }, 500);
            });
        },
    },
    lists: {
        create: async (name: string) => {
            const { data } = await apiClient.post<GroceryList>('/lists', { name });
            return data;
        },
        getAll: async () => {
            const { data } = await apiClient.get<GroceryList[]>('/lists');
            return data;
        },
        getById: async (id: string) => {
            const { data } = await apiClient.get<GroceryList>(`/lists/${id}`);
            return data;
        },
        updateItem: async (listId: string, itemId: string, updates: Partial<ListItem>) => {
            const { data } = await apiClient.patch<GroceryList>(`/lists/${listId}/items/${itemId}`, updates);
            return data;
        },
        addItem: async (listId: string, productId: string, quantity: number) => {
            const { data } = await apiClient.post<GroceryList>(`/lists/${listId}/items`, { productId, quantity });
            return data;
        },
        share: async (listId: string) => {
            const { data } = await apiClient.post<ShareLink>(`/lists/${listId}/share`);
            return data;
        }
    },
    share: {
        getByShareId: async (shareId: string) => {
            const { data } = await apiClient.get<ShareLink>(`/share/${shareId}`);
            return data;
        }
    }
};

export default apiClient;
