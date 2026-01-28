import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle, MessageSquare, User, Clock,
    CheckCircle, XCircle, Eye, Filter, Search
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
        pending: { label: 'Ожидает', color: 'bg-amber-100 text-amber-700' },
        in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-700' },
        resolved: { label: 'Решено', color: 'bg-green-100 text-green-700' },
        rejected: { label: 'Отклонено', color: 'bg-slate-100 text-slate-700' }
    };

    const priorityColors = {
        high: 'border-l-red-500',
        medium: 'border-l-amber-500',
        low: 'border-l-slate-300'
    };

    const filteredReports = reports.filter(r => filter === 'all' || r.status === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
                    <h1 className="text-2xl font-bold text-slate-900">Жалобы и обращения</h1>
                    <p className="text-slate-500">Обработка входящих обращений</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500">Ожидают: <span className="font-semibold text-amber-600">{reports.filter(r => r.status === 'pending').length}</span></span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                    {[
                        { value: 'all', label: 'Все' },
                        { value: 'pending', label: 'Ожидают' },
                        { value: 'in_progress', label: 'В работе' },
                        { value: 'resolved', label: 'Решено' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === f.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                {filteredReports.map((report, i) => (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedReport(report)}
                        className={`p-5 hover:bg-slate-50 cursor-pointer transition-colors border-l-4 ${priorityColors[report.priority]}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.type === 'lawyer' ? 'bg-red-100' :
                                        report.type === 'content' ? 'bg-purple-100' :
                                            'bg-blue-100'
                                    }`}>
                                    {report.type === 'lawyer' ? <User size={18} className="text-red-600" /> :
                                        report.type === 'content' ? <MessageSquare size={18} className="text-purple-600" /> :
                                            <AlertTriangle size={18} className="text-blue-600" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{report.subject}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{report.description}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                        <span>От: {report.reporter}</span>
                                        <span>→</span>
                                        <span>На: {report.target}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusLabels[report.status].color}`}>
                                    {statusLabels[report.status].label}
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={12} />
                                    {report.date}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Report Detail Modal */}
            <AnimatePresence>
                {selectedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedReport(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">{selectedReport.subject}</h3>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusLabels[selectedReport.status].color}`}>
                                    {statusLabels[selectedReport.status].label}
                                </span>
                            </div>

                            <p className="text-slate-600 mb-4">{selectedReport.description}</p>

                            <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-400">Отправитель:</span>
                                        <p className="font-medium text-slate-900">{selectedReport.reporter}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Объект жалобы:</span>
                                        <p className="font-medium text-slate-900">{selectedReport.target}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Дата:</span>
                                        <p className="font-medium text-slate-900">{selectedReport.date}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Приоритет:</span>
                                        <p className="font-medium text-slate-900 capitalize">{selectedReport.priority}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Закрыть
                                </button>
                                <button className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <CheckCircle size={18} />
                                    Решено
                                </button>
                                <button className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <XCircle size={18} />
                                    Отклонить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AdminReports;
