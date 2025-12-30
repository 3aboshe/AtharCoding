import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Users,
    Shield,
    Trash2,
    MoreVertical,
    Zap,
    Calendar
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    totalXP: number;
    completedTasks: string[];
    streak: number;
    createdAt: string;
    lastActivity: string;
}

export function UsersManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateRole = async (id: string, role: 'user' | 'admin') => {
        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/users/${id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });
            if (res.ok) {
                setUsers((prev) =>
                    prev.map((u) => (u._id === id ? { ...u, role } : u))
                );
            }
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    const deleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setUsers((prev) => prev.filter((u) => u._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display font-bold text-3xl text-white mb-2">
                    Users
                </h1>
                <p className="text-gray-400">
                    Manage platform users and their roles
                </p>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
            >
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users..."
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-slate-800/50 border border-white/10 overflow-hidden"
            >
                {isLoading ? (
                    <div className="p-8">
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-700 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-slate-700 rounded w-1/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">User</th>
                                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Role</th>
                                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Progress</th>
                                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Joined</th>
                                <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => updateRole(user._id, e.target.value as 'user' | 'admin')}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 cursor-pointer ${user.role === 'admin'
                                                ? 'bg-purple-500/20 text-purple-400'
                                                : 'bg-slate-700 text-gray-300'
                                                }`}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Zap className="w-4 h-4" />
                                                <span className="font-medium">{user.totalXP}</span>
                                            </div>
                                            <span className="text-gray-500">
                                                {user.completedTasks?.length || 0} tasks
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(user.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400">No users found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </motion.div>
        </div>
    );
}
