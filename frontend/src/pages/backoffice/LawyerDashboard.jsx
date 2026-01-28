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
        className="relative overflow-hidden rounded-[24px] p-6 bg-white/[0.03] border border-white/10 backdrop-blur-sm group"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

        <div className="relative z-10 flex items-start justify-between">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-black/20`}
            >
                <Icon size={22} className="text-white" />
            </motion.div>
            {trend !== undefined && (
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay * 0.1 + 0.3 }}
                    className={`flex items-center gap-1 text-sm font-bold bg-white/5 px-2 py-1 rounded-lg border border-white/5 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                    <ArrowUpRight size={14} className={trend < 0 ? 'rotate-90' : ''} />
                    {trend > 0 ? '+' : ''}{trend}%
                </motion.span>
            )}
        </div>
        <div className="relative z-10 mt-6">
            <p className="text-3xl font-bold text-white tracking-tight">
                <AnimatedCounter value={numericValue} duration={1.2} />
            </p>
            <p className="text-sm text-slate-400 font-medium mt-1">{label}</p>
        </div>
    </motion.div>
);

const LawyerDashboard = () => {
    const stats = [
        { icon: MessageSquare, label: 'Активные чаты', value: '12', numericValue: 12, trend: 15, color: 'from-blue-500 to-cyan-500' },
        { icon: Users, label: 'Мои клиенты', value: '47', numericValue: 47, trend: 8, color: 'from-green-500 to-emerald-500' },
        { icon: FileText, label: 'Документы', value: '156', numericValue: 156, trend: 23, color: 'from-purple-500 to-pink-500' },
        { icon: Calendar, label: 'Консультации сегодня', value: '5', numericValue: 5, color: 'from-amber-500 to-orange-500' },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i} />
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Chats Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-[#0F172A]/40 rounded-[24px] border border-white/10 backdrop-blur-xl overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                        <h2 className="font-bold text-lg text-white tracking-tight">Последние сообщения</h2>
                        <Link to="/lawyer/chats" className="text-sm text-[#06B6D4] hover:text-[#06B6D4]/80 font-medium transition-colors">
                            Все чаты →
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {recentChats.map((chat, i) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                <Link
                                    to={`/lawyer/chat/${chat.id}`}
                                    className="block px-6 py-4 hover:bg-white/[0.02] transition-colors group relative"
                                >
                                    {chat.unread && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                {chat.client[0]}
                                            </div>
                                            {chat.unread && (
                                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#06B6D4] border-2 border-[#0F172A] rounded-full" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className={`font-semibold truncate ${chat.unread ? 'text-white' : 'text-slate-300'}`}>
                                                    {chat.client}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                    <Clock size={12} />
                                                    {chat.time}
                                                </div>
                                            </div>
                                            <p className={`text-sm truncate ${chat.unread ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {chat.message}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions / Mini Calendar Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-[#06B6D4] to-blue-600 rounded-[24px] p-6 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <h3 className="text-xl font-bold mb-2 relative z-10">Новая задача</h3>
                    <p className="text-blue-100 text-sm mb-6 relative z-10">Запланируйте консультацию или создайте новый документ</p>

                    <div className="space-y-3 relative z-10">
                        <button className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-white/20">
                            <Calendar size={16} />
                            Создать событие
                        </button>
                        <button className="w-full py-3 px-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg">
                            <Link to="/lawyer/chats" className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                Написать клиенту
                            </Link>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LawyerDashboard;
