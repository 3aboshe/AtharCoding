import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    Eye,
    EyeOff,
    GripVertical,
    ChevronDown,
    ChevronRight,
    FileCode,
    Image as ImageIcon,
    Code
} from 'lucide-react';
import { Button } from '../../components/ui';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface Level {
    _id?: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    order: number;
    xp: number;
    published: boolean;
    tasks: Task[];
}

interface Task {
    _id?: string;
    title: string;
    titleAr: string;
    content: string;
    contentAr: string;
    description: string;
    descriptionAr: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    xp: number;
    order: number;
    starterCode: string;
    expectedOutput: string;
    hints: string[];
    hintsAr: string[];
    published: boolean;
}

interface Course {
    _id?: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    slug: string;
    order: number;
    published: boolean;
    levels?: Level[];
}

export function CourseEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [course, setCourse] = useState<Course>({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        icon: '🐍',
        slug: '',
        order: 0,
        published: false,
        levels: [],
    });
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedLevel, setExpandedLevel] = useState<string | null>(null);
    const [expandedTask, setExpandedTask] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew && id) {
            fetchCourse();
        }
    }, [id, isNew]);

    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem('athar-token');
            // First get the course by ID to get its slug
            const coursesRes = await fetch(`${API_URL}/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (coursesRes.ok) {
                const courses = await coursesRes.json();
                const foundCourse = courses.find((c: any) => c._id === id);
                if (foundCourse) {
                    // Now fetch with slug to get levels and tasks
                    const fullRes = await fetch(`${API_URL}/courses/${foundCourse.slug}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (fullRes.ok) {
                        const data = await fullRes.json();
                        setCourse(data);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch course:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveCourse = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('athar-token');
            const method = isNew ? 'POST' : 'PUT';
            const url = isNew ? `${API_URL}/courses` : `${API_URL}/courses/${id}`;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(course),
            });

            if (res.ok) {
                const data = await res.json();
                if (isNew) {
                    navigate(`/admin/courses/${data._id}`);
                }
            }
        } catch (error) {
            console.error('Failed to save course:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-slate-700 rounded w-1/3" />
                    <div className="h-12 bg-slate-700 rounded" />
                    <div className="h-32 bg-slate-700 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/admin/courses')}
                    className="mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Button>

                <div className="flex items-center justify-between">
                    <h1 className="font-display font-bold text-3xl text-white">
                        {isNew ? 'Create Course' : 'Edit Course'}
                    </h1>
                    <Button
                        variant="accent"
                        onClick={saveCourse}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Course
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>

            {/* Course Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >
                <div className="rounded-2xl bg-slate-800/50 border border-white/10 p-6 space-y-6">
                    <h2 className="font-display font-bold text-xl text-white mb-4">
                        Course Details
                    </h2>

                    {/* Icon & Title Row */}
                    <div className="flex gap-4">
                        <div className="w-24">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Icon
                            </label>
                            <input
                                type="text"
                                value={course.icon}
                                onChange={(e) => setCourse({ ...course, icon: e.target.value })}
                                placeholder="🐍"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-2xl text-center focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Title (English)
                            </label>
                            <input
                                type="text"
                                value={course.title}
                                onChange={(e) => {
                                    setCourse({
                                        ...course,
                                        title: e.target.value,
                                        slug: generateSlug(e.target.value),
                                    });
                                }}
                                placeholder="Python Fundamentals"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                    </div>

                    {/* Arabic Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title (Arabic)
                        </label>
                        <input
                            type="text"
                            value={course.titleAr}
                            onChange={(e) => setCourse({ ...course, titleAr: e.target.value })}
                            placeholder="أساسيات بايثون"
                            dir="rtl"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description (English)
                        </label>
                        <textarea
                            value={course.description}
                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                            placeholder="Learn Python from scratch with interactive exercises..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description (Arabic)
                        </label>
                        <textarea
                            value={course.descriptionAr}
                            onChange={(e) => setCourse({ ...course, descriptionAr: e.target.value })}
                            placeholder="تعلم بايثون من الصفر مع تمارين تفاعلية..."
                            rows={3}
                            dir="rtl"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            URL Slug
                        </label>
                        <input
                            type="text"
                            value={course.slug}
                            onChange={(e) => setCourse({ ...course, slug: e.target.value })}
                            placeholder="python-fundamentals"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>
                </div>

                {/* Levels Section */}
                {!isNew && (
                    <div className="rounded-2xl bg-slate-800/50 border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-display font-bold text-xl text-white">
                                Levels & Tasks
                            </h2>
                            <Button variant="secondary" size="sm">
                                <Plus className="w-4 h-4" />
                                Add Level
                            </Button>
                        </div>

                        {course.levels && course.levels.length > 0 ? (
                            <div className="space-y-3">
                                {course.levels.map((level) => (
                                    <div
                                        key={level._id}
                                        className="rounded-xl bg-white/5 border border-white/10"
                                    >
                                        <button
                                            onClick={() => setExpandedLevel(expandedLevel === level._id ? null : level._id || null)}
                                            className="w-full flex items-center gap-3 p-4 text-left"
                                        >
                                            <GripVertical className="w-4 h-4 text-gray-500" />
                                            <span className="text-2xl">{level.icon}</span>
                                            <div className="flex-1">
                                                <p className="text-white font-medium">{level.title}</p>
                                                <p className="text-gray-500 text-sm">{level.tasks?.length || 0} tasks</p>
                                            </div>
                                            {expandedLevel === level._id ? (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>

                                        {expandedLevel === level._id && (
                                            <div className="px-4 pb-4 border-t border-white/10 mt-2 pt-4">
                                                {level.tasks?.map((task) => (
                                                    <div
                                                        key={task._id}
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 mb-2"
                                                    >
                                                        <FileCode className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-white flex-1">{task.title}</span>
                                                        <span className={`px-2 py-0.5 rounded text-xs ${task.difficulty === 'beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            task.difficulty === 'intermediate' ? 'bg-amber-500/20 text-amber-400' :
                                                                'bg-red-500/20 text-red-400'
                                                            }`}>
                                                            {task.difficulty}
                                                        </span>
                                                    </div>
                                                ))}
                                                <Button variant="secondary" size="sm" className="mt-2">
                                                    <Plus className="w-4 h-4" />
                                                    Add Task
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                No levels yet. Create your first level to start adding content.
                            </p>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
