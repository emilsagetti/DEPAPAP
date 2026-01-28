import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Sparkles, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingSlider from '../components/ui/PricingSlider';
import AnimatedPrice from '../components/ui/AnimatedPrice';
import AnimatedToggle from '../components/ui/AnimatedToggle';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

// Custom Slider Component (matching Premium Style)
const CustomSlider = ({ label, value, onChange, min, max, suffix = "" }) => (
    <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">{label}</label>
            <span className="text-sm font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-4 py-1.5 rounded-full border border-[#06B6D4]/20 tabular-nums shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                {value}{value >= max ? '+' : ''} {suffix}
            </span>
        </div>
        <PricingSlider
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={onChange}
        />
        <div className="flex justify-between text-xs text-[#9EACB7]/40 mt-2 font-medium">
            <span>{min}</span>
            <span>{max}+</span>
        </div>
    </div>
);

// Toggle Switch Component (Premium Style)
const ToggleSwitch = ({ label, price, enabled, onChange }) => (
    <div
        onClick={() => onChange(!enabled)}
        className={`
            flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group mb-3
            ${enabled
                ? 'bg-[#06B6D4]/5 border-[#06B6D4]/30'
                : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
            }
        `}
    >
        <div className="flex flex-col">
            <p className={`text-sm font-bold transition-colors ${enabled ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {label}
            </p>
            <p className="text-xs text-[#06B6D4] font-medium mt-1">+{price.toLocaleString()} ₽/мес</p>
        </div>
        <AnimatedToggle isOn={enabled} onToggle={() => onChange(!enabled)} />
    </div>
);

const Pricing = () => {
    // --- STATE FOR CALCULATOR ---
    const [contracts, setContracts] = useState(10);
    const [consultations, setConsultations] = useState(5);
    const [addons, setAddons] = useState({
        claims: false,
        onsite: false,
        hr: false
    });

    const addonPrices = { claims: 8000, onsite: 12000, hr: 10000 };

    // --- CALCULATION LOGIC ---
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

    // --- STATIC PLANS DATA ---
    const plans = [
        {
            name: 'Старт',
            price: '15 000 ₽',
            desc: 'Для микробизнеса и ИП',
            features: ['3 договора в месяц', '2 устные консультации', 'Проверка 1 контрагента', 'Чат с юристом (9:00-18:00)'],
            missing: ['Выезд в офис', 'Претензионная работа'],
            highlight: false
        },
        {
            name: 'Бизнес',
            price: '34 000 ₽',
            desc: 'Оптимально для активной работы',
            features: ['10 договоров в месяц', '5 консультаций', 'Проверка 5 контрагентов', 'Личный менеджер', 'Претензионная работа'],
            missing: ['Выезд в офис'],
            highlight: true
        },
        {
            name: 'Премиум',
            price: '60 000 ₽',
            desc: 'Ваш полноценный юротдел',
            features: ['Безлимит на договоры', 'Приоритетная поддержка 24/7', 'Участие в переговорах', 'Выезд юриста в офис', 'HR-документы'],
            missing: [],
            highlight: false
        }
    ];

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            {/* GRID PATTERN OVERLAY */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <div className="relative z-10">
                <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
                        >
                            Тарифы <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-400">DEPA</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[#9EACB7] text-lg font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            Дешевле, чем штатный юрист. Надежнее, чем фрилансер. Выберите готовое решение или соберите свой тариф.
                        </motion.p>
                    </div>

                    {/* 1. FIXED PLANS GRID */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32 items-stretch">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    group relative p-8 rounded-[32px] border transition-all duration-300 backdrop-blur-md flex flex-col h-full
                                    ${plan.highlight
                                        ? 'bg-gradient-to-b from-[#06B6D4]/5 to-[#050B14] border-[#06B6D4]/50 shadow-[0_0_50px_-10px_rgba(6,182,212,0.2)] scale-105 z-10'
                                        : 'bg-white/[0.03] border-white/10 hover:border-[#06B6D4]/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.1)]'
                                    }
                                `}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#06B6D4] text-[#050B14] text-xs font-black uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-1">
                                        <Sparkles size={12} fill="currentColor" /> Хит продаж
                                    </div>
                                )}

                                {/* Header Content */}
                                <div className="mb-8">
                                    <h3 className={`text-xl font-bold mb-2 tracking-tight ${plan.highlight ? 'text-white' : 'text-slate-200'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="text-4xl font-black mb-3 text-white flex items-baseline gap-1 tracking-tighter">
                                        {plan.price} <span className="text-sm font-bold text-slate-500 tracking-normal">/ мес</span>
                                    </div>
                                    <p className="text-[#9EACB7] text-sm font-medium border-b border-white/5 pb-6 leading-relaxed">
                                        {plan.desc}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map(f => (
                                        <div key={f} className="flex items-start gap-3 text-sm">
                                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-[#06B6D4]/20 text-[#06B6D4]' : 'bg-white/10 text-slate-300'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-200 font-medium leading-snug">{f}</span>
                                        </div>
                                    ))}
                                    {plan.missing.map(m => (
                                        <div key={m} className="flex items-start gap-3 text-sm opacity-50">
                                            <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/5 text-slate-500">
                                                <X size={12} />
                                            </div>
                                            <span className="text-slate-500 font-medium leading-snug">{m}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        mt-auto w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2
                                        ${plan.highlight
                                            ? 'bg-gradient-to-r from-[#023A55] to-[#06B6D4] text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-[#06B6D4]/30'
                                            : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/10'
                                        }
                                    `}
                                >
                                    Выбрать тариф <ChevronRight size={16} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* 2. FLEXIBLE CALCULATOR */}
                    <div className="relative">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Конструктор тарифа</h2>
                            <p className="text-[#9EACB7] font-medium text-lg">Соберите индивидуальное решение под задачи вашего бизнеса</p>
                        </div>

                        <div className="grid md:grid-cols-12 gap-8 relative z-10 items-start">
                            {/* Left: Controls */}
                            <div className="md:col-span-7 bg-white/[0.03] p-8 md:p-10 rounded-[32px] border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none" />

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

                                <div className="mt-12">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-6 flex items-center gap-2">
                                        <Sparkles size={14} className="text-[#06B6D4]" /> Дополнительные опции
                                    </h4>
                                    <div className="grid gap-4">
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

                            {/* Right: Sticky Summary */}
                            <div className="md:col-span-5 relative md:sticky md:top-32">
                                <div className="bg-[#050B14]/80 p-8 rounded-[32px] border border-[#06B6D4]/30 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(6,182,212,0.15)] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-transparent pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-[#06B6D4]/20 text-[#06B6D4] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#06B6D4]/30">
                                                Ваш тариф
                                            </span>
                                        </div>

                                        <div className="text-5xl font-black text-white mb-8 tabular-nums tracking-tighter mt-4">
                                            <AnimatedPrice value={totalPrice} />
                                            <span className="text-xl font-bold text-slate-500 ml-2">₽/мес</span>
                                        </div>

                                        <div className="space-y-4 mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Входит в тариф:</h5>
                                            <AnimatePresence mode="popLayout">
                                                {includedFeatures.map((feature, i) => (
                                                    <motion.div
                                                        key={feature}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="flex items-start gap-3 text-sm text-slate-200 font-medium"
                                                    >
                                                        <Check size={16} className="text-[#06B6D4] shrink-0 mt-0.5" />
                                                        <span className="leading-snug">{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-5 bg-gradient-to-r from-[#023A55] to-[#06B6D4] text-white font-bold rounded-2xl shadow-lg border-t border-white/20 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Подключить тариф <ChevronRight size={18} />
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </motion.button>
                                        <p className="text-xs text-center text-slate-500 mt-4 font-medium">Первый месяц обслуживания — <span className="text-[#06B6D4]">бесплатно</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Pricing;
