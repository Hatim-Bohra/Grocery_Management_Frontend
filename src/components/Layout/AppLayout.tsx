import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBasket, List, ClipboardList, LogOut, LayoutGrid } from 'lucide-react';
import { api } from '../../api/client';

export const AppLayout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        api.auth.logout();
        navigate('/login');
    }

    const navItems = [
        { path: '/products', icon: LayoutGrid, label: 'Products' },
        { path: '/list', icon: List, label: 'My List' },
        { path: '/my-lists', icon: ShoppingBasket, label: 'Saved Lists' }, // Changed from /lists to /my-lists to avoid conflict with creating specific list logic
        { path: '/board', icon: ClipboardList, label: 'Task Board' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                            <ShoppingBasket size={24} />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-lg leading-tight">GrocerFlow</h1>
                            <p className="text-xs text-gray-500">Management System</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};
