import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    Play,
    Pause,
    Search,
    Plus,
    Bell,
    X,
    MoreHorizontal
} from 'lucide-react';

const TASK_TYPES = [
    { id: 'contract', label: 'Договор', duration: 45, color: 'blue' },
    { id: 'check', label: 'Проверка', duration: 30, color: 'purple' },
    { id: 'claim', label: 'Претензия', duration: 60, color: 'red' },
    { id: 'consult', label: 'Консультация', duration: 20, color: 'green' },
];

const LAWYERS = [
    { id: 1, name: 'Александр Петров', initials: 'АП', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 2, name: 'Елена Смирнова', initials: 'ЕС', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 3, name: 'Дмитрий Волков', initials: 'ДВ', color: 'bg-gradient-to-br from-orange-500 to-amber-500' },
];

const INITIAL_TASKS = [
    {
        id: 1,
        typeId: 'contract',
        title: 'Поставка оборудования (Вектор)',
        client: 'ООО "Вектор"',
        lawyerId: 1,
        priority: 'high',
        status: 'in_progress',
        startTime: Date.now() - 1000 * 60 * 35,
        baseDuration: 45
    },
    {
        id: 2,
        typeId: 'check',
        title: 'Аудит ИП Иванов',
        client: 'ИП Иванов А.А.',
        lawyerId: 2,
        priority: 'medium',
        status: 'in_progress',
        startTime: Date.now() - 1000 * 60 * 40,
        baseDuration: 30
    },
    {
        id: 3,
        typeId: 'consult',
        title: 'Налоговые риски 2024',
        client: 'TechStart LLC',
        lawyerId: 3,
        priority: 'low',
        status: 'done',
        startTime: Date.now() - 1000 * 60 * 120,
        baseDuration: 20
    },
    {
        id: 4,
        typeId: 'claim',
        title: 'Претензия ЖК "Светлый"',
        client: 'Григорьев В.В.',
        lawyerId: 1,
        priority: 'high',
        status: 'in_progress',
        startTime: Date.now() - 1000 * 60 * 5,
        baseDuration: 60
    }
];

const formatTime = (ms) => {
    const totalSeconds = Math.floor(Math.abs(ms) / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${ms < 0 ? '-' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const TaskCard = ({ task, currentTime, onAction }) => {
    const lawyer = LAWYERS.find(l => l.id === task.lawyerId);
    const type = TASK_TYPES.find(t => t.id === task.typeId);

    const elapsed = currentTime - task.startTime;
    const itemsLeft = (task.baseDuration * 60 * 1000) - elapsed;
    const isOverdue = itemsLeft < 0;
    const isDone = task.status === 'done';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`
                group relative overflow-hidden rounded-3xl border transition-all duration-300
                ${isDone
                    ? 'bg-[#1E293B]/40 border-white/5 opacity-60'
                    : isOverdue
                        ? 'bg-[#1E293B] border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                        : 'bg-[#1E293B] border-white/5 hover:border-[#06B6D4]/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]'}
            `}
        >
            {/* Status Indicator Stripe */}
            <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors duration-500
                ${isDone ? 'bg-slate-500' : isOverdue ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.5)]'}
            `} />

            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 
                            bg-${type.color}-500/10 text-${type.color}-400 inline-block px-2 py-1 rounded-md
                        `}>
                            {type.label}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight mb-1">{task.title}</h3>
                        <div className="text-sm text-slate-400 font-medium">{task.client}</div>
                    </div>
                </div>

                {/* Timer Large Display */}
                {!isDone && (
                    <div className="mb-6 flex items-end justify-between">
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                                Таймер
                            </p>
                            <div className={`text-4xl font-mono font-bold tracking-tighter tabular-nums leading-none
                                ${isOverdue ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-white'}
                            `}>
                                {formatTime(itemsLeft)}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                                Норматив
                            </p>
                            <div className="text-sm font-bold text-slate-400">
                                {task.baseDuration} мин
                            </div>
                        </div>
                    </div>
                )}
                {isDone && (
                    <div className="mb-6 flex items-center justify-center h-[52px] bg-green-500/10 rounded-xl border border-green-500/20 text-green-400 gap-2 font-bold">
                        <CheckCircle2 size={18} />
                        ЗАДАЧА ВЫПОЛНЕНА
                    </div>
                )}

                {/* Footer / Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg ring-2 ring-[#0F172A] ${lawyer.color}`}>
                            {lawyer.initials}
                        </div>
                        <div className="text-xs text-slate-400">
                            <span className="block text-white font-bold">{lawyer.name.split(' ')[0]}</span>
                            <span className="opacity-60">Юрист</span>
                        </div>
                    </div>

                    {!isDone && (
                        <div className="flex gap-2">
                            <button onClick={() => onAction(task.id, 'pause')} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                                <Pause size={16} fill="currentColor" />
                            </button>
                            <button onClick={() => onAction(task.id, 'done')} className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-500 hover:text-green-400 transition-colors border border-green-500/20">
                                <CheckCircle2 size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isOverdue && !isDone && (
                <div className="absolute top-0 right-0 p-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-ping" />
                </div>
            )}
        </motion.div>
    );
};

const SignalItem = ({ task }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: 50, height: 0 }}
        animate={{ opacity: 1, x: 0, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-red-500/10 backdrop-blur-md border-l-[3px] border-red-500 p-4 mb-3 rounded-r-xl relative overflow-hidden group"
    >
        <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors" />
        <div className="relative z-10 flex justify-between items-start gap-3">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Просрочка</span>
                </div>
                <h4 className="text-white font-bold text-sm leading-tight mb-1">{task.title}</h4>
                <p className="text-slate-400 text-xs">Время на задачу истекло</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
                Сейчас
            </span>
        </div>
    </motion.div>
);

const CreateTaskModal = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [client, setClient] = useState('');
    const [lawyer, setLawyer] = useState(LAWYERS[0].id);
    const [type, setType] = useState(TASK_TYPES[0].id);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ title, client, lawyerId: parseInt(lawyer), typeId: type, priority: 'medium' });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0F172A] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-white font-bold text-xl">Новое поручение</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-slate-400 hover:text-white" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Задача</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:border-[#06B6D4] focus:bg-white/10 outline-none transition-all" placeholder="Суть задачи..." autoFocus />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Клиент</label>
                        <input value={client} onChange={e => setClient(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:border-[#06B6D4] focus:bg-white/10 outline-none transition-all" placeholder="Компания или ФИО" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Тип</label>
                            <div className="relative">
                                <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none appearance-none focus:border-[#06B6D4] transition-all">
                                    {TASK_TYPES.map(t => <option key={t.id} value={t.id}>{t.label} ({t.duration}м)</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Исполнитель</label>
                            <select value={lawyer} onChange={e => setLawyer(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none appearance-none focus:border-[#06B6D4] transition-all">
                                {LAWYERS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#06B6D4] hover:bg-[#0891b2] text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:scale-[1.02]">
                        Запустить таймер
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const AdminDashboard = () => {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [filter, setFilter] = useState('all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [overdueSignals, setOverdueSignals] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setCurrentTime(now);

            tasks.forEach(task => {
                if (task.status === 'in_progress') {
                    const elapsed = now - task.startTime;
                    const durationMs = task.baseDuration * 60 * 1000;
                    if (elapsed > durationMs && !task.signaled) {
                        setOverdueSignals(prev => [{ id: Date.now(), title: task.title }, ...prev].slice(0, 5));
                        task.signaled = true; // Local mutation for mock
                    }
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [tasks]);

    const handleCreateTask = (taskData) => {
        const type = TASK_TYPES.find(t => t.id === taskData.typeId);
        const newTask = {
            id: Date.now(),
            ...taskData,
            status: 'in_progress',
            startTime: Date.now(),
            baseDuration: type.duration
        };
        setTasks([newTask, ...tasks]);
        setIsCreateOpen(false);
    };

    const handleAction = (taskId, action) => {
        setTasks(tasks.map(t => {
            if (t.id === taskId) {
                if (action === 'done') return { ...t, status: 'done' };
                if (action === 'pause') return { ...t, status: 'paused' };
            }
            return t;
        }));
    };

    const stats = {
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        doneToday: tasks.filter(t => t.status === 'done').length,
        overdue: tasks.filter(t => t.status === 'in_progress' && (currentTime - t.startTime) > t.baseDuration * 60 * 1000).length
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        if (filter === 'done') return t.status === 'done';
        if (filter === 'overdue') return t.status === 'in_progress' && (currentTime - t.startTime) > t.baseDuration * 60 * 1000;
        return true;
    });

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">

            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-8">
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-4 min-w-[140px] shadow-lg">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Активные</div>
                        <div className="text-3xl font-mono font-bold text-white">{stats.inProgress}</div>
                    </div>
                    <div className={`bg-[#1E293B] border rounded-2xl p-4 min-w-[140px] shadow-lg transition-colors ${stats.overdue > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${stats.overdue > 0 ? 'text-red-400' : 'text-slate-500'}`}>Просрочка</div>
                        <div className={`text-3xl font-mono font-bold ${stats.overdue > 0 ? 'text-red-500' : 'text-slate-600'}`}>{stats.overdue}</div>
                    </div>
                    <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-4 min-w-[140px] shadow-lg">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Готово</div>
                        <div className="text-3xl font-mono font-bold text-green-500">{stats.doneToday}</div>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-[#06B6D4] transition-colors outline-none h-12"
                            placeholder="Поиск..."
                        />
                    </div>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="h-12 px-6 bg-[#06B6D4] hover:bg-[#0891b2] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Новая задача</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/5 pb-1">
                {['all', 'overdue', 'done'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 text-sm font-bold relative transition-colors ${filter === f ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {f === 'all' && 'Все задачи'}
                        {f === 'overdue' && 'Просроченные'}
                        {f === 'done' && 'Архив'}
                        {filter === f && (
                            <motion.div layoutId="activeTab" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex gap-8 overflow-hidden">

                {/* Scrollable Grid */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredTasks.map(task => (
                                <TaskCard key={task.id} task={task} currentTime={currentTime} onAction={handleAction} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    {filteredTasks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-40 flex items-center justify-center text-slate-600 border border-dashed border-white/10 rounded-3xl"
                        >
                            Список задач пуст
                        </motion.div>
                    )}
                </div>

                {/* Notifications Panel (Fixed) */}
                <div className="w-80 shrink-0 border-l border-white/5 pl-6 hidden lg:flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                            <Bell size={16} />
                        </div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wide">Сигналы</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {overdueSignals.map(sig => (
                                <SignalItem key={sig.id} task={sig} />
                            ))}
                        </AnimatePresence>
                        {overdueSignals.length === 0 && (
                            <div className="text-center py-10 text-slate-600 text-sm">
                                Нет активных сигналов
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {isCreateOpen && <CreateTaskModal onClose={() => setIsCreateOpen(false)} onCreate={handleCreateTask} />}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
