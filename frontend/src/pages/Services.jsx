import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const Services = () => {
    const [filter, setFilter] = useState('Все');
    const [search, setSearch] = useState('');

    const categories = [
        { id: 'Все', label: 'Все услуги' },
        { id: 'Документы', label: 'Документы', icon: FileText },
        { id: 'Суды', label: 'Суды и споры', icon: ShieldCheck },
        { id: 'Регистрация', label: 'Регистрация', icon: CheckCircle2 },
        { id: 'Проверки', label: 'Проверки и аудит', icon: Search },
    ];

    const services = [
        { id: 1, title: 'Регистрация ИП', price: '4 000 ₽', cat: 'Регистрация', desc: 'Под ключ с открытием счета. Подготовим документы, подадим в ФНС, откроем расчетный счет.' },
        { id: 2, title: 'Регистрация ООО', price: '12 000 ₽', cat: 'Регистрация', desc: 'С уставом и печатью. Полный комплект документов, помощь с выбором адреса и системы налогообложения.' },
        { id: 3, title: 'Составление оферты', price: '5 000 ₽', cat: 'Документы', desc: 'Для веб-сайта или маркетплейса. Защитим от штрафов Роспотребнадзора и потребительского экстремизма.' },
        { id: 4, title: 'Договор оказания услуг', price: '4 000 ₽', cat: 'Документы', desc: 'Максимально детальный договор, защищающий исполнителя. Пропишем порядок сдачи-приемки и оплаты.' },
        { id: 5, title: 'NDA соглашение', price: '3 000 ₽', cat: 'Документы', desc: 'Соглашение о неразглашении конфиденциальной информации. Защитите свои коммерческие тайны.' },
        { id: 6, title: 'Исковое заявление', price: '15 000 ₽', cat: 'Суды', desc: 'Подготовка правовой позиции и написание иска в арбитражный суд или суд общей юрисдикции.' },
        { id: 7, title: 'Представительство в суде', price: 'от 20 000 ₽', cat: 'Суды', desc: 'Участие профессионального юриста в судебных заседаниях. Защита интересов вашего бизнеса.' },
        { id: 8, title: 'Проверка контрагента', price: '3 000 ₽', cat: 'Проверки', desc: 'Полный отчет о рисках: суды, долги, банкротство, массовость директора и адреса.' },
        { id: 9, title: 'Ликвидация ИП', price: '5 000 ₽', cat: 'Регистрация', desc: 'Закрытие ИП без долгов и проверок. Подготовим отчетность и подадим заявление.' },
    ];

    const filteredServices = services.filter(s =>
        (filter === 'Все' || s.cat === filter) &&
        s.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-10"></div>
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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                        >
                            <Sparkles size={14} className="text-[#06B6D4]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Каталог услуг</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
                        >
                            Решения для <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-400">бизнеса</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[#9EACB7] text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Фиксированные цены. Понятный результат. Если нужной услуги нет в списке — мы составим индивидуальное предложение.
                        </motion.p>

                        {/* SEARCH INPUT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-xl mx-auto relative mb-12 group"
                        >
                            <div className="absolute inset-0 bg-[#06B6D4]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <input
                                type="text"
                                placeholder="Найти услугу (например: 'регистрация')"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#050B14]/80 border border-white/10 focus:border-[#06B6D4]/50 outline-none transition-all backdrop-blur-xl text-white placeholder-white/20 relative z-10 shadow-2xl focus:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]"
                            />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-20 group-focus-within:text-[#06B6D4] transition-colors" size={20} />
                        </motion.div>

                        {/* CATEGORY FILTERS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {categories.map(cat => {
                                const Icon = cat.icon;
                                const isActive = filter === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter(cat.id)}
                                        className={`
                                            px-6 py-3 rounded-2xl text-sm font-bold border transition-all flex items-center gap-2 relative overflow-hidden group
                                            ${isActive
                                                ? 'bg-[#06B6D4] text-[#050B14] border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                                                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
                                            }
                                        `}
                                    >
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />}
                                        {Icon && <Icon size={16} className={isActive ? 'text-[#050B14]' : 'text-slate-500 group-hover:text-white transition-colors'} />}
                                        <span className="relative z-10">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* SERVICES GRID */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 relative min-h-[400px]">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <motion.div
                                        key={service.id}
                                        layout="position"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, layout: { duration: 0.3, ease: "easeInOut" } }}
                                        className="group relative p-8 rounded-[32px] bg-[#050B14]/40 border border-white/[0.08] cursor-pointer flex flex-col justify-between h-full overflow-hidden isolate transform-gpu"
                                        style={{ willChange: 'transform, opacity' }} // Hint for browser optimization
                                    >
                                        {/* OPTIMIZED HOVER LAYER: Opacity transition is much cheaper than animating box-shadow/border */}
                                        <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        <div className="absolute inset-0 border border-[#06B6D4]/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                        <div className="absolute inset-0 shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px] pointer-events-none" />

                                        {/* Static Blur Blob (No color animation to save Paint) */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] text-[10px] font-bold uppercase tracking-widest rounded-lg border border-[#06B6D4]/20">
                                                    {service.cat}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-4 text-white leading-tight tracking-tight group-hover:text-[#06B6D4] transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-[#9EACB7] mb-8 text-sm leading-relaxed font-medium">
                                                {service.desc}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 relative z-10">
                                            <div className="text-xl font-bold text-white tracking-tight">
                                                {service.price}
                                            </div>
                                            {/* Button with scale transform (cheap) instead of layout changes */}
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#06B6D4] group-hover:text-[#050B14] transition-colors duration-300 group-hover:scale-110">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center"
                                >
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                                    <p className="text-slate-400">Попробуйте изменить запрос или выберите другую категорию</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA BLOCK */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-[40px] p-[1px] bg-gradient-to-r from-[#06B6D4]/50 to-[#2E1065]/50 shadow-[0_0_50px_-10px_rgba(6,182,212,0.2)]"
                    >
                        <div className="bg-[#050B14] rounded-[39px] p-10 md:p-20 text-center relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#06B6D4] to-[#023A55] rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-500 cursor-pointer">
                                    <MessageCircle size={36} />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tighter">Не нашли нужную услугу?</h2>
                                <p className="text-[#9EACB7] text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                                    Каждый бизнес уникален. Опишите вашу задачу, и мы подготовим индивидуальное коммерческое предложение с прозрачной ценой и сроками.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 bg-gradient-to-r from-[#023A55] to-[#06B6D4] text-white font-bold text-lg rounded-2xl transition-all shadow-xl border border-[#06B6D4]/30"
                                >
                                    Обсудить задачу
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
