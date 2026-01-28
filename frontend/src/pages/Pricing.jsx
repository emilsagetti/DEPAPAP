import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingSlider from '../components/ui/PricingSlider';
import AnimatedPrice from '../components/ui/AnimatedPrice';
import AnimatedToggle from '../components/ui/AnimatedToggle';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

// Custom Slider Component (matching PricingBuilder style)
const CustomSlider = ({ label, value, onChange, min, max, suffix = "" }) => (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#9EACB7]">{label}</label>
            <span className="text-sm font-bold text-white bg-[#023A55]/20 px-3 py-1 rounded-full border border-[#023A55]/30 tabular-nums">
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
        <div className="flex justify-between text-xs text-[#9EACB7]/40 mt-1">
            <span>{min}</span>
            <span>{max}+</span>
        </div>
    </div>
);

// Toggle Switch Component (matching PricingBuilder style)
const ToggleSwitch = ({ label, price, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
        <div>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-[#9EACB7]">+{price.toLocaleString()} ₽/мес</p>
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

    // --- CALCULATION LOGIC (matching LandingPage) ---
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

            {/* AMBIENT GLOW ORBS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-15"></div>
                <div className="absolute top-[40%] left-[30%] w-[800px] h-[800px] bg-[#023A55] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
            </div>

            {/* DOT PATTERN OVERLAY */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            {/* NOISE TEXTURE */}
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            <Navbar />

            <div className="relative z-10">
                <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Тарифы
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto"
                        >
                            Дешевле, чем штатный юрист. Надежнее, чем фрилансер.
                        </motion.p>
                    </div>

                    {/* 1. FIXED PLANS GRID */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24 items-stretch">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    relative p-8 rounded-3xl border transition-all duration-300 backdrop-blur-md flex flex-col h-full
                                    ${plan.highlight
                                        ? 'bg-white/[0.06] border-[#06B6D4] shadow-[0_0_50px_rgba(6,182,212,0.15)] scale-105 z-10'
                                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                                    }
                                `}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-[#050B14] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                        Хит продаж
                                    </div>
                                )}

                                {/* Header Content */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                                    <div className="text-3xl font-bold mb-2 text-white flex items-baseline gap-1">
                                        {plan.price} <span className="text-sm font-normal text-slate-400">/ мес</span>
                                    </div>
                                    <p className="text-slate-400 text-sm border-b border-white/10 pb-6">{plan.desc}</p>
                                </div>

                                {/* Features List (Grows to push button down) */}
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 text-sm">
                                            <Check size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                                            <span className="text-slate-200 leading-snug">{f}</span>
                                        </li>
                                    ))}
                                    {plan.missing.map(m => (
                                        <li key={m} className="flex items-start gap-3 text-sm text-slate-500">
                                            <X size={18} className="shrink-0 mt-0.5" />
                                            <span className="leading-snug">{m}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button (Aligned to Bottom) */}
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        mt-auto w-full py-4 rounded-xl font-bold transition-all shadow-lg
                                        ${plan.highlight
                                            ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-[#050B14] hover:shadow-lg hover:shadow-cyan-500/30'
                                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        }
                                    `}
                                >
                                    Выбрать тариф
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* 2. FLEXIBLE CALCULATOR (MATCHING LANDINGPAGE STYLES) */}
                    {/* Wrapper for proper glow positioning - orb OUTSIDE container */}
                    <div className="relative">
                        {/* Background Glow Orb - positioned outside to not clip shadows */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#06B6D4]/8 rounded-full blur-[100px] pointer-events-none z-0" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid md:grid-cols-5 gap-8 relative z-10"
                        >
                            {/* Left: Controls - Dark Glass */}
                            <div className="md:col-span-3 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
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
                                    <h4 className="text-sm font-semibold text-[#9EACB7] mb-4">Дополнительные опции</h4>
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

                            {/* Right: Summary Card - Dark Glass Highlight */}
                            <div className="md:col-span-2 relative z-20">
                                <div className="bg-white/5 p-8 rounded-2xl border-2 border-[#023A55]/30 shadow-xl sticky top-28 backdrop-blur-md hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-shadow">
                                    <div className="flex items-center gap-2 text-[#023A55] mb-4">
                                        <Sparkles size={18} className="text-[#00A3FF]" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Ваш тариф</span>
                                    </div>

                                    <div className="text-4xl font-bold text-white mb-6 tabular-nums relative h-12 flex items-center">
                                        <AnimatedPrice value={totalPrice} />
                                        <span className="text-xl font-normal text-white/50 ml-2">₽/мес</span>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        <AnimatePresence mode="popLayout">
                                            {includedFeatures.map((feature, i) => (
                                                <motion.li
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-center gap-2 text-sm text-[#9EACB7]"
                                                >
                                                    <Check size={16} className="text-[#023A55] flex-shrink-0" />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </ul>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-[#023A55] to-[#06B6D4] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all ring-1 ring-[#06B6D4]/40"
                                    >
                                        Подключить тариф
                                    </motion.button>
                                    <p className="text-xs text-center text-white/30 mt-3">Первый месяц — бесплатно</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Pricing;
