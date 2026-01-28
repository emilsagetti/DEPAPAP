import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Kanban, GitBranch, Plus, MoreHorizontal, Clock, CheckCircle2, AlertCircle, Play, Settings, Users, FileText, ArrowRight } from 'lucide-react';

const WorkflowCard = ({ title, type, assignee, dueDate, status, automation }) => {
    return (
        <motion.div
            layoutId={title}
            className="bg-[#1E293B]/60 backdrop-blur-md border border-white/5 p-4 rounded-xl mb-3 cursor-grab active:cursor-grabbing hover:bg-white/10 hover:border-[#06B6D4]/30 transition-all group relative overflow-hidden"
        >
            {/* Automation Indicator */}
            {automation && (
                <div className="absolute top-0 right-0 p-1.5 bg-[#06B6D4]/10 rounded-bl-xl border-b border-l border-[#06B6D4]/20">
                    <GitBranch size={12} className="text-[#06B6D4]" />
                </div>
            )}

            <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${type === 'contract' ? 'bg-blue-500/10 text-blue-300' :
                    type === 'litigation' ? 'bg-purple-500/10 text-purple-300' : 'bg-slate-500/10 text-slate-300'
                    }`}>
                    {type === 'contract' ? 'Договоры' : type === 'litigation' ? 'Суды' : 'Корпоративное'}
                </span>
                <button className="text-white/20 hover:text-white transition-colors">
                    <MoreHorizontal size={14} />
                </button>
            </div>

            <h4 className="text-white font-medium text-sm mb-3 leading-snug group-hover:text-[#06B6D4] transition-colors">
                {title}
            </h4>

            <div className="flex items-center justify-between text-xs text-white/40">
                <div className="flex items-center gap-2">
                    {assignee ? (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-[8px] text-white font-bold">
                            {assignee}
                        </div>
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                            <Users size={10} />
                        </div>
                    )}
                </div>

                {dueDate && (
                    <div className={`flex items-center gap-1 ${status === 'urgent' ? 'text-red-400' : ''}`}>
                        <Clock size={12} />
                        <span>{dueDate}</span>
                    </div>
                )}
            </div>

            {/* Automation Progress Bar (Mock) */}
            {automation && (
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#06B6D4] w-2/3"></div>
                </div>
            )}
        </motion.div>
    );
};

const Column = ({ title, count, children, icon: Icon }) => (
    <div className="flex-1 min-w-[280px] flex flex-col h-full bg-black/20 rounded-2xl border border-white/5 p-2">
        <div className="flex items-center justify-between p-3 mb-2">
            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                {Icon && <Icon size={16} className="text-white/40" />}
                {title}
                <span className="bg-white/10 text-white/60 text-xs px-1.5 py-0.5 rounded-md ml-1">{count}</span>
            </h3>
            <button className="text-white/20 hover:text-white transition-colors p-1 hover:bg-white/5 rounded">
                <Plus size={16} />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 space-y-1">
            {children}
        </div>
    </div>
);

const CreateWorkflowModal = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
        <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
            className="w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <GitBranch className="text-[#06B6D4]" />
                    Создать автоматизацию
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Settings size={20} className="text-white/40" /></button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="h-40 bg-white/5 border border-white/10 hover:bg-[#06B6D4]/10 hover:border-[#06B6D4] rounded-2xl p-6 flex flex-col items-start gap-3 transition-all group text-left">
                    <div className="p-3 bg-[#06B6D4]/20 text-[#06B6D4] rounded-xl group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Согласование договора</h3>
                        <p className="text-xs text-slate-400 mt-1">Автоматический маршрут: Юрист {'->'} Бухгалтер {'->'} Генеральный директор</p>
                    </div>
                </button>

                <button className="h-40 bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500 rounded-2xl p-6 flex flex-col items-start gap-3 transition-all group text-left">
                    <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Претензионная работа</h3>
                        <p className="text-xs text-slate-400 mt-1">Генерация претензии {'->'} Отправка {'->'} Контроль сроков ответа</p>
                    </div>
                </button>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-white/60 hover:text-white transition-colors">Отмена</button>
                <button className="px-6 py-2 bg-[#06B6D4] hover:bg-[#0891b2] text-white rounded-xl font-medium shadow-lg shadow-cyan-500/20">Конструктор (Beta)</button>
            </div>
        </motion.div>
    </motion.div>
);

const CabinetWorkflows = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Процессы
                        <span className="text-xs font-bold bg-[#06B6D4] text-white px-2 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.4)]">BETA</span>
                    </h1>
                    <p className="text-slate-400">Автоматизация юридических задач и канбан-доска.</p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#06B6D4] hover:bg-[#0891b2] hover:scale-105 active:scale-95 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    <Plus size={20} />
                    <span>Новый процесс</span>
                </button>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 h-full min-w-[1000px]">

                    {/* Inbox */}
                    <Column title="Входящие" count={2} icon={FileText}>
                        <WorkflowCard title="Согласование договора поставки №123" type="contract" assignee="AB" dueDate="Сегодня" status="urgent" automation={true} />
                        <WorkflowCard title="Запрос на проверку контрагента" type="corporate" />
                    </Column>

                    {/* In Progress */}
                    <Column title="В работе" count={3} icon={Clock}>
                        <WorkflowCard title="Подготовка иска к ООО 'Ромашка'" type="litigation" assignee="MK" dueDate="2 фев" />
                        <WorkflowCard title="Регистрация изменения устава" type="corporate" assignee="AB" automation={true} />
                        <WorkflowCard title="Анализ рисков по сделке M&A" type="contract" assignee="S" />
                    </Column>

                    {/* Review */}
                    <Column title="Согласование" count={1} icon={Users}>
                        <WorkflowCard title="Трудовой договор (Шаблон 2024)" type="contract" assignee="HR" />
                    </Column>

                    {/* Done */}
                    <Column title="Завершено" count={12} icon={CheckCircle2}>
                        <WorkflowCard title="Ответ на претензию А-40/..." type="litigation" />
                        <div className="text-center p-4 text-xs text-white/20 italic">
                            Показать архив (11)
                        </div>
                    </Column>
                </div>
            </div>

            <AnimatePresence>
                {isCreateOpen && <CreateWorkflowModal onClose={() => setIsCreateOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default CabinetWorkflows;
