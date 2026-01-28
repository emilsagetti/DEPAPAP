import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from '../../components/PaymentModal';
import {
    Building2, User, CheckCircle2, ArrowRight, Code,
    ShoppingBag, Hammer, Briefcase, Coffee, HelpCircle
} from 'lucide-react';

const NewCompanyRegistration = () => {
    const location = useLocation();
    // Set Premium Pricing Defaults
    const type = location.state?.type || 'IP';
    const price = type === 'IP' ? 15000 : 25000;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        activity: '',
        taxSystem: ''
    });
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const navigate = useNavigate();

    const activities = [
        { id: 'it', label: 'IT и Разработка', icon: <Code size={20} /> },
        { id: 'retail', label: 'Торговля / Маркетплейсы', icon: <ShoppingBag size={20} /> },
        { id: 'construct', label: 'Стройка и Ремонт', icon: <Hammer size={20} /> },
        { id: 'b2b', label: 'Услуги B2B / Консалтинг', icon: <Briefcase size={20} /> },
        { id: 'food', label: 'Общепит / HoReCa', icon: <Coffee size={20} /> },
        { id: 'other', label: 'Другое', icon: <HelpCircle size={20} /> },
    ];

    const taxOptions = [
        'УСН Доходы (6%)',
        'УСН Доходы-Расходы (15%)',
        'АУСН (Автоматическая)',
        'НПД (Самозанятость)',
        'Патент (ПСН)',
        'ОСН (с НДС)',
        'Нужна консультация'
    ];

    const handleNext = () => {
        if (step === 1 && !formData.activity) return; // Basic validation
        setStep(2);
    };

    return (
        <div className="max-w-3xl mx-auto pt-10 px-4 pb-20 relative">

            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Регистрация {type === 'OOO' ? 'ООО' : 'ИП'}
                </h1>
                <p className="text-[#9EACB7]">
                    Шаг {step} из 2. {step === 1 ? 'Параметры бизнеса' : 'Проверка и оплата'}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 bg-[#0F2837]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden"
            >
                <AnimatePresence mode="wait">

                    {/* --- STEP 1: DATA COLLECTION --- */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* Name Input (OOO Only) */}
                            {type === 'OOO' && (
                                <div>
                                    <label className="block text-white text-sm font-medium mb-3 ml-1">Название компании</label>
                                    <input
                                        type="text"
                                        placeholder="Например: ООО Вектор"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:border-[#06B6D4] focus:bg-[#06B6D4]/5 outline-none transition-all text-lg"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            )}

                            {/* Activity Grid */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-3 ml-1">Сфера деятельности</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {activities.map((act) => (
                                        <button
                                            key={act.id}
                                            onClick={() => setFormData({ ...formData, activity: act.label })}
                                            className={`
                                        p-4 rounded-xl border flex flex-col items-center justify-center gap-3 text-center transition-all duration-200 group
                                        ${formData.activity === act.label
                                                    ? 'bg-[#06B6D4] border-[#06B6D4] text-[#0F2837] shadow-lg shadow-cyan-500/20'
                                                    : 'bg-white/5 border-white/10 text-[#9EACB7] hover:bg-white/10 hover:border-white/20'
                                                }
                                    `}
                                        >
                                            <div className={`p-2 rounded-lg ${formData.activity === act.label ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                {act.icon}
                                            </div>
                                            <span className="text-sm font-medium leading-tight">{act.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tax System Grid */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-3 ml-1">Система налогообложения</label>
                                <div className="flex flex-wrap gap-2">
                                    {taxOptions.map((tax) => (
                                        <button
                                            key={tax}
                                            onClick={() => setFormData({ ...formData, taxSystem: tax })}
                                            className={`
                                        px-5 py-3 rounded-full text-sm font-medium border transition-all
                                        ${formData.taxSystem === tax
                                                    ? 'bg-[#06B6D4] border-[#06B6D4] text-[#0F2837] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                                    : 'bg-white/5 border-white/10 text-[#9EACB7] hover:bg-white/10 hover:text-white'
                                                }
                                    `}
                                        >
                                            {tax}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!formData.activity}
                                className="w-full mt-4 py-4 bg-gradient-to-r from-[#023A55] to-[#0F2837] border border-[#06B6D4]/30 text-white font-bold rounded-xl hover:border-[#06B6D4] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Продолжить оформление <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {/* --- STEP 2: SUMMARY & PAYMENT --- */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col items-center text-center pt-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                <CheckCircle2 size={40} />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">Всё готово к старту</h2>
                            <p className="text-[#9EACB7] mb-8">Мы проверили данные. Осталось оплатить услугу, и юрист приступит к работе.</p>

                            <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 text-left mb-8 space-y-4">
                                <div className="flex justify-between border-b border-white/10 pb-4">
                                    <span className="text-[#9EACB7]">Форма бизнеса</span>
                                    <span className="text-white font-medium">{type === 'OOO' ? 'ООО (Компания)' : 'ИП'}</span>
                                </div>
                                {formData.name && (
                                    <div className="flex justify-between border-b border-white/10 pb-4">
                                        <span className="text-[#9EACB7]">Название</span>
                                        <span className="text-white font-medium">{formData.name}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-b border-white/10 pb-4">
                                    <span className="text-[#9EACB7]">Деятельность</span>
                                    <span className="text-white font-medium">{formData.activity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#9EACB7]">Налоги</span>
                                    <span className="text-white font-medium">{formData.taxSystem || 'Не выбрано'}</span>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-8 px-2">
                                <div className="text-left">
                                    <div className="text-sm text-[#9EACB7]">Стоимость под ключ</div>
                                    <div className="text-3xl font-bold text-white">{price.toLocaleString()} ₽</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                        Гарантия возврата
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsPaymentModalOpen(true)}
                                className="w-full py-4 bg-[#06B6D4] text-[#0F2837] font-bold rounded-xl hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-900/30 text-lg"
                            >
                                Оплатить картой
                            </button>

                            <button onClick={() => setStep(1)} className="mt-4 text-[#9EACB7] hover:text-white text-sm transition-colors">
                                Вернуться назад
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>

            {/* Payment Modal Integration */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={() => navigate('/dashboard')}
                planName={`Регистрация ${type === 'OOO' ? 'ООО' : 'ИП'}`}
                amount={price.toLocaleString() + " ₽"}
            />
        </div>
    );
};

export default NewCompanyRegistration;
