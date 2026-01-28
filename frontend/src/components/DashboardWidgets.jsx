import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, FileCheck, Clock, CheckCircle2, ChevronRight, Send, Settings, Gavel, FileSignature, Check, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { dashboardAPI, documentsAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import useChat from '../hooks/useChat.jsx';

// Loading Skeleton Component
const WidgetSkeleton = ({ className = '' }) => (
    <div className={`glass-card-light p-5 animate-pulse ${className}`}>
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-2/3 mb-3"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
    </div>
);

// Widget A: Active Case Status
export const CaseStatusWidget = ({ caseData, isLoading }) => {
    const navigate = useNavigate();

    if (isLoading) {
        return <WidgetSkeleton />;
    }

    if (!caseData) {
        return (
            <div className="glass-card-light p-5">
                <div className="flex items-center justify-center flex-col py-6 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <FileText size={22} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Нет активных дел</h3>
                    <p className="text-sm text-slate-500 mb-4">Создайте первый запрос для начала работы</p>
                    <button
                        onClick={() => navigate('/dashboard/chat')}
                        className="px-4 py-2 bg-depa-cta text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Начать консультацию
                    </button>
                </div>
            </div>
        );
    }

    const getSteps = () => {
        const statusProgress = {
            'pending': 0,
            'awaiting_payment': 1,
            'in_progress': 2,
            'completed': 3
        };
        const currentStep = statusProgress[caseData.status] || 0;
        return [
            { name: 'Заявка', completed: currentStep >= 1 },
            { name: 'В работе', completed: currentStep >= 2, active: currentStep === 2 },
            { name: 'Завершено', completed: currentStep >= 3 }
        ];
    };

    const steps = getSteps();

    return (
        <div className="glass-card-light p-5 hover:shadow-glass-hover transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-depa-brand/10 text-depa-brand text-xs font-semibold rounded-full mb-2">
                        <Clock size={11} />
                        {caseData.status_display || 'В работе'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{caseData.title}</h3>
                </div>
                <button className="text-xs text-depa-cta hover:text-blue-700 font-medium flex items-center gap-0.5">
                    Подробнее <ChevronRight size={14} />
                </button>
            </div>

            <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Прогресс</span>
                    <span className="text-slate-900 font-bold">{caseData.progress || 33}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${caseData.progress || 33}%` }}
                        transition={{ duration: 1.5, ease: 'circOut' }}
                        className="h-full bg-gradient-to-r from-depa-brand to-depa-dark rounded-full"
                    />
                </div>
            </div>

            <div className="flex items-center">
                {steps.map((step, i) => (
                    <React.Fragment key={step.name}>
                        <div className="flex flex-col items-center shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : step.active
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-white border-slate-200 text-slate-400'
                                }`}>
                                {step.completed ? <CheckCircle2 size={14} /> : i + 1}
                            </div>
                            <span className={`text-[10px] mt-1.5 text-center max-w-[60px] ${step.active ? 'text-depa-brand font-semibold' : step.completed ? 'text-green-600' : 'text-slate-400'
                                }`}>
                                {step.name}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 mt-[-16px]">
                                <div className={`h-full rounded-full ${step.completed ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Widget B: Recent Documents
export const DocumentsWidget = ({ documents, isLoading }) => {
    const navigate = useNavigate();

    if (isLoading) {
        return <WidgetSkeleton />;
    }

    const docs = documents || [];

    return (
        <div className="glass-card-light p-5 hover:shadow-glass-hover transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900">Последние документы</h3>
                <button
                    onClick={() => navigate('/dashboard/documents')}
                    className="text-xs text-depa-cta hover:text-blue-700 font-medium"
                >
                    Все
                </button>
            </div>

            {docs.length === 0 ? (
                <div className="text-center py-4">
                    <FileText size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-xs text-slate-500">Документы пока отсутствуют</p>
                </div>
            ) : (
                <div className="space-y-1.5">
                    {docs.slice(0, 3).map((doc) => (
                        <div
                            key={doc.id || doc.name}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-depa-brand/5 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center flex-shrink-0">
                                    {doc.type === 'pdf' || doc.name?.endsWith('.pdf')
                                        ? <FileText size={16} className="text-red-500" />
                                        : <FileCheck size={16} className="text-depa-cta" />
                                    }
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-800 truncate">{doc.name}</p>
                                    <p className="text-xs text-slate-400">{doc.date}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${doc.status === 'ready'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                                }`}>
                                {doc.status === 'ready' ? 'Готов' : 'На проверке'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Widget C: Chat Preview with Real Messages
export const ChatPreviewWidget = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isConnected, messages, lawyer } = useChat(user?.id);

    const goToChat = () => navigate('/dashboard/chat');

    // Debug
    console.log('ChatPreviewWidget - messages:', messages?.length, 'lastMessage:', messages?.[messages?.length - 1]);

    // Get last message
    const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;

    const lawyerInfo = lawyer || {
        name: 'Юрист Depa',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return 'Сейчас';
        const date = new Date(dateStr);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div
            onClick={goToChat}
            className="glass-card-light p-4 hover:shadow-glass-hover hover:border-depa-cta/30 transition-all duration-300 group h-full flex flex-col cursor-pointer"
        >
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-3">
                <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-depa-cta/50 transition-colors">
                        <img
                            src={lawyerInfo.avatar}
                            alt="Lawyer"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {isConnected && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-semibold text-base text-slate-800 truncate">{lawyerInfo.name}</p>
                    <p className="text-xs text-green-600">{isConnected ? 'Онлайн' : 'Оффлайн'}</p>
                </div>
            </div>

            {/* Message Preview */}
            <div className="flex-1 mb-3 min-h-[50px]">
                {lastMessage ? (
                    <div className={`flex ${lastMessage.senderRole === 'CLIENT' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-2xl p-2.5 max-w-full ${lastMessage.senderRole === 'CLIENT'
                            ? 'bg-depa-cta text-white rounded-br-md'
                            : 'bg-slate-100 group-hover:bg-depa-brand/5 text-slate-700 rounded-bl-md'
                            } transition-colors`}>
                            <p className="text-sm line-clamp-2">{lastMessage.content}</p>
                            <p className={`text-[10px] mt-1 ${lastMessage.senderRole === 'CLIENT' ? 'text-blue-200' : 'text-slate-400'}`}>
                                {formatTime(lastMessage.createdAt)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-center">
                        <div>
                            <MessageSquare size={20} className="mx-auto text-slate-300 mb-1" />
                            <p className="text-[10px] text-slate-400">Начните диалог</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between bg-slate-50 group-hover:bg-depa-brand/5 rounded-xl px-3 py-2.5 transition-colors mt-auto">
                <span className="text-sm text-slate-500 group-hover:text-depa-cta transition-colors">Написать...</span>
                <Send size={14} className="text-slate-400 group-hover:text-depa-cta transition-colors" />
            </div>
        </div>
    );
};

// Widget D: Subscription Panel
export const SubscriptionWidget = ({ subscription, isLoading }) => {
    const navigate = useNavigate();

    const defaultSubscription = {
        plan: 'Бесплатный',
        status: 'inactive',
        price: 0,
        expires_at: null
    };

    const sub = subscription || defaultSubscription;
    const isActive = sub.status === 'active';

    const activeModules = [
        { name: 'Судебная защита', icon: Gavel },
        { name: '10 Договоров / мес', icon: FileSignature }
    ];

    if (isLoading) {
        return <WidgetSkeleton />;
    }

    return (
        <div className="glass-card-light p-5 hover:shadow-glass-hover transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900">Моя подписка</h3>
                <span className={`flex items-center gap-1 text-[10px] font-medium ${isActive ? 'text-green-600' : 'text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                    {isActive ? 'Активна' : 'Неактивна'}
                </span>
            </div>

            {/* Plan Info */}
            <div className={`rounded-xl p-4 text-white mb-4 relative overflow-hidden ${isActive ? 'bg-gradient-to-br from-depa-brand to-depa-dark' : 'bg-gradient-to-br from-slate-500 to-slate-700'}`}>
                <p className="text-blue-200 text-[10px] font-medium mb-0.5">
                    {isActive ? 'Текущий тариф' : 'Тариф не выбран'}
                </p>
                <h4 className="text-lg font-bold">{sub.plan}</h4>
                {sub.price > 0 && (
                    <p className="text-base font-semibold">
                        {sub.price.toLocaleString('ru-RU')} ₽
                        <span className="text-xs font-normal text-blue-200"> / мес</span>
                    </p>
                )}
                {sub.expires_at && (
                    <p className="text-[10px] text-blue-200 mt-1">До {sub.expires_at}</p>
                )}
            </div>

            {/* Active Modules */}
            {isActive && (
                <div className="flex-1 mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Модули</p>
                    <div className="space-y-1.5">
                        {activeModules.map((mod) => (
                            <div key={mod.name} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                                <div className="w-6 h-6 rounded bg-depa-brand/10 flex items-center justify-center">
                                    <mod.icon size={12} className="text-depa-brand" />
                                </div>
                                <span className="text-xs font-medium text-slate-700">{mod.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/dashboard/settings'); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <Settings size={12} />
                    Настроить
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('/dashboard/billing'); }}
                    className="flex-1 py-2 bg-depa-cta text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                    {isActive ? 'Продлить' : 'Оформить'}
                </button>
            </div>
        </div>
    );
};

// Dashboard Widgets Layout
const DashboardWidgets = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [statsData, docsData] = await Promise.all([
                    dashboardAPI.getStats().catch(() => null),
                    documentsAPI.getAll().catch(() => [])
                ]);
                setDashboardData(statsData);
                setDocuments(docsData);
            } catch (err) {
                console.error('Dashboard data fetch error:', err);
                setError('Ошибка загрузки данных');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const activeCase = dashboardData?.recent_orders?.find(
        order => order.status !== 'completed'
    ) || null;

    return (
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden pr-1">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 mb-4">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-4">
                    <CaseStatusWidget caseData={activeCase} isLoading={isLoading} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DocumentsWidget documents={documents} isLoading={isLoading} />
                        <SubscriptionWidget
                            subscription={dashboardData?.subscription}
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                {/* Side Column */}
                <div className="lg:col-span-1">
                    <ChatPreviewWidget />
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;
