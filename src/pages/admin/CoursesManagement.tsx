import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Search,
    BookOpen
} from 'lucide-react';
import { Button } from '../../components/ui';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Course {
    _id: string;
    title: string;
    titleAr: string;
    description: string;
    icon: string;
    slug: string;
    published: boolean;
    createdAt: string;
}

export function CoursesManagement() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setCourses(data);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const togglePublish = async (id: string) => {
        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/courses/${id}/publish`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setCourses((prev) =>
                    prev.map((c) =>
                        c._id === id ? { ...c, published: !c.published } : c
                    )
                );
            }
        } catch (error) {
            console.error('Failed to toggle publish:', error);
        }
    };

    const deleteCourse = async (id: string) => {
        if (!confirm('Are you sure? This will delete all levels and tasks in this course.')) {
            return;
        }

        try {
            const token = localStorage.getItem('athar-token');
            const res = await fetch(`${API_URL}/courses/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setCourses((prev) => prev.filter((c) => c._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    const filteredCourses = courses.filter(
        (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex items-center justify-between"
            >
                <div>
                    <h1 className="font-display font-bold text-3xl text-white mb-2">
                        Courses
                    </h1>
                    <p className="text-gray-400">
                        Manage your platform courses, levels, and tasks
                    </p>
                </div>
                <Button
                    variant="accent"
                    onClick={() => navigate('/admin/courses/new')}
                >
                    <Plus className="w-5 h-5" />
                    New Course
                </Button>
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
                        placeholder="Search courses..."
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                </div>
            </motion.div>

            {/* Courses List */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl bg-slate-800/50 border border-white/10 p-6 h-48" />
                    ))}
                </div>
            ) : filteredCourses.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl text-white mb-2">No courses yet</h2>
                    <p className="text-gray-400 mb-6">Create your first course to get started</p>
                    <Button variant="accent" onClick={() => navigate('/admin/courses/new')}>
                        <Plus className="w-5 h-5" />
                        Create Course
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredCourses.map((course, i) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-2xl bg-slate-800/50 border border-white/10 p-6 hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{course.icon || '📚'}</span>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${course.published
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                    {course.published ? 'Published' : 'Draft'}
                                </div>
                            </div>

                            <h3 className="font-display font-bold text-xl text-white mb-2">
                                {course.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => navigate(`/admin/courses/${course._id}`)}
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </Button>
                                <button
                                    onClick={() => togglePublish(course._id)}
                                    className={`p-2 rounded-lg transition-colors ${course.published
                                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {course.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => deleteCourse(course._id)}
                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
