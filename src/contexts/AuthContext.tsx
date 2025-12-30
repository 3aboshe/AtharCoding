import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar?: string;
    totalXP: number;
    streak: number;
    completedTasks: string[];
    completedLevels: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUserProgress: (taskId: string, xp: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('athar-token');
        const storedUser = localStorage.getItem('athar-user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Fetch user profile when token changes
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                    localStorage.setItem('athar-user', JSON.stringify(userData));
                } else {
                    // Token invalid, clear auth
                    logout();
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await res.json();
        setToken(data.token);
        setUser(data);
        localStorage.setItem('athar-token', data.token);
        localStorage.setItem('athar-refresh-token', data.refreshToken);
        localStorage.setItem('athar-user', JSON.stringify(data));
    };

    const register = async (name: string, email: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Registration failed');
        }

        const data = await res.json();
        setToken(data.token);
        setUser(data);
        localStorage.setItem('athar-token', data.token);
        localStorage.setItem('athar-refresh-token', data.refreshToken);
        localStorage.setItem('athar-user', JSON.stringify(data));
    };

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('athar-token');
        localStorage.removeItem('athar-refresh-token');
        localStorage.removeItem('athar-user');
    }, []);

    const updateUserProgress = async (taskId: string, xp: number) => {
        if (!token) return;

        try {
            const res = await fetch(`${API_URL}/auth/progress`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ taskId, xp }),
            });

            if (res.ok) {
                const data = await res.json();
                setUser((prev) =>
                    prev
                        ? {
                            ...prev,
                            completedTasks: data.completedTasks,
                            totalXP: data.totalXP,
                        }
                        : null
                );
                if (user) {
                    localStorage.setItem('athar-user', JSON.stringify({
                        ...user,
                        completedTasks: data.completedTasks,
                        totalXP: data.totalXP,
                    }));
                }
            }
        } catch (error) {
            console.error('Failed to update progress:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!user,
                isAdmin: user?.role === 'admin',
                login,
                register,
                logout,
                updateUserProgress,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
