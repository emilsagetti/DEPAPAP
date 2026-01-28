import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, Users, Trophy, Coins, Clock, Target } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#050B14] relative overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-6">

                {/* 1. HERO SECTION */}
                <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-sm font-medium mb-6 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(6,182,212,0.1)]">
                            О компании
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                            Юриспруденция <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-blue-400 to-purple-400 animate-gradient-x">
                                со скоростью IT
                            </span>
                        </h1>
                        <p className="text-xl text-[#9EACB7] max-w-2xl mx-auto leading-relaxed font-medium">
                            Мы объединили экспертизу лучших юристов и современные технологии, чтобы освободить бизнес от рутины и правовых рисков.
                        </p>
                    </motion.div>
                </div>

                {/* 2. STATS (Bento Grid - Premium Glass) */}
                <div className="max-w-6xl mx-auto mb-24 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <StatsCard
                            value="98%"
                            label="Выигранных дел"
                            sub="в судах всех инстанций"
                            icon={<Trophy size={24} />}
                            delay={0}
                        />
                        <StatsCard
                            value=">100 Млн ₽"
                            label="Сохранено клиентам"
                            sub="за 2024 год"
                            icon={<Coins size={24} />}
                            delay={0.1}
                        />
                        <StatsCard
                            value="500+"
                            label="Клиентов"
                            sub="доверяют нам бизнес"
                            icon={<Users size={24} />}
                            delay={0.2}
                        />
                        <StatsCard
                            value="24/7"
                            label="Поддержка"
                            sub="всегда на связи"
                            icon={<Clock size={24} />}
                            delay={0.3}
                        />
                    </div>
                </div>

                {/* 3. VALUES */}
                <div className="max-w-6xl mx-auto relative z-10 mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">Наши принципы</h2>
                        <p className="text-[#9EACB7] font-medium text-lg">Почему с нами проще, чем с классическими юристами</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <ValueCard
                            icon={<ShieldCheck size={32} />}
                            title="Прозрачность"
                            desc="Никаких скрытых часов и доплат. Мы фиксируем цену услуги до старта работ. Вы всегда знаете, за что платите."
                            delay={0.2}
                        />
                        <ValueCard
                            icon={<Zap size={32} />}
                            title="Скорость"
                            desc="Мы автоматизировали рутину. Подготовка документов занимает часы, а не дни. Мы ценим ваше время."
                            delay={0.3}
                        />
                        <ValueCard
                            icon={<HeartHandshake size={32} />}
                            title="Понятный язык"
                            desc="Мы не прячемся за сложными терминами. Объясняем риски и стратегии на языке бизнеса, просто и честно."
                            delay={0.4}
                        />
                    </div>
                </div>

                {/* 4. MISSION MANIFESTO (Premium Typography) */}
                <div className="max-w-5xl mx-auto mt-32 mb-32 relative z-10 px-4 text-center">

                    {/* Subtle Glow behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-[#06B6D4]/10 blur-[80px] pointer-events-none" />

                    <h2 className="relative z-10 text-3xl md:text-5xl font-bold text-white leading-tight font-sans tracking-tighter">
                        Мы верим, что правовая защита должна быть доступна каждому бизнесу в один клик
                    </h2>

                    <div className="relative z-10 mt-12 flex items-center justify-center gap-6 opacity-60">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        <div className="flex items-center gap-2 text-[#06B6D4] font-bold tracking-[0.2em] text-xs uppercase">
                            <Target size={14} /> Миссия Depa
                        </div>
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

// --- Sub-components (Updated to match Contacts.jsx Glassmorphism) ---

const StatsCard = ({ value, label, sub, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay, duration: 0.4 }}
        className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.06] hover:border-[#06B6D4]/30 transition-all duration-500 group flex flex-col justify-between h-full shadow-xl relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] transition-all duration-300 relative z-10">
            {icon}
        </div>

        <div className="relative z-10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight whitespace-nowrap group-hover:text-[#06B6D4] transition-colors">
                {value}
            </div>
            <div className="text-white font-bold text-lg leading-tight mb-1">{label}</div>
            <div className="text-[#9EACB7] text-xs uppercase tracking-wider font-semibold opacity-70">{sub}</div>
        </div>
    </motion.div>
);

const ValueCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.06] hover:border-[#06B6D4]/30 transition-all duration-500 group shadow-xl hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)] relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="w-16 h-16 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] transition-all duration-300 relative z-10">
            {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-4 tracking-tight relative z-10">{title}</h3>
        <p className="text-[#9EACB7] leading-relaxed font-medium relative z-10">
            {desc}
        </p>
    </motion.div>
);

export default AboutPage;
