import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const billingHistory = [
    { id: 1, date: '01.01.2026', description: 'Тариф "Бизнес Оптимум"', amount: '45 000 ₽', status: 'paid' },
    { id: 2, date: '01.12.2025', description: 'Тариф "Бизнес Оптимум"', amount: '45 000 ₽', status: 'paid' },
    { id: 3, date: '01.11.2025', description: 'Тариф "Бизнес Оптимум"', amount: '45 000 ₽', status: 'paid' },
    { id: 4, date: '01.10.2025', description: 'Подключение тарифа', amount: '45 000 ₽', status: 'paid' },
];

const statusConfig = {
    paid: { label: 'Оплачено', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    pending: { label: 'Ожидает', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    failed: { label: 'Ошибка', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' }
};

const BillingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({ name: 'Бизнес Оптимум', price: 45000 });
    const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);

    // Deep Linking: Auto-open payment modal if intent state is present
    useEffect(() => {
        const intentState = location.state;

        if (intentState?.intent === 'subscription' || intentState?.intent === 'service') {
            // Set plan/service details from intent
            setSelectedPlan({
                name: intentState.planName || intentState.serviceName || 'Выбранная услуга',
                price: intentState.planPrice || intentState.servicePrice || 45000
            });

            // Show welcome banner
            setShowWelcomeBanner(true);

            // Auto-open payment modal after brief delay for UX
            setTimeout(() => {
                setIsPaymentModalOpen(true);
            }, 500);

            // Clear the state to prevent re-triggering on refresh
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.state, location.pathname, navigate]);

    return (
        <div className="space-y-8">
            {/* Welcome Banner (shows when user came from landing with intent) */}
            {showWelcomeBanner && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Sparkles size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">Добро пожаловать! 🎉</h3>
                        <p className="text-slate-600 text-sm">
                            Вы выбрали <span className="font-semibold text-blue-700">{selectedPlan.name}</span>.
                            Оформите подписку, чтобы начать работу.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowWelcomeBanner(false)}
                        className="text-slate-400 hover:text-slate-600 text-lg"
                    >
                        ×
                    </button>
                </motion.div>
            )}

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Финансы и подписка</h2>
                <p className="text-slate-500 text-sm">Управление тарифом и история платежей</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute right-20 bottom-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard size={20} className="text-blue-300" />
                            <span className="text-blue-200 text-sm font-medium">Текущий тариф</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Бизнес Оптимум</h3>
                        <p className="text-xl font-semibold">45 000 ₽<span className="text-sm font-normal text-blue-200"> / месяц</span></p>

                        <div className="flex items-center gap-2 mt-4 text-blue-200 text-sm">
                            <Calendar size={16} />
                            <span>Активен до <span className="text-white font-semibold">20 февраля 2026</span></span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors text-sm">
                            Сменить тариф
                        </button>
                        <motion.button
                            onClick={() => {
                                setSelectedPlan({ name: 'Бизнес Оптимум', price: 45000 });
                                setIsPaymentModalOpen(true);
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="px-5 py-3 bg-white text-blue-700 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-sm"
                        >
                            Продлить подписку
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Plan Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Договоров в месяц', value: '10' },
                    { label: 'Консультаций', value: '5' },
                    { label: 'Судебное представительство', value: 'Включено' }
                ].map((feature) => (
                    <div key={feature.label} className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-2xl font-bold text-slate-900">{feature.value}</p>
                        <p className="text-sm text-slate-500">{feature.label}</p>
                    </div>
                ))}
            </div>

            {/* Transaction History */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">История платежей</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Экспорт →
                    </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Описание</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Сумма</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingHistory.map((item) => {
                                const status = statusConfig[item.status];
                                return (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 text-sm text-slate-500 font-mono">{item.date}</td>
                                        <td className="py-4 px-6 text-sm text-slate-800 font-medium">{item.description}</td>
                                        <td className="py-4 px-6 text-sm text-slate-900 font-bold">{item.amount}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                                                <status.icon size={12} />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                <Download size={14} />
                                                PDF
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                planName={selectedPlan.name}
                amount={selectedPlan.price.toLocaleString('ru-RU')}
            />
        </div>
    );
};

export default BillingPage;
