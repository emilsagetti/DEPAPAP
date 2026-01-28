import React, { useState } from 'react';
import { CreditCard, Check, Shield, Star, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../../components/PaymentModal';

const CabinetTariff = () => {
    const { user, updateProfile } = useAuth(); // Assuming we can use updateProfile to mock-update sub status locally if needed, or just reload
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPlanForBuy, setSelectedPlanForBuy] = useState(null);

    // Determines if user has active subscription. 
    // In a real app we might refetch user profile after payment.
    const hasActiveSubscription = user?.subscription_status === 'active';

    const handleBuyClick = (plan) => {
        setSelectedPlanForBuy(plan);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentComplete = async (planId, method) => {
        // Mock API call to update user subscription status
        console.log(`Payment completed for ${planId} via ${method}`);

        // Optimistically update user context or trigger a refetch
        // Here we just reload or let the parent know. 
        // Ideally: await AuthService.subscribe(planId); await fetchUser();

        // For demo: mimic update
        // We can't easily mutate 'user' from here without a setter in context that handles deep merge or refetch
        // So we might need to rely on the backend being real OR a mock function in AuthContext.
        // Let's assume we refresh the page or redirect.

        // Hack for demo: Update local storage or trigger a window reload to let AuthContext refetch if we had an endpoint
        // Since we don't have a real endpoint for "buy", we can't truly persist it without backend.
        // But the requirement says "mock keys" wrapper.

        // Let's try to updateProfile with a "mock" subscription status if the backend allows it (unlikely for security)
        // OR just simulate it in UI state if we were only local. 
        // But since we want to unlock sidebar, we need to update AuthContext state.

        // For now, reload window to force a "fresh" state if backend was updated.
        // Since backend is NOT updated, this won't persist. 
        // I should probably add a wrapper in AuthProvider to "setSubscriptionStatus" for DEMO purposes if needed.
        // But better: Assume backend integration is next step.
        // I will just navigate to dashboard or show success.

        // Updating user structure via a special hidden prop for demo if possible? 
        // No, let's just use window.location.reload() for now after a short delay, 
        // assuming the "backend" would have updated the status. 
        // BUT since we don't have the backend endpoint, this will just fail to unlock.

        // ALERT: The user wants "Subscription Gating" working. 
        // Without backend support for storing 'active', I cannot make it persistent.
        // I will assume for the DEMO that I can rely on a temporary local state or just "Pretend" it worked
        // by manually mutating the user object in context (if I had setUser exposed).
        // I don't have setUser exposed. 

        // I will force a reload to /cabinet which will re-run the layout check.
        // If I can't persist it, I can't demonstrate unlocking.
        // Solution: I'll use localStorage to 'fake' the subscription status in my AuthContext.
        localStorage.setItem('demo_subscription_status', 'active');
        window.location.href = '/cabinet';
    };

    // ... Plan definitions ...
    const plansString = [
        {
            id: 'start',
            name: 'Стартовый',
            price: 50000,
            features: ['5 устных консультаций', '2 письменных заключения', 'Базовая проверка контрагентов', 'Хранилище 1 ГБ']
        },
        {
            id: 'business',
            name: 'Бизнес',
            price: 150000,
            recommended: true,
            features: ['15 устных консультаций', '10 письменных заключений', 'Аудит договоров', 'Личный менеджер 24/7', 'Хранилище 10 ГБ']
        },
        {
            id: 'premium',
            name: 'Премиум',
            price: 300000,
            features: ['Безлимитные консультации', 'Полное сопровождение сделок', 'Представительство в суде', 'Выезд юриста в офис', 'Приоритетная поддержка']
        }
    ];

    // If active, show Management View
    if (hasActiveSubscription) {
        const currentPlanDetails = plansString.find(p => p.id === (user?.plan || 'business')) || plansString[1];

        return (
            <div className="space-y-8 animate-fade-in relative z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                <CreditCard size={24} />
                            </div>
                            Управление подпиской
                        </h2>
                        <p className="text-white/50 mt-2 text-sm pl-14">Информация о вашем текущем тарифе и лимитах</p>
                    </div>
                    {/* Demo Reset Button */}
                    {localStorage.getItem('demo_subscription_status') && (
                        <button
                            onClick={() => { localStorage.removeItem('demo_subscription_status'); window.location.reload(); }}
                            className="text-xs text-white/30 hover:text-red-400 border border-white/5 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Сброс демо режима
                        </button>
                    )}
                </div>

                {/* Active Plan Card */}
                <div className="glass-card p-1 rounded-[32px] animate-slide-up opacity-0 relative group" style={{ animationDelay: '100ms' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 via-blue-600/10 to-transparent rounded-[32px] opacity-50"></div>

                    <div className="bg-[#050B14]/90 backdrop-blur-xl rounded-[30px] p-8 border border-white/10 relative z-10 overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row gap-10">
                            {/* Left Info */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <h3 className="text-5xl font-bold text-white tracking-tight">{currentPlanDetails.name}</h3>
                                        <span className="bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse-slow">
                                            АКТИВЕН
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                                        Полная юридическая поддержка вашего бизнеса с приоритетным обслуживанием и расширенными лимитами.
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:bg-white/[0.07] transition-colors group/stat">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-white/50">Запросы</span>
                                            <Zap size={16} className="text-[#06B6D4] opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-3">4 <span className="text-white/30 text-base font-medium">/ 15</span></div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#06B6D4] to-blue-500 rounded-full w-[30%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:bg-white/[0.07] transition-colors group/stat">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-white/50">Консультации</span>
                                            <Star size={16} className="text-purple-400 opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-3">2 <span className="text-white/30 text-base font-medium">/ 10</span></div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[20%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:bg-white/[0.07] transition-colors group/stat">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-white/50">Хранилище</span>
                                            <Shield size={16} className="text-orange-400 opacity-50 group-hover/stat:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-3">1.2 <span className="text-white/30 text-base font-medium">ГБ</span></div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-[12%] shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="lg:w-80 space-y-4">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-[24px] backdrop-blur-md relative overflow-hidden group/card hover:bg-white/[0.07] transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                                    <p className="text-sm font-medium text-white/50 mb-1">Следующее списание</p>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-2xl font-bold text-white">23.02.2026</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-t border-white/10 mb-4">
                                        <span className="text-sm text-white/60">Сумма:</span>
                                        <span className="text-[#06B6D4] font-bold text-lg">{currentPlanDetails.price.toLocaleString()} ₽</span>
                                    </div>

                                    <button className="w-full py-3.5 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95 transition-all">
                                        Продлить подписку
                                    </button>
                                </div>

                                <button className="w-full py-3.5 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-xl font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    <Zap size={16} />
                                    Настроить автоплатеж
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // "Choose Tariff" View (Not Active)
    return (
        <div className="space-y-12 animate-fade-in pb-12 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto pt-8 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Выберите свой уровень <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] to-blue-500">юридической защиты</span>
                </h2>
                <p className="text-lg text-white/50 leading-relaxed">
                    Получите доступ к профессиональным юридическим услугам, конструктору документов и поддержке 24/7.
                    Выбирайте тариф, который подходит именно вашему бизнесу.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                {plansString.map((plan, index) => {
                    const isRecommended = plan.recommended;
                    const icon = plan.id === 'start' ? Shield : plan.id === 'business' ? Zap : Star;

                    return (
                        <div
                            key={plan.id}
                            style={{ animationDelay: `${index * 150 + 200}ms` }}
                            className={`relative group rounded-[32px] transition-all duration-500 hover:-translate-y-2 animate-slide-up opacity-0 ${isRecommended ? 'z-10 lg:-mt-4 lg:mb-4' : 'z-0'
                                }`}
                        >
                            {/* Glass Background */}
                            <div className={`absolute inset-0 rounded-[32px] backdrop-blur-xl border transition-all duration-500 ${isRecommended
                                    ? 'bg-[#06B6D4]/10 border-[#06B6D4]/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.3)]'
                                    : 'bg-[#050B14]/60 border-white/10 group-hover:bg-[#050B14]/80 group-hover:border-white/20'
                                }`}></div>

                            {/* Recommended Label */}
                            {isRecommended && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] tracking-widest z-20">
                                    РЕКОМЕНДУЕМ ПОПУЛЯРНОЕ
                                </div>
                            )}

                            <div className="relative z-10 p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${isRecommended
                                            ? 'bg-gradient-to-br from-[#06B6D4] to-blue-600 text-white shadow-lg'
                                            : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                                        }`}>
                                        {React.createElement(icon, { size: 28 })}
                                    </div>
                                    <h3 className={`text-2xl font-bold ${isRecommended ? 'text-white' : 'text-white/80'}`}>{plan.name}</h3>
                                </div>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-white">{plan.price.toLocaleString()} ₽</span>
                                        <span className="text-white/40 font-medium">/ мес</span>
                                    </div>
                                    <p className="text-sm text-white/30 mt-2">При оплате за год скидка 20%</p>
                                </div>

                                {/* Divider */}
                                <div className={`h-px w-full mb-8 ${isRecommended ? 'bg-[#06B6D4]/30' : 'bg-white/10'}`}></div>

                                {/* Features */}
                                <ul className="space-y-5 mb-10 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white/70 group/item">
                                            <div className={`mt-0.5 rounded-full p-1 transition-colors ${isRecommended
                                                    ? 'bg-[#06B6D4]/20 text-[#06B6D4] group-hover/item:bg-[#06B6D4] group-hover/item:text-white'
                                                    : 'bg-white/10 text-white/40 group-hover/item:bg-white/20 group-hover/item:text-white'
                                                }`}>
                                                <Check size={10} strokeWidth={4} />
                                            </div>
                                            <span className="text-sm font-medium leading-relaxed group-hover/item:text-white transition-colors">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button
                                    onClick={() => handleBuyClick(plan)}
                                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${isRecommended
                                            ? 'bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95'
                                            : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-slate-900 hover:border-transparent active:scale-95'
                                        }`}
                                >
                                    Выбрать тариф
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                selectedPlan={selectedPlanForBuy}
                onPaymentComplete={handlePaymentComplete}
            />
        </div>
    );
};

export default CabinetTariff;
