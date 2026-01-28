import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    Clock,
    AlertCircle,
    CheckCircle2,
    Filter,
    Search,
    MoreVertical,
    Star,
    ArrowRight,
    FileText,
    Shield,
    Bot,
    User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onClick}
            className="bg-[#1E293B]/60 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-white/10 hover:border-[#06B6D4]/30 cursor-pointer transition-all group relative overflow-hidden"
        >
            {/* Urgency Stripe */}
            {task.urgency === 'high' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            )}
            {task.urgency === 'medium' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"></div>
            )}

            <div className="flex justify-between items-start mb-3 pl-3">
                <div className="flex items-center gap-2">
                    {task.type === 'chat' && <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><MessageSquare size={16} /></div>}
                    {task.type === 'document' && <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><FileText size={16} /></div>}
                    {task.type === 'audit' && <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400"><Shield size={16} /></div>}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{task.category}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">{task.time}</span>
            </div>

            <h3 className="text-white font-medium text-lg mb-2 pl-3 group-hover:text-[#06B6D4] transition-colors">
                {task.title}
            </h3>

            <p className="text-slate-400 text-sm pl-3 mb-4 line-clamp-2">
                {task.description}
            </p>

            <div className="pl-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 px-2 py-1 rounded-lg">
                        <User size={12} />
                        {task.client}
                    </div>
                    {task.aiReady && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-1 rounded-lg border border-[#06B6D4]/20 animate-pulse">
                            <Bot size={12} />
                            AI PREP
                        </div>
                    )}
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                    <ArrowRight size={18} />
                </button>
            </div>
        </motion.div>
    );
};

const StatWidget = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-[#1E293B]/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500`}>
            <Icon size={24} />
        </div>
        <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
                {label}
                <span className="text-green-400 bg-green-500/10 px-1 rounded">+{trend}%</span>
            </div>
        </div>
    </div>
);

const LawyerDashboard = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // all, urgent, chat, document

    const mockTasks = [
        {
            id: 1,
            type: 'chat',
            category: 'Консультация',
            title: 'Вопрос по налоговым рискам',
            description: 'Клиент спрашивает про дробление бизнеса в связи с новыми поправками. Требуется развернутый ответ.',
            client: 'ООО "Вектор"',
            urgency: 'high',
            time: '15 мин назад',
            aiReady: true
        },
        {
            id: 2,
            type: 'document',
            category: 'Аудит договора',
            title: 'Проверка договора поставки №45',
            description: 'Необходимо проверить раздел ответственности и штрафных санкций. AI нашел 3 критических риска.',
            client: 'ИП Смирнов',
            urgency: 'medium',
            time: '1 час назад',
            aiReady: true
        },
        {
            id: 3,
            type: 'audit',
            category: 'Комплайенс',
            title: 'Заявка на полную проверку юрлица',
            description: 'Новый клиент запросил экспресс-аудит перед сделкой M&A.',
            client: 'ТехноГрупп',
            urgency: 'low',
            time: '3 часа назад',
            aiReady: false
        },
        {
            id: 4,
            type: 'chat',
            category: 'Трудовое право',
            title: 'Увольнение сотрудника',
            description: 'Спорная ситуация с выплатой компенсации.',
            client: 'Стартап Лаб',
            urgency: 'medium',
            time: 'Вчера',
            aiReady: true
        }
    ];

    const filteredTasks = filter === 'all'
        ? mockTasks
        : filter === 'urgent'
            ? mockTasks.filter(t => t.urgency === 'high')
            : mockTasks.filter(t => t.type === filter);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatWidget icon={LayoutDashboard} label="Всего задач" value="12" trend="15" color="blue" />
                <StatWidget icon={AlertCircle} label="Высокий приоритет" value="3" trend="5" color="red" />
                <StatWidget icon={CheckCircle2} label="Завершено" value="45" trend="8" color="green" />
                <StatWidget icon={Clock} label="Среднее время" value="1.2ч" trend="12" color="purple" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-280px)]">
                {/* Smart Inbox Column */}
                <div className="flex-1 flex flex-col bg-[#0F172A] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                Smart Inbox
                                <span className="bg-[#06B6D4]/20 text-[#06B6D4] text-xs px-2 py-0.5 rounded border border-[#06B6D4]/30">AI Powered</span>
                            </h2>
                            <p className="text-slate-400 text-sm">Умная очередь входящих задач</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-xl text-sm transition-colors border ${filter === 'all' ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}>
                                Все
                            </button>
                            <button onClick={() => setFilter('urgent')} className={`px-3 py-1.5 rounded-xl text-sm transition-colors border ${filter === 'urgent' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'border-transparent text-slate-500 hover:text-white'}`}>
                                Срочные
                            </button>
                            <button onClick={() => setFilter('document')} className={`px-3 py-1.5 rounded-xl text-sm transition-colors border ${filter === 'document' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'border-transparent text-slate-500 hover:text-white'}`}>
                                Документы
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 space-y-3 relative z-10">
                        {filteredTasks.length === 0 ? (
                            <div className="text-center py-20 text-slate-500">
                                Задач нет
                            </div>
                        ) : (
                            filteredTasks.map(task => (
                                <TaskCard key={task.id} task={task} onClick={() => {
                                    if (task.type === 'chat') navigate(`/lawyer/chat/${task.id}`);
                                    else navigate('/lawyer/documents');
                                }} />
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: AI Context & Tools */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    {/* Assistant Widget */}
                    <div className="bg-gradient-to-br from-[#06B6D4]/20 to-blue-600/10 border border-[#06B6D4]/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-30 transition-opacity"><Bot size={80} /></div>

                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">AI Ассистент</h3>
                        <p className="text-sm text-slate-300 mb-6 relative z-10">
                            Готов помочь с подготовкой ответов на 3 новых сообщения. Есть черновики.
                        </p>

                        <button
                            onClick={() => navigate('/lawyer/assistant')}
                            className="w-full py-3 bg-[#06B6D4] hover:bg-[#0891b2] text-white rounded-xl font-medium shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 flex items-center justify-center gap-2"
                        >
                            <Bot size={18} />
                            Открыть Ассистента
                        </button>
                    </div>

                    {/* Quick Document Widget */}
                    <div className="flex-1 bg-[#1E293B]/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-purple-400" />
                            Быстрый конструктор
                        </h3>
                        <div className="flex-1 space-y-2">
                            <button onClick={() => navigate('/lawyer/constructor')} className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white text-sm flex items-center justify-between group">
                                <span>Договор поставки</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => navigate('/lawyer/constructor')} className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white text-sm flex items-center justify-between group">
                                <span>Претензия (Шаблон)</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button onClick={() => navigate('/lawyer/constructor')} className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-300 hover:text-white text-sm flex items-center justify-between group">
                                <span>Доверенность</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/lawyer/constructor')}
                            className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm transition-colors"
                        >
                            Все шаблоны
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerDashboard;
