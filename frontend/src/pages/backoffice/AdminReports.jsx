import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle, MessageSquare, User, Clock,
    CheckCircle2, XCircle, Eye, Filter, Search,
    MoreHorizontal, ShieldAlert, Bug, MessageCircle
} from 'lucide-react';

const AdminReports = () => {
    const [filter, setFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);

    const reports = [
        {
            id: 1,
            type: 'lawyer',
            subject: 'Жалоба на юриста',
            reporter: 'Иван Петров',
            target: 'Алексей Смирнов',
            description: 'Юрист не отвечает на сообщения более 3 дней',
            status: 'pending',
            date: '11 янв 2026',
            priority: 'high'
        },
        {
            id: 2,
            type: 'content',
            subject: 'Неточная информация',
            reporter: 'Мария Козлова',
            target: 'Статья о регистрации ООО',
            description: 'В статье указаны устаревшие госпошлины',
            status: 'resolved',
            date: '10 янв 2026',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'technical',
            subject: 'Баг в чате',
            reporter: 'Дмитрий Волков',
            target: 'Система',
            description: 'Не приходят уведомления о новых сообщениях',
            status: 'in_progress',
            date: '9 янв 2026',
            priority: 'high'
        },
        {
            id: 4,
            type: 'lawyer',
            subject: 'Грубость в общении',
            reporter: 'Анна Сидорова',
            target: 'Елена Козлова',
            description: 'Юрист позволила себе некорректные высказывания',
            status: 'pending',
            date: '8 янв 2026',
            priority: 'medium'
        },
    ];

    const statusLabels = {
        pending: { label: 'Ожидает', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        in_progress: { label: 'В работе', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
        resolved: { label: 'Решено', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
        rejected: { label: 'Отклонено', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' }
    };

    const typeConfig = {
        lawyer: { icon: User, color: 'text-red-400', bg: 'bg-red-500/10' },
        content: { icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        technical: { icon: Bug, color: 'text-blue-400', bg: 'bg-blue-500/10' }
    };

    const priorityColors = {
        high: 'border-l-red-500',
        medium: 'border-l-amber-500',
        low: 'border-l-slate-500'
    };

    const filteredReports = reports.filter(r => filter === 'all' || r.status === filter);

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Жалобы и обращения</h1>
                    <p className="text-slate-400">Обработка входящих инцидентов</p>
                </div>
                <div className="flex items-center gap-3 bg-[#1E293B]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-sm">Новые жалобы:</span>
                    <span className="text-amber-500 font-bold text-lg">{reports.filter(r => r.status === 'pending').length}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Поиск по жалобам..."
                        className="w-full pl-12 pr-4 py-3 bg-[#1E293B]/60 backdrop-blur-md border border-white/5 rounded-2xl text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]/50 transition-all"
                    />
                </div>
                <div className="flex gap-1 bg-[#1E293B]/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/5">
                    {[
                        { value: 'all', label: 'Все' },
                        { value: 'pending', label: 'Ожидают' },
                        { value: 'in_progress', label: 'В работе' },
                        { value: 'resolved', label: 'Архив' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all relative
                                ${filter === f.value ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                            `}
                        >
                            {f.label}
                            {filter === f.value && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reports List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-10">
                <AnimatePresence mode="popLayout">
                    {filteredReports.map((report, i) => {
                        const TypeIcon = typeConfig[report.type]?.icon || AlertTriangle;
                        const typeStyle = typeConfig[report.type] || { color: 'text-slate-400', bg: 'bg-slate-500/10' };

                        return (
                            <motion.div
                                key={report.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedReport(report)}
                                className={`group relative p-5 bg-[#1E293B]/60 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#06B6D4]/30 hover:bg-[#1E293B]/80 cursor-pointer transition-all overflow-hidden ${priorityColors[report.priority]}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${typeStyle.bg}`}>
                                            <TypeIcon size={22} className={typeStyle.color} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-white text-lg">{report.subject}</h3>
                                                {report.priority === 'high' && (
                                                    <span className="flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-3 line-clamp-1">{report.description}</p>

                                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 bg-black/20 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                                                <span className="flex items-center gap-1.5">
                                                    <User size={12} className="text-slate-400" />
                                                    <span className="text-slate-300">{report.reporter}</span>
                                                </span>
                                                <span className="text-slate-600">→</span>
                                                <span className="text-slate-300">{report.target}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${statusLabels[report.status].color}`}>
                                            {statusLabels[report.status].label}
                                        </span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                                            <Clock size={12} />
                                            {report.date}
                                        </span>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#06B6D4]">
                                            <MoreHorizontal size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {filteredReports.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-60 flex flex-col items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-3xl"
                    >
                        <ShieldAlert size={48} className="mb-4 opacity-50" />
                        <p>Жалоб не найдено</p>
                    </motion.div>
                )}
            </div>

            {/* Report Detail Modal */}
            <AnimatePresence>
                {selectedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedReport(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0F172A] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-hidden relative"
                        >
                            <div className={`absolute top-0 left-0 w-full h-1 
                                ${selectedReport.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'}
                             `} />

                            <div className="flex items-start justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white leading-tight">{selectedReport.subject}</h3>
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setSelectedReport(null)}>
                                    <XCircle size={24} className="text-slate-400 hover:text-white" />
                                </button>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-6">
                                <p className="text-slate-300 leading-relaxed">
                                    {selectedReport.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-[#1E293B] rounded-xl border border-white/5">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Открыл</span>
                                    <p className="font-bold text-white">{selectedReport.reporter}</p>
                                </div>
                                <div className="p-4 bg-[#1E293B] rounded-xl border border-white/5">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">На кого</span>
                                    <p className="font-bold text-white">{selectedReport.target}</p>
                                </div>
                                <div className="p-4 bg-[#1E293B] rounded-xl border border-white/5">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Статус</span>
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${statusLabels[selectedReport.status].color.replace('border', '')}`}>
                                        {statusLabels[selectedReport.status].label}
                                    </span>
                                </div>
                                <div className="p-4 bg-[#1E293B] rounded-xl border border-white/5">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Приоритет</span>
                                    <span className={`text-sm font-bold capitalize ${selectedReport.priority === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                                        {selectedReport.priority === 'high' ? 'Высокий' : 'Средний'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
                                    <CheckCircle2 size={18} />
                                    Решить вопрос
                                </button>
                                <button className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold rounded-xl border border-white/5 transition-all flex items-center justify-center gap-2">
                                    <MessageCircle size={18} />
                                    Написать в чат
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminReports;
