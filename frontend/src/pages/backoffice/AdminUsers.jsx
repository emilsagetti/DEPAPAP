import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, User, Mail, Phone, Shield,
    UserCheck, UserX, MoreVertical, ChevronDown,
    Eye, Ban, Trash2, X, Check, BadgeCheck
} from 'lucide-react';

const AdminUsers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock users data
    const users = [
        {
            id: 1,
            name: 'Иван Петров',
            email: 'petrov@example.com',
            phone: '+7 (999) 123-45-67',
            role: 'client',
            status: 'active',
            createdAt: '15.12.2025'
        },
        {
            id: 2,
            name: 'Алексей Смирнов',
            email: 'smirnov@lawyer.ru',
            phone: '+7 (495) 111-22-33',
            role: 'lawyer',
            status: 'active',
            createdAt: '10.11.2025'
        },
        {
            id: 3,
            name: 'Мария Сидорова',
            email: 'sidorova@mail.ru',
            phone: '+7 (916) 555-12-34',
            role: 'client',
            status: 'blocked',
            createdAt: '05.09.2025'
        },
        {
            id: 4,
            name: 'Елена Козлова',
            email: 'kozlova@cms.ru',
            phone: '+7 (495) 987-65-43',
            role: 'content_manager',
            status: 'active',
            createdAt: '20.08.2025'
        },
        {
            id: 5,
            name: 'Дмитрий Волков',
            email: 'volkov@admin.ru',
            phone: '+7 (499) 777-88-99',
            role: 'admin',
            status: 'active',
            createdAt: '01.01.2025'
        },
    ];

    const roleLabels = {
        client: { label: 'Клиент', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        lawyer: { label: 'Юрист', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
        admin: { label: 'Админ', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
        content_manager: { label: 'Контент', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        director: { label: 'Директор', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    };

    const filteredUsers = users
        .filter(user => roleFilter === 'all' || user.role === roleFilter)
        .filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleBlockUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Пользователи</h1>
                    <p className="text-slate-400">{users.length} пользователей в системе</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex gap-4 p-1 bg-[#1E293B]/60 backdrop-blur-md rounded-2xl border border-white/5">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Поиск по базе пользователей..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-slate-500 outline-none"
                    />
                </div>
                <div className="w-px bg-white/10 my-2"></div>
                <div className="relative">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none bg-transparent text-slate-300 font-medium py-3 pl-4 pr-10 outline-none cursor-pointer hover:text-white transition-colors"
                    >
                        <option value="all">Все роли</option>
                        <option value="client">Клиенты</option>
                        <option value="lawyer">Юристы</option>
                        <option value="admin">Администраторы</option>
                        <option value="content_manager">Контент</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
            </div>

            {/* Users Table */}
            <div className="flex-1 bg-[#1E293B]/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                <div className="overflow-auto custom-scrollbar flex-1">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-[#0F172A]/90 backdrop-blur-sm z-10">
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Пользователь</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Контакты</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Роль</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Статус</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Регистрация</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg
                                                    ${user.role === 'admin' ? 'bg-gradient-to-br from-red-500 to-rose-600' :
                                                        user.role === 'lawyer' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                                                            'bg-gradient-to-br from-slate-600 to-slate-700'}
                                                `}>
                                                    {user.name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{user.name}</div>
                                                    <div className="text-xs text-slate-500">ID: {user.id.toString().padStart(6, '0')}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <Mail size={12} className="text-slate-500" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                                    <Phone size={12} className="text-slate-500" />
                                                    {user.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${roleLabels[user.role]?.color || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                                {roleLabels[user.role]?.label || user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                                ${user.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}
                                            `}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                                            {user.createdAt}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleBlockUser(user)}
                                                    className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                                                        ? 'hover:bg-red-500/20 text-slate-400 hover:text-red-400'
                                                        : 'hover:bg-green-500/20 text-slate-400 hover:text-green-400'
                                                        }`}
                                                >
                                                    {user.status === 'active' ? <Ban size={18} /> : <BadgeCheck size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Block/Unblock Modal */}
            <AnimatePresence>
                {showModal && selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0F172A] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-20 pointer-events-none
                                ${selectedUser.status === 'active' ? 'bg-red-500' : 'bg-green-500'}
                            `} />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${selectedUser.status === 'active' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {selectedUser.status === 'active' ? <Ban size={24} /> : <BadgeCheck size={24} />}
                                        </div>
                                        {selectedUser.status === 'active' ? 'Блокировка доступа' : 'Восстановление доступа'}
                                    </h3>
                                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <X size={20} className="text-slate-400 hover:text-white" />
                                    </button>
                                </div>

                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    Вы собираетесь изменить статус пользователя <span className="text-white font-bold">{selectedUser.name}</span>.
                                    {selectedUser.status === 'active'
                                        ? ' Это действие ограничит доступ к личному кабинету и всем сервисам.'
                                        : ' Доступ к системе будет полностью восстановлен.'
                                    }
                                </p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors border border-white/5"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className={`flex-1 py-3 font-bold rounded-xl transition-all shadow-lg ${selectedUser.status === 'active'
                                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                                            : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
                                            }`}
                                    >
                                        {selectedUser.status === 'active' ? 'Заблокировать' : 'Активировать'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
