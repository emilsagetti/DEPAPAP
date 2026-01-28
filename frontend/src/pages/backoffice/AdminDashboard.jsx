import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Shield, AlertCircle, FileText, Clock, ArrowUpRight, CheckCircle } from 'lucide-react';
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

const AdminDashboard = () => {
    const stats = [
        { icon: Users, label: 'Всего пользователей', value: '1,234', numericValue: 1234, trend: 12, color: 'from-blue-500 to-blue-600' },
        { icon: Shield, label: 'Верификаций в ожидании', value: '7', numericValue: 7, color: 'from-amber-500 to-amber-600' },
        { icon: AlertCircle, label: 'Открытых жалоб', value: '3', numericValue: 3, color: 'from-red-500 to-red-600' },
        { icon: FileText, label: 'Активных сессий', value: '89', numericValue: 89, trend: -5, color: 'from-green-500 to-green-600' },
    ];

    const pendingVerifications = [
        { id: 1, name: 'Алексей Смирнов', specialty: 'Корпоративное право', time: '2 часа назад' },
        { id: 2, name: 'Елена Козлова', specialty: 'Семейное право', time: '5 часов назад' },
        { id: 3, name: 'Дмитрий Волков', specialty: 'Уголовное право', time: '1 день назад' },
    ];

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

            {/* Pending Verifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100"
            >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Ожидают верификации</h2>
                    <Link to="/admin/lawyers" className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Все заявки →
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {pendingVerifications.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <Link
                                to="/admin/lawyers"
                                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                                    {item.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.specialty}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <Clock size={12} />
                                    {item.time}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg"
                                >
                                    <CheckCircle size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboard;
