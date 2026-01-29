import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, User, LogIn, LogOut, Settings,
    FileText, Trash2, Edit, Eye, Search, Filter,
    ChevronDown, Download, Calendar, Shield
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

    const typeConfig = {
        login: { label: 'Вход', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: LogIn },
        logout: { label: 'Выход', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', icon: LogOut },
        edit: { label: 'Изменение', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: Edit },
        create: { label: 'Создание', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', icon: FileText },
        delete: { label: 'Удаление', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: Trash2 },
        view: { label: 'Просмотр', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: Eye },
        settings: { label: 'Настройки', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', icon: Settings }
    };

    const filteredLogs = logs.filter(log => {
        if (filter !== 'all' && log.type !== filter) return false;
        if (searchQuery && !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !log.user.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Логи активности</h1>
                    <p className="text-slate-400">История действий пользователей</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-[#1E293B]/60 backdrop-blur-md hover:bg-[#1E293B] text-white font-bold rounded-xl border border-white/5 transition-all shadow-lg hover:shadow-[#06B6D4]/10 group">
                    <Download size={18} className="text-[#06B6D4] group-hover:scale-110 transition-transform" />
                    Экспорт CSV
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex gap-4 p-1 bg-[#1E293B]/60 backdrop-blur-md rounded-2xl border border-white/5">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Поиск по логам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-slate-500 outline-none"
                    />
                </div>
                <div className="w-px bg-white/10 my-2"></div>

                <div className="relative min-w-[180px]">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full appearance-none bg-transparent text-slate-300 font-medium py-3 pl-4 pr-10 outline-none cursor-pointer hover:text-white transition-colors"
                    >
                        <option value="all">Все типы событий</option>
                        <option value="login">Вход в систему</option>
                        <option value="create">Создание</option>
                        <option value="edit">Редактирование</option>
                        <option value="delete">Удаление</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>

                <div className="w-px bg-white/10 my-2"></div>

                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
                    <Calendar size={18} className="text-[#06B6D4]" />
                    <span className="text-sm font-bold text-slate-300">Сегодня</span>
                    <ChevronDown size={14} className="text-slate-500" />
                </div>
            </div>

            {/* Logs Table */}
            <div className="flex-1 bg-[#1E293B]/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                <div className="overflow-auto custom-scrollbar flex-1">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-[#0F172A]/90 backdrop-blur-sm z-10">
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest pl-8">Событие</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Пользователь</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Действие</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">IP Адрес</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest text-right pr-8">Время</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredLogs.map((log, index) => {
                                    const config = typeConfig[log.type] || typeConfig.settings;
                                    const Icon = config.icon;

                                    return (
                                        <motion.tr
                                            key={log.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-6 py-4 pl-8">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider w-fit
                                                    ${config.bg} ${config.color}
                                                `}>
                                                    <Icon size={14} />
                                                    {config.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center text-slate-400">
                                                        <User size={14} />
                                                    </div>
                                                    <span className="font-bold text-white text-sm">{log.user}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-sm">{log.action}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-1 rounded border border-white/5">
                                                    {log.ip}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right pr-8">
                                                <span className="text-sm font-mono text-slate-400">{log.date}</span>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-slate-500 font-medium">Показано {filteredLogs.length} из {logs.length}</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white bg-[#1E293B]/60 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                        ← Назад
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-white bg-[#06B6D4] hover:bg-[#0891b2] rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-colors">
                        Далее →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogs;
