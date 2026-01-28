import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, User, LogIn, LogOut, Settings,
    FileText, Trash2, Edit, Eye, Search, Filter,
    ChevronDown, Download, Calendar
} from 'lucide-react';

const AdminLogs = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const logs = [
        { id: 1, type: 'login', user: 'Иван Петров', action: 'Вход в систему', ip: '192.168.1.45', date: '11 янв 2026 14:32' },
        { id: 2, type: 'edit', user: 'Алексей Смирнов', action: 'Изменил заказ #1247', ip: '192.168.1.12', date: '11 янв 2026 14:28' },
        { id: 3, type: 'create', user: 'Мария Козлова', action: 'Создала новость "Изменения в НК"', ip: '192.168.1.33', date: '11 янв 2026 14:15' },
        { id: 4, type: 'delete', user: 'Администратор', action: 'Удалил пользователя test@test.ru', ip: '192.168.1.1', date: '11 янв 2026 13:45' },
        { id: 5, type: 'logout', user: 'Елена Волкова', action: 'Выход из системы', ip: '192.168.1.67', date: '11 янв 2026 13:30' },
        { id: 6, type: 'settings', user: 'Директор', action: 'Изменил настройки тарифов', ip: '192.168.1.2', date: '11 янв 2026 12:15' },
        { id: 7, type: 'view', user: 'Анна Сидорова', action: 'Просмотрела документ "Договор_ООО.pdf"', ip: '192.168.1.89', date: '11 янв 2026 11:45' },
        { id: 8, type: 'login', user: 'Дмитрий Волков', action: 'Вход в систему', ip: '192.168.1.54', date: '11 янв 2026 11:00' },
        { id: 9, type: 'edit', user: 'Алексей Смирнов', action: 'Обновил статус заказа #1245', ip: '192.168.1.12', date: '11 янв 2026 10:30' },
        { id: 10, type: 'create', user: 'Мария Козлова', action: 'Создала услугу "Экспертиза договоров"', ip: '192.168.1.33', date: '10 янв 2026 18:22' },
    ];

    const typeIcons = {
        login: <LogIn size={16} className="text-green-600" />,
        logout: <LogOut size={16} className="text-slate-400" />,
        edit: <Edit size={16} className="text-blue-600" />,
        create: <FileText size={16} className="text-purple-600" />,
        delete: <Trash2 size={16} className="text-red-600" />,
        view: <Eye size={16} className="text-amber-600" />,
        settings: <Settings size={16} className="text-slate-600" />
    };

    const typeLabels = {
        login: { label: 'Вход', color: 'bg-green-100 text-green-700' },
        logout: { label: 'Выход', color: 'bg-slate-100 text-slate-700' },
        edit: { label: 'Изменение', color: 'bg-blue-100 text-blue-700' },
        create: { label: 'Создание', color: 'bg-purple-100 text-purple-700' },
        delete: { label: 'Удаление', color: 'bg-red-100 text-red-700' },
        view: { label: 'Просмотр', color: 'bg-amber-100 text-amber-700' },
        settings: { label: 'Настройки', color: 'bg-slate-100 text-slate-700' }
    };

    const filteredLogs = logs.filter(log => {
        if (filter !== 'all' && log.type !== filter) return false;
        if (searchQuery && !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !log.user.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.02 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Логи активности</h1>
                    <p className="text-slate-500">История действий пользователей</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
                    <Download size={18} />
                    Экспорт
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по действию или пользователю..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                    <option value="all">Все типы</option>
                    <option value="login">Вход</option>
                    <option value="logout">Выход</option>
                    <option value="edit">Изменение</option>
                    <option value="create">Создание</option>
                    <option value="delete">Удаление</option>
                </select>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl">
                    <Calendar size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-600">Сегодня</span>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Тип</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Пользователь</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Действие</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">IP</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Время</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLogs.map((log, i) => (
                            <motion.tr
                                key={log.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className="hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-5 py-4">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${typeLabels[log.type].color}`}>
                                        {typeIcons[log.type]}
                                        {typeLabels[log.type].label}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                            <User size={14} className="text-slate-500" />
                                        </div>
                                        <span className="font-medium text-slate-900">{log.user}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-slate-600">{log.action}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-400 font-mono">{log.ip}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500">{log.date}</span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Показано {filteredLogs.length} из {logs.length}</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                        ← Назад
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800">
                        Далее →
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminLogs;
