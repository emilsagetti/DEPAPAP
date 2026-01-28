import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Scale, FileText, Users, ShieldCheck, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Glass noise texture (reused from InformationPage)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const OutsourcingPage = () => {
    const navigate = useNavigate();

    const handleCalculateClick = () => {
        navigate('/auth', {
            state: {
                intent: 'service_inquiry',
                serviceId: 'outsourcing',
                serviceName: 'Юридический аутсорсинг',
                basePrice: 'от 25 000 ₽'
            }
        });
    };

    const benefits = [
        { icon: <FileText />, title: "Договорная работа", desc: "Разработка и экспертиза любых контрактов" },
        { icon: <Users />, title: "Трудовые отношения", desc: "Кадровый учет и разрешение споров с сотрудниками" },
        { icon: <ShieldCheck />, title: "Защита бизнеса", desc: "Представление интересов в госорганах и судах" },
        { icon: <Scale />, title: "Консультации 24/7", desc: "Устные и письменные заключения по любым вопросам" },
    ];

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS */}
            {/* AMBIENT GLOW ORBS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
            </div>

            {/* DOT PATTERN OVERLAY */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            {/* NOISE TEXTURE */}
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow pt-32 pb-20 px-6">
                    <div className="max-w-6xl mx-auto space-y-16">

                        {/* 1. HERO / INTRO */}
                        <div className="text-center max-w-3xl mx-auto">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-6"
                            >
                                Юридический отдел <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    по цене одного сотрудника
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-[#9EACB7]"
                            >
                                Комплексное правовое сопровождение вашего бизнеса. Забудьте о больничных, отпусках и налогах на штатного юриста.
                            </motion.p>
                        </div>

                        {/* 2. COMPARISON: In-House vs Outsourcing */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* In-House (The "Bad" Option) */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <XCircle className="text-red-400" /> Штатный юрист
                                </h3>
                                <ul className="space-y-4 text-[#9EACB7]">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400/50"></div> Высокая зарплата + налоги (43%)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400/50"></div> Больничные и отпуска</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400/50"></div> Требует рабочее место и ПО</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400/50"></div> Ограниченная экспертиза (один человек)</li>
                                </ul>
                            </motion.div>

                            {/* Depa (The "Good" Option) */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative p-8 rounded-3xl bg-[#023A55]/40 border border-[#06B6D4]/30 backdrop-blur-xl shadow-2xl overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/20 rounded-full blur-[50px] pointer-events-none" />

                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="text-[#06B6D4]" /> Depa Outsourcing
                                </h3>
                                <ul className="space-y-4 text-white">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#06B6D4]" /> Фиксированная стоимость в месяц</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#06B6D4]" /> Целая команда экспертов</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#06B6D4]" /> Работаем 365 дней в году</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#06B6D4]" /> Ответственность по договору</li>
                                </ul>
                            </motion.div>
                        </div>

                        {/* 3. SERVICES GRID */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-white mb-8 text-center md:text-left"
                            >
                                Что входит в тариф?
                            </motion.h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {benefits.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-lg group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#023A55]/50 flex items-center justify-center text-[#06B6D4] mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-[#9EACB7]">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 4. CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center pt-8 border-t border-white/10"
                        >
                            <p className="text-[#9EACB7] mb-6 max-w-2xl mx-auto">
                                Идеально для малого и среднего бизнеса, которому нужна постоянная правовая поддержка без расширения штата.
                            </p>
                            <button
                                onClick={handleCalculateClick}
                                className="px-8 py-4 bg-[#023A55] text-white rounded-xl font-bold hover:bg-[#06B6D4] transition-all shadow-lg shadow-cyan-900/20 flex items-center gap-2 mx-auto group"
                            >
                                Рассчитать стоимость для моей компании <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                    </div>
                </main>

                <Footer />
            </div>

        </div>
    );
};

export default OutsourcingPage;
