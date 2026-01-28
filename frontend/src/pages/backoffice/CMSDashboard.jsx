import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Newspaper, Tag, FileText, Users, Eye, Edit, ArrowUpRight } from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';

const StatCard = ({ icon: Icon, label, value, numericValue, trend, color, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: delay * 0.1, ease: 'easeOut' }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
    >
        <div className="flex items-start justify-between">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
            >
                <Icon size={24} className="text-white" />
            </motion.div>
            {trend !== undefined && (
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay * 0.1 + 0.3 }}
                    className={`flex items-center gap-0.5 text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                    <ArrowUpRight size={14} className={trend < 0 ? 'rotate-90' : ''} />
                    {trend > 0 ? '+' : ''}{trend}%
                </motion.span>
            )}
        </div>
        <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">
                <AnimatedCounter value={numericValue} duration={1.2} />
            </p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    </motion.div>
);

const CMSDashboard = () => {
    const stats = [
        { icon: Newspaper, label: 'Опубликовано статей', value: '45', numericValue: 45, trend: 18, color: 'from-purple-500 to-purple-600' },
        { icon: Eye, label: 'Просмотров за месяц', value: '12,847', numericValue: 12847, trend: 32, color: 'from-blue-500 to-blue-600' },
        { icon: Tag, label: 'Активных тарифов', value: '3', numericValue: 3, color: 'from-green-500 to-green-600' },
        { icon: FileText, label: 'Услуг на сайте', value: '8', numericValue: 8, color: 'from-amber-500 to-amber-600' },
    ];

    const recentNews = [
        { id: 1, title: 'Изменения в законодательстве о банкротстве 2026', views: 1247, status: 'published' },
        { id: 2, title: 'Как зарегистрировать ООО в 2026 году', views: 0, status: 'draft' },
        { id: 3, title: 'Налоговые вычеты для ИП: что нужно знать', views: 892, status: 'published' },
    ];

    const statusColors = {
        published: 'bg-green-100 text-green-700',
        draft: 'bg-slate-100 text-slate-600',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i} />
                ))}
            </div>

            {/* Recent News */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100"
            >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Последние статьи</h2>
                    <Link to="/cms/news" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Все статьи →
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentNews.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <Link
                                to={`/cms/news/${item.id}`}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                                    <Newspaper size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 truncate">{item.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[item.status]}`}>
                                            {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                                        </span>
                                        {item.views > 0 && (
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Eye size={12} />
                                                {item.views}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg"
                                >
                                    <Edit size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CMSDashboard;
