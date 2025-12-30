import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    BookOpen,
    Layers,
    FileCode,
    TrendingUp,
    Clock,
    Zap
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Stats {
    totalUsers: number;
    adminCount: number;
    activeToday: number;
    topLearners: {
        name: string;
        email: string;
        totalXP: number;
        completedTasks: string[];
        streak: number;
    }[];
}

export function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('athar-token');
                const res = await fetch(`${API_URL}/users/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            color: 'cyan',
            gradient: 'from-cyan-500 to-blue-500'
        },
        {
            label: 'Active Today',
            value: stats?.activeToday || 0,
            icon: Clock,
            color: 'emerald',
            gradient: 'from-emerald-500 to-green-500'
        },
        {
            label: 'Admins',
            value: stats?.adminCount || 0,
            icon: Zap,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            label: 'Total Courses',
            value: 1,
            icon: BookOpen,
            color: 'amber',
            gradient: 'from-amber-500 to-orange-500'
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display font-bold text-3xl text-white mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-400">
                    Welcome back! Here's what's happening with your platform.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden rounded-2xl bg-slate-800/50 border border-white/10 p-6"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
                        <div className="relative">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Learners */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl bg-slate-800/50 border border-white/10 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display font-bold text-xl text-white">
                            Top Learners
                        </h2>
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>

                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-700 rounded w-1/2 mb-2" />
                                        <div className="h-3 bg-slate-700 rounded w-1/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats?.topLearners?.slice(0, 5).map((learner, i) => (
                                <div
                                    key={learner.email}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{learner.name}</p>
                                        <p className="text-gray-500 text-sm truncate">{learner.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-amber-400 font-bold">{learner.totalXP} XP</p>
                                        <p className="text-gray-500 text-xs">{learner.completedTasks?.length || 0} tasks</p>
                                    </div>
                                </div>
                            ))}

                            {(!stats?.topLearners || stats.topLearners.length === 0) && (
                                <p className="text-gray-500 text-center py-8">No learners yet</p>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl bg-slate-800/50 border border-white/10 p-6"
                >
                    <h2 className="font-display font-bold text-xl text-white mb-6">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Create Course', icon: BookOpen, href: '/admin/courses/new', gradient: 'from-cyan-500 to-blue-500' },
                            { label: 'Add Level', icon: Layers, href: '/admin/courses', gradient: 'from-emerald-500 to-green-500' },
                            { label: 'New Task', icon: FileCode, href: '/admin/courses', gradient: 'from-purple-500 to-pink-500' },
                            { label: 'View Users', icon: Users, href: '/admin/users', gradient: 'from-amber-500 to-orange-500' },
                        ].map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-white font-medium">{action.label}</p>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
