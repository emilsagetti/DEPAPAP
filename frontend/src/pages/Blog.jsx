import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Mail, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogFilters from '../components/BlogFilters';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('Все');
    const [selectedArticle, setSelectedArticle] = useState(null);

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

    const categories = ['Все', 'Законодательство', 'Налоги', 'Гайды', 'Кейсы'];

    // --- ALL ARTICLES DATA ---
    const allPosts = [
        {
            id: 1,
            title: "Изменения в законе о банкротстве 2026: к чему готовиться бизнесу?",
            excerpt: "С 1 января вступили в силу новые поправки. Разбираем, как это повлияет на субсидиарную ответственность директоров и учредителей.",
            date: "19 января 2026",
            readTime: "5 мин",
            category: "Законодательство",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Как зарегистрировать ООО в 2026 году: пошаговая инструкция",
            excerpt: "Подробное руководство по регистрации общества с ограниченной ответственностью по новым правилам ФНС.",
            date: "15 января 2026",
            readTime: "8 мин",
            category: "Гайды",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Налоговые вычеты для ИП: что нужно знать",
            excerpt: "Обзор доступных налоговых вычетов для индивидуальных предпринимателей в 2026 году. Как вернуть деньги?",
            date: "12 января 2026",
            readTime: "6 мин",
            category: "Налоги",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Кейс: Как мы отбили субсидиарку на 50 млн рублей",
            excerpt: "Реальная история спасения активов собственника при банкротстве компании-застройщика.",
            date: "10 января 2026",
            readTime: "10 мин",
            category: "Кейсы",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Маркировка рекламы: штрафы выросли в 10 раз",
            excerpt: "Что нужно знать о ЕРИР и как не попасть на штраф до 500 000 рублей за пост в Телеграм.",
            date: "05 января 2026",
            readTime: "6 мин",
            category: "Законодательство",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Дробление бизнеса: новые критерии ФНС",
            excerpt: "Где проходит грань между оптимизацией и преступлением. Анализ свежей судебной практики.",
            date: "28 декабря 2025",
            readTime: "8 мин",
            category: "Налоги",
            image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Как правильно оформить сотрудника на удаленку?",
            excerpt: "Пошаговый гайд по составлению трудового договора с дистанционным работником, чтобы избежать штрафов.",
            date: "20 декабря 2025",
            readTime: "4 мин",
            category: "Гайды",
            image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=800&auto=format&fit=crop"
        }
    ];

    // --- FILTERING LOGIC ---
    const filteredPosts = useMemo(() => {
        if (activeCategory === 'Все') return allPosts;
        return allPosts.filter(post => post.category === activeCategory);
    }, [activeCategory]);

    // Split into Hero (first post) and Grid (rest)
    const heroPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <div className="min-h-screen bg-[#050B14] relative overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight"
                    >
                        Depa.Journal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#9EACB7] text-lg max-w-2xl mx-auto mb-10"
                    >
                        Разбираем сложные законы на атомы. Только практика, никаких скучных теорий.
                    </motion.p>

                    {/* Filter Tabs */}
                    <BlogFilters
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </div>

                {/* ANIMATED CONTENT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >

                        {/* FEATURED ARTICLE (Hero) - Dynamic based on filter */}
                        {heroPost && (
                            <motion.div
                                onClick={() => setSelectedArticle(heroPost)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-16 rounded-3xl overflow-hidden bg-[#0F2837]/80 border border-white/10 shadow-2xl group cursor-pointer relative hover:border-[#06B6D4]/30 transition-all"
                            >
                                <div className="grid md:grid-cols-2">
                                    <div className="h-64 md:h-96 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-[#06B6D4]/20 mix-blend-overlay z-10" />
                                        <img
                                            src={heroPost.image}
                                            alt={heroPost.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 text-sm text-[#06B6D4] font-bold mb-4">
                                            <span className="px-2 py-1 bg-[#06B6D4]/10 rounded border border-[#06B6D4]/20 uppercase">
                                                {heroPost.category}
                                            </span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {heroPost.readTime}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[#06B6D4] transition-colors">
                                            {heroPost.title}
                                        </h2>
                                        <p className="text-[#9EACB7] mb-8 leading-relaxed">
                                            {heroPost.excerpt}
                                        </p>
                                        <div className="flex items-center text-white font-bold group-hover:translate-x-2 transition-transform">
                                            Читать статью <ArrowRight size={20} className="ml-2 text-[#06B6D4]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ARTICLES GRID (Rest of filtered posts) */}
                        {gridPosts.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                                {gridPosts.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        onClick={() => setSelectedArticle(post)}
                                        layout="position"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex flex-col bg-[#0F2837]/60 border border-white/10 rounded-3xl overflow-hidden hover:border-[#06B6D4]/30 transition-all hover:-translate-y-2 shadow-lg cursor-pointer"
                                    >
                                        <div className="h-56 overflow-hidden relative">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                                                    {post.category}
                                                </span>
                                            </div>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 text-xs text-[#9EACB7] mb-4">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#06B6D4] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#9EACB7] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <span className="text-white font-bold text-sm flex items-center gap-2 group/btn w-fit">
                                                Читать полностью <ArrowRight size={16} className="text-[#06B6D4] group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Empty state when no articles match */}
                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-[#9EACB7] text-lg">Статей в этой категории пока нет</p>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

                {/* NEWSLETTER CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl p-10 bg-gradient-to-r from-[#06B6D4]/20 to-[#0F2837] border border-white/10 relative overflow-hidden text-center"
                >
                    <div className="relative z-10 max-w-xl mx-auto">
                        <Mail size={40} className="text-[#06B6D4] mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">Юридический дайджест</h2>
                        <p className="text-[#9EACB7] mb-8">
                            Раз в неделю присылаем подборку самых важных законов для бизнеса. Без спама, только польза.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="flex-1 px-6 py-4 rounded-xl bg-black/20 border border-white/10 text-white focus:border-[#06B6D4] outline-none backdrop-blur-sm placeholder-white/30"
                            />
                            <button className="px-8 py-4 bg-[#06B6D4] text-[#0F2837] font-bold rounded-xl hover:bg-cyan-300 transition-colors">
                                Подписаться
                            </button>
                        </div>
                    </div>
                </motion.div>

            </main>
            <Footer />

            {/* --- ARTICLE MODAL --- */}
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
                                    {/* Header Image */}
                                    <div className="h-[300px] md:h-[400px] relative shrink-0 w-full">
                                        <img
                                            src={selectedArticle.image}
                                            alt={selectedArticle.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a24] via-transparent to-transparent z-10" />
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20">
                                            <div className="inline-block px-3 py-1 bg-[#06B6D4] text-[#050B14] text-xs font-bold rounded-lg mb-4 uppercase shadow-lg shadow-cyan-500/20">
                                                {selectedArticle.category}
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg text-white">
                                                {selectedArticle.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Body Text */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="p-8 md:p-12 space-y-6 text-slate-400 text-lg leading-relaxed max-w-3xl"
                                    >
                                        <p className="font-bold text-white text-xl">{selectedArticle.excerpt}</p>
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
    );
};

export default Blog;
