import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, User, Mail, Phone, Shield,
    UserCheck, UserX, MoreVertical, ChevronDown,
    Eye, Ban, Trash2, X, Check
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
        client: { label: 'Клиент', color: 'bg-blue-100 text-blue-700' },
        lawyer: { label: 'Юрист', color: 'bg-green-100 text-green-700' },
        admin: { label: 'Админ', color: 'bg-red-100 text-red-700' },
        content_manager: { label: 'Контент', color: 'bg-purple-100 text-purple-700' },
        director: { label: 'Директор', color: 'bg-amber-100 text-amber-700' },
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
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Пользователи</h1>
                    <p className="text-slate-500">{users.length} пользователей в системе</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[300px] relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по имени или email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="relative">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    >
                        <option value="all">Все роли</option>
                        <option value="client">Клиенты</option>
                        <option value="lawyer">Юристы</option>
                        <option value="admin">Админы</option>
                        <option value="content_manager">Контент-менеджеры</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Пользователь</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Контакты</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Роль</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата рег.</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className="hover:bg-slate-50"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white font-bold text-sm">
                                            {user.name[0]}
                                        </div>
                                        <span className="font-medium text-slate-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="text-sm">
                                        <p className="text-slate-700">{user.email}</p>
                                        <p className="text-slate-400">{user.phone}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleLabels[user.role]?.color || 'bg-slate-100 text-slate-600'}`}>
                                        {roleLabels[user.role]?.label || user.role}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className={`flex items-center gap-1.5 text-sm ${user.status === 'active' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                            }`}></span>
                                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-500">
                                    {user.createdAt}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Просмотр">
                                            <Eye size={16} className="text-slate-500" />
                                        </button>
                                        <button
                                            onClick={() => handleBlockUser(user)}
                                            className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                                                    ? 'hover:bg-red-100 text-red-500'
                                                    : 'hover:bg-green-100 text-green-500'
                                                }`}
                                            title={user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                                        >
                                            {user.status === 'active' ? <Ban size={16} /> : <Check size={16} />}
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Block/Unblock Modal */}
            <AnimatePresence>
                {showModal && selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {selectedUser.status === 'active' ? 'Заблокировать пользователя?' : 'Разблокировать пользователя?'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-slate-600 mb-6">
                                {selectedUser.status === 'active'
                                    ? `Пользователь ${selectedUser.name} потеряет доступ к системе.`
                                    : `Пользователь ${selectedUser.name} получит доступ к системе.`
                                }
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={`flex-1 py-2.5 font-medium rounded-xl transition-colors ${selectedUser.status === 'active'
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                >
                                    {selectedUser.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
