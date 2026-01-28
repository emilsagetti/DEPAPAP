import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Users, FileText, Calendar, Clock, ArrowUpRight } from 'lucide-react';
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

const LawyerDashboard = () => {
    const stats = [
        { icon: MessageSquare, label: 'Активные чаты', value: '12', numericValue: 12, trend: 15, color: 'from-blue-500 to-blue-600' },
        { icon: Users, label: 'Мои клиенты', value: '47', numericValue: 47, trend: 8, color: 'from-green-500 to-green-600' },
        { icon: FileText, label: 'Документы', value: '156', numericValue: 156, trend: 23, color: 'from-purple-500 to-purple-600' },
        { icon: Calendar, label: 'Консультации сегодня', value: '5', numericValue: 5, color: 'from-amber-500 to-amber-600' },
    ];

    const recentChats = [
        { id: 1, client: 'Иван Петров', message: 'Добрый день, подскажите по договору...', time: '5 мин', unread: true },
        { id: 2, client: 'ООО "Ромашка"', message: 'Документы готовы, жду вашего ответа', time: '15 мин', unread: true },
        { id: 3, client: 'Мария Сидорова', message: 'Спасибо за консультацию!', time: '1 час', unread: false },
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

            {/* Recent Chats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100"
            >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Последние сообщения</h2>
                    <Link to="/lawyer/chats" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Все чаты →
                    </Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentChats.map((chat, i) => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <Link
                                to={`/lawyer/chat/${chat.id}`}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    {chat.client[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-slate-900">{chat.client}</p>
                                        {chat.unread && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 bg-blue-500 rounded-full"
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 truncate">{chat.message}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <Clock size={12} />
                                    {chat.time}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LawyerDashboard;
