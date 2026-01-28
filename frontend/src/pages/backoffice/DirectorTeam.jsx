import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Star, MessageSquare, FileText,
    MoreVertical, Mail, Phone, Calendar,
    TrendingUp, Award, Clock, Search, Plus
} from 'lucide-react';

const DirectorTeam = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const team = [
        {
            id: 1,
            name: 'Алексей Смирнов',
            role: 'lawyer',
            roleLabel: 'Юрист',
            email: 'smirnov@baa-legal.ru',
            phone: '+7 (999) 123-45-67',
            avatar: null,
            stats: { clients: 47, orders: 156, rating: 4.9, revenue: 1250000 },
            joinDate: 'Январь 2024'
        },
        {
            id: 2,
            name: 'Елена Козлова',
            role: 'lawyer',
            roleLabel: 'Юрист',
            email: 'kozlova@baa-legal.ru',
            phone: '+7 (999) 234-56-78',
            avatar: null,
            stats: { clients: 32, orders: 98, rating: 4.8, revenue: 890000 },
            joinDate: 'Март 2024'
        },
        {
            id: 3,
            name: 'Мария Иванова',
            role: 'admin',
            roleLabel: 'Администратор',
            email: 'ivanova@baa-legal.ru',
            phone: '+7 (999) 345-67-89',
            avatar: null,
            stats: { clients: 0, orders: 0, rating: 0, revenue: 0 },
            joinDate: 'Июнь 2024'
        },
        {
            id: 4,
            name: 'Дмитрий Волков',
            role: 'lawyer',
            roleLabel: 'Юрист',
            email: 'volkov@baa-legal.ru',
            phone: '+7 (999) 456-78-90',
            avatar: null,
            stats: { clients: 28, orders: 72, rating: 4.7, revenue: 620000 },
            joinDate: 'Август 2024'
        },
        {
            id: 5,
            name: 'Анна Петрова',
            role: 'content_manager',
            roleLabel: 'Контент-менеджер',
            email: 'petrova@baa-legal.ru',
            phone: '+7 (999) 567-89-01',
            avatar: null,
            stats: { clients: 0, orders: 0, rating: 0, revenue: 0 },
            joinDate: 'Октябрь 2024'
        },
    ];

    const roleColors = {
        lawyer: 'bg-blue-100 text-blue-700',
        admin: 'bg-red-100 text-red-700',
        content_manager: 'bg-purple-100 text-purple-700',
        director: 'bg-amber-100 text-amber-700'
    };

    const filteredTeam = team.filter(m => {
        if (filterRole !== 'all' && m.role !== filterRole) return false;
        if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const totalStats = {
        members: team.length,
        lawyers: team.filter(m => m.role === 'lawyer').length,
        revenue: team.reduce((sum, m) => sum + m.stats.revenue, 0),
        avgRating: (team.filter(m => m.stats.rating > 0).reduce((sum, m) => sum + m.stats.rating, 0) / team.filter(m => m.stats.rating > 0).length).toFixed(1)
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Команда</h1>
                    <p className="text-slate-500">Управление сотрудниками</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors">
                    <Plus size={18} />
                    Добавить
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Всего сотрудников', value: totalStats.members, icon: Users, color: 'from-blue-500 to-blue-600' },
                    { label: 'Юристов', value: totalStats.lawyers, icon: FileText, color: 'from-green-500 to-green-600' },
                    { label: 'Общая выручка', value: `₽${(totalStats.revenue / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
                    { label: 'Средний рейтинг', value: totalStats.avgRating, icon: Star, color: 'from-amber-500 to-amber-600' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по имени..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-xl relative">
                    {[
                        { value: 'all', label: 'Все' },
                        { value: 'lawyer', label: 'Юристы' },
                        { value: 'admin', label: 'Админы' },
                        { value: 'content_manager', label: 'Контент' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilterRole(f.value)}
                            className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors z-10"
                        >
                            {filterRole === f.value && (
                                <motion.div
                                    layoutId="teamFilterPill"
                                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                            <span className={`relative z-10 ${filterRole === f.value ? 'text-slate-900' : 'text-slate-500'}`}>
                                {f.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeam.map((member, i) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedMember(member)}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[member.role]}`}>
                                        {member.roleLabel}
                                    </span>
                                </div>
                            </div>
                            <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                                <MoreVertical size={16} className="text-slate-400" />
                            </button>
                        </div>

                        {member.role === 'lawyer' && (
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-lg font-bold text-slate-900">{member.stats.clients}</p>
                                    <p className="text-xs text-slate-500">Клиентов</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3 text-center">
                                    <p className="text-lg font-bold text-slate-900">{member.stats.orders}</p>
                                    <p className="text-xs text-slate-500">Заказов</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Calendar size={14} />
                                {member.joinDate}
                            </div>
                            {member.stats.rating > 0 && (
                                <div className="flex items-center gap-1 text-sm font-medium text-amber-600">
                                    <Star size={14} fill="currentColor" />
                                    {member.stats.rating}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Member Detail Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-xl">
                                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{selectedMember.name}</h3>
                                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${roleColors[selectedMember.role]}`}>
                                        {selectedMember.roleLabel}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail size={18} />
                                    <span>{selectedMember.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone size={18} />
                                    <span>{selectedMember.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Clock size={18} />
                                    <span>С нами с {selectedMember.joinDate}</span>
                                </div>
                            </div>

                            {selectedMember.role === 'lawyer' && (
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                                        <p className="text-lg font-bold text-slate-900">{selectedMember.stats.clients}</p>
                                        <p className="text-xs text-slate-500">Клиентов</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                                        <p className="text-lg font-bold text-slate-900">{selectedMember.stats.orders}</p>
                                        <p className="text-xs text-slate-500">Заказов</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                                        <p className="text-lg font-bold text-amber-600 flex items-center justify-center gap-0.5">
                                            <Star size={14} fill="currentColor" />
                                            {selectedMember.stats.rating}
                                        </p>
                                        <p className="text-xs text-slate-500">Рейтинг</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                                        <p className="text-lg font-bold text-green-600">₽{(selectedMember.stats.revenue / 1000).toFixed(0)}K</p>
                                        <p className="text-xs text-slate-500">Выручка</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Закрыть
                                </button>
                                <button className="flex-1 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare size={18} />
                                    Написать
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DirectorTeam;
