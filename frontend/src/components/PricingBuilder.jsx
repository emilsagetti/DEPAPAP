import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { FileText, Gavel, Building2, ShieldCheck, Check, Sparkles, LayoutGrid } from 'lucide-react';
import PricingSlider from './ui/PricingSlider';
import AnimatedPrice from './ui/AnimatedPrice';
import AnimatedToggle from './ui/AnimatedToggle';

// Polished Mode Toggle with Sliding Pill Animation
const ModeToggle = React.memo(({ activeMode, setActiveMode }) => {
    const modes = [
        { id: 'subscription', label: 'Абонентское обслуживание' },
        { id: 'onetime', label: 'Разовые услуги' }
    ];

    return (
        <div className="flex bg-white/[0.03] p-1.5 rounded-xl mb-10 max-w-md mx-auto relative border border-white/10 backdrop-blur-md">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className="flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-colors duration-200 relative z-10"
                >
                    {activeMode === mode.id && (
                        <motion.div
                            layoutId="pricing-mode-pill"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]"
                            style={{ zIndex: -1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${activeMode === mode.id
                        ? 'text-[#06B6D4]'
                        : 'text-slate-400 hover:text-white'
                        }`}>
                        {mode.label}
                    </span>
                </button>
            ))}
        </div>
    );
});

// Custom Slider Component
const CustomSlider = React.memo(({ label, value, onChange, min, max, unit = "", suffix = "" }) => (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-slate-400">{label}</label>
            <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10 tabular-nums shadow-inner">
                {value}{unit}{value >= max ? '+' : ''} {suffix}
            </span>
        </div>
        <PricingSlider
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={onChange}
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>{min}</span>
            <span>{max}+</span>
        </div>
    </div>
));

// Toggle Switch Component - Now using AnimatedToggle
const ToggleSwitch = React.memo(({ label, price, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 transition-colors">
        <div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-slate-500">+{price.toLocaleString()} ₽/мес</p>
        </div>
        <AnimatedToggle isOn={enabled} onToggle={() => onChange(!enabled)} />
    </div>
));



// Subscription Constructor Mode
const SubscriptionMode = ({ onSelectPlan }) => {
    const [contracts, setContracts] = useState(10);
    const [consultations, setConsultations] = useState(5);
    const [addons, setAddons] = useState({
        claims: false,
        onsite: false,
        hr: false
    });

    const addonPrices = { claims: 8000, onsite: 12000, hr: 10000 };

    const totalPrice = useMemo(() => {
        const base = 15000;
        const contractsCost = contracts * 1500;
        const consultationsCost = consultations * 800;
        const addonsCost = Object.entries(addons).reduce((sum, [key, enabled]) =>
            enabled ? sum + addonPrices[key] : sum, 0
        );
        return base + contractsCost + consultationsCost + addonsCost;
    }, [contracts, consultations, addons]);

    const includedFeatures = useMemo(() => {
        const features = [
            `До ${contracts} договоров в месяц`,
            `${consultations} консультаций`,
            'Личный менеджер'
        ];
        if (addons.claims) features.push('Претензионная работа');
        if (addons.onsite) features.push('Выезд юриста в офис');
        if (addons.hr) features.push('HR / Кадровый учет');
        return features;
    }, [contracts, consultations, addons]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-5 gap-8"
        >
            {/* Left: Controls - Dark Glass */}
            <div className="md:col-span-3 bg-white/[0.03] p-8 rounded-2xl border border-white/[0.08] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <h3 className="text-xl font-bold text-white mb-6">Настройте свой тариф</h3>

                <CustomSlider
                    label="Количество договоров в месяц"
                    value={contracts}
                    onChange={setContracts}
                    min={0}
                    max={50}
                    suffix="шт."
                />

                <CustomSlider
                    label="Устные консультации"
                    value={consultations}
                    onChange={setConsultations}
                    min={0}
                    max={20}
                    suffix="в месяц"
                />

                <div className="mt-8">
                    <h4 className="text-sm font-semibold text-slate-500 mb-4 px-4 uppercase tracking-wider text-[10px]">Дополнительные опции</h4>
                    <div className="bg-white/[0.02] rounded-xl px-4 border border-white/5">
                        <ToggleSwitch
                            label="Претензионная работа"
                            price={addonPrices.claims}
                            enabled={addons.claims}
                            onChange={(v) => setAddons({ ...addons, claims: v })}
                        />
                        <ToggleSwitch
                            label="Выезд юриста в офис"
                            price={addonPrices.onsite}
                            enabled={addons.onsite}
                            onChange={(v) => setAddons({ ...addons, onsite: v })}
                        />
                        <ToggleSwitch
                            label="HR / Кадровый учет"
                            price={addonPrices.hr}
                            enabled={addons.hr}
                            onChange={(v) => setAddons({ ...addons, hr: v })}
                        />
                    </div>
                </div>
            </div>



            {/* Right: Summary Card - Dark Glass Highlight */}
            <div className="md:col-span-2">
                <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 rounded-2xl border border-white/[0.1] shadow-2xl sticky top-28 backdrop-blur-2xl relative overflow-hidden">
                    {/* Glow element */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#06B6D4]/20 rounded-full blur-[50px]"></div>

                    <div className="flex items-center gap-2 text-[#06B6D4] mb-4 relative z-10">
                        <Sparkles size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ваш тариф</span>
                    </div>

                    <div className="text-5xl font-bold text-white mb-6 tabular-nums relative h-16 flex items-center tracking-tight z-10">
                        <AnimatedPrice value={totalPrice} />
                        <span className="text-xl font-normal text-slate-500 ml-2">₽/мес</span>
                    </div>

                    <ul className="space-y-3 mb-8 relative z-10">
                        {includedFeatures.map((feature, i) => (
                            <motion.li
                                key={feature}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 text-sm text-slate-300"
                            >
                                <div className="w-5 h-5 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
                                    <Check size={12} className="text-[#06B6D4]" />
                                </div>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectPlan && onSelectPlan('Индивидуальный тариф', totalPrice)}
                        className="group relative w-full py-4 bg-[#023A55] text-white font-bold rounded-xl overflow-hidden shadow-[0_0_30px_-10px_rgba(2,58,85,0.6)] border border-white/10 hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] z-10"
                    >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative">Подключить тариф</span>
                    </motion.button>
                    <p className="text-xs text-center text-slate-500 mt-4 relative z-10">Первый месяц — бесплатно</p>
                </div>
            </div>
        </motion.div>
    );
};

// One-Time Tasks Mode with Animated Category Filters
const OneTimeMode = ({ onSelectPlan }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'Все', icon: LayoutGrid },
        { id: 'docs', label: 'Документы', icon: FileText },
        { id: 'court', label: 'Суды', icon: Gavel },
        { id: 'reg', label: 'Регистрация', icon: Building2 },
        { id: 'audit', label: 'Проверки', icon: ShieldCheck }
    ];

    const allTasks = {
        docs: [
            { title: 'Составление оферты', price: 5000, category: 'docs' },
            { title: 'Договор аренды', price: 4000, category: 'docs' },
            { title: 'NDA соглашение', price: 3000, category: 'docs' },
            { title: 'Политика конфиденциальности', price: 6000, category: 'docs' }
        ],
        court: [
            { title: 'Исковое заявление', price: 15000, category: 'court' },
            { title: 'Претензия', price: 7000, category: 'court' },
            { title: 'Апелляционная жалоба', price: 20000, category: 'court' }
        ],
        reg: [
            { title: 'Регистрация ООО', price: 12000, category: 'reg' },
            { title: 'Регистрация ИП', price: 5000, category: 'reg' },
            { title: 'Смена директора', price: 8000, category: 'reg' }
        ],
        audit: [
            { title: 'Legal Due Diligence', price: 50000, category: 'audit' },
            { title: 'Проверка контрагента', price: 3000, category: 'audit' },
            { title: 'Аудит договоров', price: 25000, category: 'audit' }
        ]
    };

    const displayedTasks = useMemo(() => {
        if (activeCategory === 'all') {
            return Object.values(allTasks).flat();
        }
        return allTasks[activeCategory] || [];
    }, [activeCategory]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Animated Category Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 bg-white/[0.03] p-1.5 rounded-xl w-fit mx-auto border border-white/5 backdrop-blur-md">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        {/* Sliding Pill for Filters */}
                        {activeCategory === cat.id && (
                            <motion.div
                                layoutId="pricing-filter-pill"
                                className="absolute inset-0 bg-white/10 border border-white/5 rounded-lg shadow-sm"
                                style={{ zIndex: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <cat.icon size={16} className={`relative z-10 transition-colors ${activeCategory === cat.id ? 'text-[#06B6D4]' : 'text-slate-400'
                            }`} />
                        <span className={`relative z-10 transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-slate-400'
                            }`}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Task Cards Grid - Dark Glass */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {displayedTasks.map((task, i) => (
                        <motion.div
                            key={task.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="bg-white/[0.03] p-6 rounded-2xl border border-white/[0.08] hover:border-[#06B6D4]/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-10px_rgba(6,182,212,0.3)] transition-all group backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                            <p className="text-white font-semibold mb-2">{task.title}</p>
                            <p className="text-2xl font-bold text-white mb-6 tabular-nums">{task.price.toLocaleString()} ₽</p>
                            <button
                                onClick={() => onSelectPlan && onSelectPlan(task.title, task.price)}
                                className="w-full py-2.5 text-sm font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors group-hover:border-[#06B6D4]/50 group-hover:text-[#06B6D4]"
                            >
                                Заказать
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

// Main Component
const PricingBuilder = ({ onSelectPlan, initialMode = 'subscription' }) => {
    const [activeMode, setActiveMode] = useState(initialMode);

    useEffect(() => {
        if (initialMode) {
            setActiveMode(initialMode);
        }
    }, [initialMode]);

    return (
        <div className="py-20 bg-transparent">
            {/* Standard aligned container */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Прозрачное ценообразование
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto font-light">
                        Соберите свой тариф или выберите разовую услугу. Никаких скрытых платежей.
                    </p>
                </div>

                <ModeToggle activeMode={activeMode} setActiveMode={setActiveMode} />

                <AnimatePresence mode="wait">
                    {activeMode === 'subscription' ? (
                        <SubscriptionMode key="subscription" onSelectPlan={onSelectPlan} />
                    ) : (
                        <OneTimeMode key="onetime" onSelectPlan={onSelectPlan} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PricingBuilder;
