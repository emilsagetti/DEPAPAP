import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, X, Send, Check, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const Journal = () => {
    const [activeCategory, setActiveCategory] = useState('Все');
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Newsletter State
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedArticle]);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setSubStatus('loading');
        // Simulate API Call
        setTimeout(() => {
            setSubStatus('success');
            setEmail('');
        }, 1500);
    };

    const categories = [
        { id: 'Все', label: 'Все' },
        { id: 'Законодательство', label: 'Законодательство' },
        { id: 'Налоги', label: 'Налоги' },
        { id: 'Гайды', label: 'Гайды' },
        { id: 'Кейсы', label: 'Кейсы' },
    ];

    // --- MOCK DATA ---
    const allArticles = [
        {
            id: 1,
            title: "Изменения в законе о банкротстве 2026: к чему готовиться бизнесу?",
            desc: "С 1 января вступили в силу новые поправки. Разбираем, как это повлияет на субсидиарную ответственность директоров и учредителей.",
            category: "Законодательство",
            readTime: "5 мин",
            date: "19 янв 2026",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
        },
        {
            id: 2,
            title: "Налоговая реформа: УСН и НДС в новом году",
            desc: "Полный разбор изменений налогового кодекса. Кому придется платить больше, а кто получит льготы.",
            category: "Налоги",
            readTime: "7 мин",
            date: "15 янв 2026",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            title: "Как правильно оформить сотрудника на удаленку?",
            desc: "Пошаговый гайд по составлению трудового договора с дистанционным работником, чтобы избежать штрафов.",
            category: "Гайды",
            readTime: "4 мин",
            date: "12 янв 2026",
            image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 4,
            title: "Кейс: Как мы отбили субсидиарку на 50 млн рублей",
            desc: "Реальная история спасения активов собственника при банкротстве компании-застройщика.",
            category: "Кейсы",
            readTime: "10 мин",
            date: "10 янв 2026",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 5,
            title: "Маркировка рекламы: штрафы выросли в 10 раз",
            desc: "Что нужно знать о ЕРИР и как не попасть на штраф до 500 000 рублей за пост в Телеграм.",
            category: "Законодательство",
            readTime: "6 мин",
            date: "05 янв 2026",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 6,
            title: "Дробление бизнеса: новые критерии ФНС",
            desc: "Где проходит грань между оптимизацией и преступлением. Анализ свежей судебной практики.",
            category: "Налоги",
            readTime: "8 мин",
            date: "28 дек 2025",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800",
        }
    ];

    // --- FILTER LOGIC ---
    const filteredArticles = useMemo(() => {
        if (activeCategory === 'Все') return allArticles;
        return allArticles.filter(a => a.category === activeCategory);
    }, [activeCategory]);

    // Split into Hero (1st item) and Grid (rest)
    const heroArticle = filteredArticles[0];
    const gridArticles = filteredArticles.slice(1);

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
                            Журнал <span className="text-[#06B6D4]">DEPA</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
                        >
                            Разбираем сложные законы на атомы. Только практика, никаких скучных теорий.
                        </motion.p>

                        {/* CATEGORY FILTERS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-2"
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`
                                        px-6 py-3 rounded-full text-sm font-bold transition-all border
                                        ${activeCategory === cat.id
                                            ? 'bg-[#06B6D4] border-[#06B6D4] text-[#050B14] shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="space-y-8">

                        {/* 1. HERO ARTICLE (Always the first one of the filtered list) */}
                        {heroArticle && (
                            <motion.div
                                onClick={() => setSelectedArticle(heroArticle)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#06B6D4]/30 transition-all cursor-pointer"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Image Side */}
                                    <div className="relative h-[300px] md:h-[450px]">
                                        {/* ABSOLUTE INSET TECHNIQUE - overflow-hidden on wrapper */}
                                        <motion.div
                                            layoutId={`img-container-${heroArticle.id}`}
                                            className="w-full h-full relative overflow-hidden"
                                            style={{ borderRadius: '24px 0 0 24px' }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            <motion.img
                                                src={heroArticle.image}
                                                alt={heroArticle.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </motion.div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/80 to-transparent md:hidden pointer-events-none" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#06B6D4]/20">
                                                {heroArticle.category}
                                            </span>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                                <Clock size={14} /> {heroArticle.readTime}
                                            </div>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:text-[#06B6D4] transition-colors">
                                            {heroArticle.title}
                                        </h2>
                                        <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                                            {heroArticle.desc}
                                        </p>
                                        <span className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all w-fit">
                                            Читать статью <ArrowRight size={20} className="text-[#06B6D4]" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. GRID ARTICLES (The rest) */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                            <AnimatePresence mode="popLayout">
                                {gridArticles.map((article) => (
                                    <motion.div
                                        onClick={() => setSelectedArticle(article)}
                                        key={article.id}
                                        layout="position"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex flex-col rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#06B6D4]/30 transition-all cursor-pointer"
                                    >
                                        {/* Card Image */}
                                        <div className="h-48 relative">
                                            {/* ABSOLUTE INSET TECHNIQUE - overflow-hidden on wrapper */}
                                            <motion.div
                                                layoutId={`img-container-${article.id}`}
                                                className="w-full h-full relative overflow-hidden"
                                                style={{ borderRadius: '24px 24px 0 0' }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            >
                                                <motion.img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </motion.div>
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-[#050B14]/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/10 z-10">
                                                {article.category}
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                                                <span>{article.date}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-[#06B6D4] transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm font-bold">
                                                <span className="text-white group-hover:text-[#06B6D4] transition-colors">Подробнее</span>
                                                <ArrowRight size={16} className="text-slate-500 group-hover:text-[#06B6D4] group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                    </div>

                    {/* NEWSLETTER SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-[2px]"
                    >
                        <div className="bg-[#050B14] rounded-[38px] p-8 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/20 rounded-full blur-[80px]" />

                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="flex items-center gap-3 mb-4 text-[#06B6D4]">
                                        <Mail size={24} />
                                        <span className="font-bold uppercase tracking-wider text-sm">Рассылка Depa</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Юридические лайфхаки — раз в неделю</h2>
                                    <p className="text-slate-400">Никакого спама. Только полезные гайды, шаблоны документов и разборы новых законов.</p>
                                </div>

                                <form onSubmit={handleSubscribe} className="relative">
                                    {subStatus === 'success' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4 text-green-400"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                <Check size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">Вы успешно подписались!</div>
                                                <div className="text-sm opacity-80">Проверьте почту, мы отправили подарок.</div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            <input
                                                type="email"
                                                placeholder="Ваш email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:border-[#06B6D4] outline-none transition-colors"
                                                required
                                            />
                                            <button
                                                disabled={subStatus === 'loading'}
                                                className="w-full bg-gradient-to-r from-[#023A55] to-[#06B6D4] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {subStatus === 'loading' ? 'Обработка...' : <>Подписаться <Send size={18} /></>}
                                            </button>
                                            <p className="text-xs text-slate-500 text-center">Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности</p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>

                </main>
                <Footer />

                {/* --- ARTICLE OVERLAY (MODAL) --- */}
                <AnimatePresence>
                    {selectedArticle && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedArticle(null)}
                                className="fixed inset-0 bg-[#050B14]/90 backdrop-blur-md z-[60]"
                            />

                            {/* Modal Card */}
                            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#0a1a24] w-full max-w-4xl max-h-[90vh] rounded-[32px] overflow-hidden shadow-2xl relative pointer-events-auto border border-white/10 flex flex-col"
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedArticle(null); }}
                                        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>

                                    {/* Scrollable Content */}
                                    <div className="overflow-y-auto">
                                        {/* Header Image (Morphs from card) */}
                                        <div className="h-[300px] md:h-[400px] relative shrink-0 w-full">
                                            {/* ABSOLUTE INSET TECHNIQUE - overflow-hidden, spring transition */}
                                            <motion.div
                                                layoutId={`img-container-${selectedArticle.id}`}
                                                className="absolute inset-0 w-full h-full z-0 overflow-hidden"
                                                style={{ borderRadius: '0px' }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            >
                                                <motion.img
                                                    src={selectedArticle.image}
                                                    alt={selectedArticle.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </motion.div>
                                            {/* Overlay gradient (fade in, don't morph) */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-gradient-to-t from-[#0a1a24] via-transparent to-transparent z-10"
                                            />
                                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.15 }}
                                                >
                                                    <div className="inline-block px-3 py-1 bg-[#06B6D4] text-[#050B14] text-xs font-bold rounded-lg mb-4 uppercase shadow-lg shadow-cyan-500/20">
                                                        {selectedArticle.category}
                                                    </div>
                                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                                                        {selectedArticle.title}
                                                    </h2>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Body Text (Dummy Content) */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="p-8 md:p-12 space-y-6 text-slate-400 text-lg leading-relaxed max-w-3xl"
                                        >
                                            <p className="font-bold text-white text-xl">{selectedArticle.desc}</p>
                                            <p>Юридическая практика показывает, что большинство проблем возникает из-за неправильно составленной документации на старте. В этом материале мы подробно разберем, какие ошибки допускают предприниматели и как их можно избежать.</p>
                                            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Ключевые аспекты дела</h3>
                                            <p>Во-первых, необходимо учитывать изменения в ст. 54.1 НК РФ. Налоговые органы стали гораздо внимательнее относиться к проверке контрагентов.</p>
                                            <ul className="list-disc pl-6 space-y-2 marker:text-[#06B6D4]">
                                                <li>Проверка деловой цели сделки.</li>
                                                <li>Реальность исполнения обязательств.</li>
                                                <li>Отсутствие признаков взаимозависимости.</li>
                                            </ul>
                                            <p>Если вы столкнулись с подобной ситуацией, рекомендуем не затягивать с обращением к профильным юристам. Своевременный аудит может сэкономить миллионы.</p>

                                            <div className="bg-white/5 border-l-4 border-[#06B6D4] p-6 rounded-r-xl my-8">
                                                <p className="text-white italic">"Закон суров, но это закон. Однако правильная трактовка закона может спасти бизнес."</p>
                                            </div>

                                            <p>Свяжитесь с нами для получения бесплатной консультации по вашему кейсу. Наши специалисты готовы помочь вам разобраться в сложностях законодательства.</p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Journal;
