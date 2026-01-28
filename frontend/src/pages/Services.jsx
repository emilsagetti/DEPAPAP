import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const Services = () => {
    const [filter, setFilter] = useState('Все');
    const [search, setSearch] = useState('');

    const categories = [
        { id: 'Все', label: 'Все услуги' },
        { id: 'Документы', label: 'Документы и договоры' },
        { id: 'Суды', label: 'Суды и споры' },
        { id: 'Регистрация', label: 'Регистрация бизнеса' },
        { id: 'Проверки', label: 'Проверки и аудит' },
    ];

    const services = [
        { id: 1, title: 'Регистрация ИП', price: '4 000 ₽', cat: 'Регистрация', desc: 'Под ключ с открытием счета.' },
        { id: 2, title: 'Регистрация ООО', price: '12 000 ₽', cat: 'Регистрация', desc: 'С уставом и печатью.' },
        { id: 3, title: 'Составление оферты', price: '5 000 ₽', cat: 'Документы', desc: 'Для сайта или маркетплейса.' },
        { id: 4, title: 'Договор оказания услуг', price: '4 000 ₽', cat: 'Документы', desc: 'Защищает исполнителя.' },
        { id: 5, title: 'NDA соглашение', price: '3 000 ₽', cat: 'Документы', desc: 'Защита коммерческой тайны.' },
        { id: 6, title: 'Исковое заявление', price: '15 000 ₽', cat: 'Суды', desc: 'Подготовка позиции в суд.' },
        { id: 7, title: 'Представительство в суде', price: 'от 20 000 ₽', cat: 'Суды', desc: 'Участие юриста в заседании.' },
        { id: 8, title: 'Проверка контрагента', price: '3 000 ₽', cat: 'Проверки', desc: 'Полный отчет о рисках.' },
        { id: 9, title: 'Ликвидация ИП', price: '5 000 ₽', cat: 'Регистрация', desc: 'Закрытие без долгов.' },
    ];

    const filteredServices = services.filter(s =>
        (filter === 'Все' || s.cat === filter) &&
        s.title.toLowerCase().includes(search.toLowerCase())
    );

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
                            Каталог услуг
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto mb-8"
                        >
                            Фиксированные цены. Понятный результат. Если нужной услуги нет в списке — мы составим индивидуальное предложение.
                        </motion.p>

                        {/* SEARCH */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-md mx-auto relative mb-10"
                        >
                            <input
                                type="text"
                                placeholder="Найти услугу..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#06B6D4] outline-none transition-colors backdrop-blur-md text-white placeholder-white/30"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </motion.div>

                        {/* FILTERS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${filter === cat.id
                                        ? 'bg-[#06B6D4] text-[#050B14] border-[#06B6D4] shadow-lg shadow-cyan-500/20'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* GRID - STABLE ANIMATION */}
                    {/* Parent is a standard div (No 'layout' prop) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((service) => (
                                <motion.div
                                    key={service.id}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                                    className="group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#06B6D4]/50 hover:bg-white/[0.06] transition-colors flex flex-col justify-between h-full relative z-10"
                                >
                                    <div>
                                        <div className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-2">{service.cat}</div>
                                        <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                                        <p className="text-slate-400 mb-6 text-sm">{service.desc}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                        <div className="text-xl font-bold text-white">{service.price}</div>
                                        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#06B6D4] group-hover:text-[#050B14] transition-colors">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* CUSTOM REQUEST BLOCK (CTA) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl p-[1px] bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]"
                    >
                        <div className="bg-[#050B14] rounded-[23px] p-10 md:p-16 text-center relative overflow-hidden">
                            {/* Subtle pattern */}
                            <div className="absolute inset-0 opacity-[0.03]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 mx-auto bg-[#06B6D4]/20 rounded-full flex items-center justify-center text-[#06B6D4] mb-6 backdrop-blur-sm">
                                    <MessageCircle size={32} />
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-white">Не нашли нужную услугу?</h2>
                                <p className="text-slate-400 max-w-xl mx-auto mb-8">
                                    Опишите вашу задачу. Мы работаем с нестандартными кейсами: от сопровождения IT-сделок до сложных корпоративных споров.
                                </p>
                                <motion.button
                                    whileHover={{ y: -2, boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-[#023A55] to-[#0891B2] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#023A55]/40"
                                >
                                    Написать юристу
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Services;
