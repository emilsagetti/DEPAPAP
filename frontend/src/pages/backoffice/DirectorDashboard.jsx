import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Wallet, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';

const StatCard = ({ icon: Icon, label, value, numericValue, trend, trendValue, color, delay = 0 }) => (
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
            {trend && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay * 0.1 + 0.3 }}
                    className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                >
                    {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {trendValue}
                </motion.div>
            )}
        </div>
        <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">
                {numericValue !== undefined ? (
                    <AnimatedCounter
                        value={numericValue}
                        prefix={value.startsWith('₽') ? '₽' : ''}
                        suffix={value.includes('%') ? '%' : ''}
                        duration={1.2}
                    />
                ) : value}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    </motion.div>
);

const DirectorDashboard = () => {
    const stats = [
        { icon: Wallet, label: 'Выручка за месяц', value: '₽1,247,000', numericValue: 1247000, trend: 'up', trendValue: '+15%', color: 'from-amber-500 to-amber-600' },
        { icon: Users, label: 'Новых клиентов', value: '89', numericValue: 89, trend: 'up', trendValue: '+23%', color: 'from-blue-500 to-blue-600' },
        { icon: BarChart3, label: 'Конверсия', value: '4.2%', numericValue: 4.2, trend: 'up', trendValue: '+0.8%', color: 'from-green-500 to-green-600' },
        { icon: TrendingUp, label: 'Средний чек', value: '₽15,400', numericValue: 15400, trend: 'down', trendValue: '-3%', color: 'from-purple-500 to-purple-600' },
    ];

    const quickLinks = [
        { label: 'Панель юристов', path: '/lawyer', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
        { label: 'Администрирование', path: '/admin', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
        { label: 'Управление контентом', path: '/cms', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    ];

    // Container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Quick Links */}
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
                {quickLinks.map((link, i) => (
                    <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link
                            to={link.path}
                            className={`inline-flex px-4 py-2.5 rounded-xl font-medium transition-all ${link.color}`}
                        >
                            {link.label}
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i} />
                ))}
            </div>

            {/* Charts Placeholder */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-semibold text-slate-900 mb-4">Выручка по месяцам</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
                        <p className="text-slate-400">График будет здесь</p>
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-semibold text-slate-900 mb-4">Распределение клиентов</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
                        <p className="text-slate-400">Диаграмма будет здесь</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default DirectorDashboard;
