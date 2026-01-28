import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, CreditCard, Building2, FileText, Shield, Sparkles } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

// Plan data (would come from API/context in production)
const plans = {
    'стартовый': { name: 'Стартовый', price: 15000, features: ['До 3 договоров', '2 консультации', 'Шаблоны документов', 'Email поддержка'] },
    'бизнес_оптимум': { name: 'Бизнес Оптимум', price: 45000, features: ['До 10 договоров', '5 консультаций', 'Приоритетная поддержка', 'Судебное представительство'] },
    'индивидуальный_тариф': { name: 'Индивидуальный тариф', price: 45000, features: ['Настраиваемый объем', 'Гибкие условия', 'Личный менеджер', 'Приоритетная обработка'] },
    'корпоративный': { name: 'Корпоративный', price: 120000, features: ['Безлимитные договоры', 'Безлимитные консультации', 'Выделенный менеджер', 'Полное сопровождение в суде'] },
};

const industries = [
    { value: 'it', label: 'IT и Технологии' },
    { value: 'retail', label: 'Розничная торговля' },
    { value: 'construction', label: 'Строительство' },
    { value: 'manufacturing', label: 'Производство' },
    { value: 'services', label: 'Услуги' },
    { value: 'finance', label: 'Финансы' },
    { value: 'healthcare', label: 'Медицина' },
    { value: 'other', label: 'Другое' },
];

// Stepper Component
const Stepper = ({ currentStep }) => {
    const steps = [
        { num: 1, label: 'Тариф' },
        { num: 2, label: 'Детали' },
        { num: 3, label: 'Оплата' },
    ];

    return (
        <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => (
                <React.Fragment key={step.num}>
                    <div className="flex flex-col items-center">
                        <motion.div
                            animate={{
                                backgroundColor: currentStep >= step.num ? '#2563eb' : '#e2e8f0',
                                scale: currentStep === step.num ? 1.1 : 1,
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= step.num ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            {currentStep > step.num ? <Check size={20} /> : step.num}
                        </motion.div>
                        <span className={`text-xs mt-2 font-medium ${currentStep >= step.num ? 'text-blue-600' : 'text-slate-400'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-20 h-0.5 mx-2 transition-colors duration-300 ${currentStep > step.num ? 'bg-depa-cta' : 'bg-slate-200'
                            }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

// Step 1: Tariff Confirmation
const Step1 = ({ plan, termsAccepted, setTermsAccepted, onNext }) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
    >
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Вы выбрали тариф: <span className="text-blue-600">{plan.name}</span></h2>
            <p className="text-slate-500">Проверьте детали и подтвердите выбор</p>
        </div>

        {/* Plan Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Sparkles size={18} />
                        <span className="text-sm font-semibold uppercase tracking-wider">Выбранный тариф</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{plan.name}</h3>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-blue-700">{plan.price.toLocaleString('ru-RU')} ₽</p>
                    <p className="text-sm text-slate-500">в месяц</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        {feature}
                    </div>
                ))}
            </div>
        </div>

        {/* Terms */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
                <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Условия оферты</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Оформляя подписку, вы соглашаетесь с условиями публичной оферты, политикой конфиденциальности и правилами
                        автоматического продления подписки. Отмена возможна в любой момент в личном кабинете.
                    </p>
                </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                    Я принимаю <a href="#" className="text-blue-600 hover:underline">условия оферты</a> и
                    <a href="#" className="text-blue-600 hover:underline"> политику конфиденциальности</a>
                </span>
            </label>
        </div>

        {/* Action */}
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!termsAccepted}
            className="w-full py-4 bg-depa-cta hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
        >
            Далее
            <ChevronRight size={20} />
        </motion.button>
    </motion.div>
);

// Step 2: Client Details
const Step2 = ({ formData, setFormData, onNext, onBack }) => {
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isValid = formData.companyName && formData.industry;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Детали вашего бизнеса</h2>
                <p className="text-slate-500">Это поможет нашему юристу лучше подготовиться</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
                {/* Company Name / INN */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Название компании / ИНН <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="ООО «Ваша компания» или ИНН"
                            className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Industry */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Сфера деятельности <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Выберите сферу</option>
                        {industries.map((ind) => (
                            <option key={ind.value} value={ind.value}>{ind.label}</option>
                        ))}
                    </select>
                </div>

                {/* Current Legal Issues */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Текущие юридические вопросы <span className="text-slate-400">(опционально)</span>
                    </label>
                    <textarea
                        name="currentIssues"
                        value={formData.currentIssues}
                        onChange={handleChange}
                        placeholder="Например: Есть иск от поставщика, нужна помощь в налоговом споре..."
                        rows={3}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                </div>

                {/* Special Requests */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Особые пожелания к юристу <span className="text-slate-400">(опционально)</span>
                    </label>
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="Например: Предпочитаю общение через Telegram, нужен опыт в IT-сфере..."
                        rows={3}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <ChevronLeft size={20} />
                    Назад
                </button>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onNext}
                    disabled={!isValid}
                    className="flex-1 py-4 bg-depa-cta hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                    Далее
                    <ChevronRight size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
};

// Step 3: Payment
const Step3 = ({ plan, formData, onBack, onOpenPayment }) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
    >
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Итого к оплате</h2>
            <p className="text-slate-500">Проверьте данные и завершите оформление</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-200 mb-4">
                    <CreditCard size={20} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Ваш заказ</span>
                </div>

                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                        <p className="text-blue-200 text-sm">Ежемесячная подписка</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">
                            {typeof plan.price === 'number'
                                ? `${plan.price.toLocaleString('ru-RU')} ₽`
                                : plan.price}
                        </p>
                        <p className="text-blue-200 text-sm">в месяц</p>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                        <FileText size={16} />
                        <span>Компания: <span className="text-white font-medium">{formData.companyName}</span></span>
                    </div>
                </div>
            </div>
        </div>

        {/* Info Note */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={20} className="text-green-600" />
            </div>
            <div>
                <h4 className="font-semibold text-green-800 mb-1">Данные сохранены</h4>
                <p className="text-sm text-green-700">
                    Ваш персональный юрист свяжется с вами сразу после оплаты для обсуждения деталей сотрудничества.
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onOpenPayment}
                className="w-full py-4 bg-depa-cta hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
                <CreditCard size={20} />
                {typeof plan.price === 'number'
                    ? `Оплатить ${plan.price.toLocaleString('ru-RU')} ₽`
                    : 'Запросить расчет'}
            </motion.button>

            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={onBack}
                    className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                >
                    ← Назад
                </button>
                <span className="text-slate-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Выставить счет для юр. лица →
                </button>
            </div>
        </div>
    </motion.div>
);

// Main CheckoutPage Component
const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        currentIssues: '',
        specialRequests: '',
    });

    // Get plan from location state or default
    const intentState = location.state;
    const isOutsourcing = intentState?.serviceId === 'outsourcing';

    // For outsourcing, we use a placeholder plan if not provided
    const planKey = intentState?.planId?.toLowerCase()?.replace(/\s+/g, '_') || 'бизнес_оптимум';
    const plan = plans[planKey] || plans['бизнес_оптимум'];

    // Update plan price if passed from intent
    const actualPlan = {
        ...plan,
        price: isOutsourcing ? (intentState.basePrice || '25 000') : (intentState?.planPrice || plan.price),
        name: isOutsourcing ? (intentState.serviceName || 'Аутсорсинг') : (intentState?.planName || plan.name),
        features: isOutsourcing ? ['Персональный расчет', 'Команда юристов', 'Гарантия результата'] : plan.features
    };

    // Keep state available for steps (don't clear immediately if needed, or handle clearing carefully)
    // Removed the automatic clearing effect to ensure steps have access to state

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const pageTitle = isOutsourcing ? "Расчет стоимости аутсорсинга" : "Оформление подписки";
    const pageSubtitle = isOutsourcing ? "Заполните данные для индивидуального КП" : "Несколько шагов до начала работы";

    return (
        <div className="max-w-2xl mx-auto py-8">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{pageTitle}</h1>
                <p className="text-slate-500">{pageSubtitle}</p>
            </div>

            {/* Stepper */}
            <Stepper currentStep={currentStep} />

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <Step1
                        key="step1"
                        plan={actualPlan}
                        termsAccepted={termsAccepted}
                        setTermsAccepted={setTermsAccepted}
                        onNext={handleNext}
                    />
                )}
                {currentStep === 2 && (
                    <Step2
                        key="step2"
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <Step3
                        key="step3"
                        plan={actualPlan}
                        formData={formData}
                        onBack={handleBack}
                        onOpenPayment={() => setIsPaymentModalOpen(true)}
                    />
                )}
            </AnimatePresence>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                planName={actualPlan.name}
                amount={actualPlan.price.toLocaleString('ru-RU')}
            />
        </div>
    );
};

export default CheckoutPage;
