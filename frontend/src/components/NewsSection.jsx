import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, X, Share2, Bookmark, ChevronRight, BookOpen } from 'lucide-react';

const NewsSection = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Mock news data - will be fetched from CMS API
    const news = [
        {
            id: 1,
            title: 'Изменения в законодательстве о банкротстве 2026',
            excerpt: 'С 1 января 2026 года вступают в силу изменения в Федеральном законе о банкротстве...',
            content: `С 1 января 2026 года вступают в силу значительные изменения в Федеральном законе "О несостоятельности (банкротстве)".

Основные изменения для физических лиц:
• Упрощена процедура банкротства граждан
• Сокращены сроки рассмотрения дел
• Введены новые основания для списания долгов

Для юридических лиц:
• Изменены критерии неплатёжеспособности
• Расширены полномочия арбитражного управляющего
• Введена ответственность контролирующих лиц

Предпринимателям следует внимательно изучить новые требования и при необходимости пересмотреть стратегию работы с должниками.`,
            author: 'Елена Козлова',
            date: '10 января 2026',
            readTime: '5 мин',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
            category: 'Законодательство'
        },
        {
            id: 2,
            title: 'Как зарегистрировать ООО в 2026 году',
            excerpt: 'Подробное руководство по регистрации общества с ограниченной ответственностью...',
            content: `Регистрация ООО — первый шаг к началу легального бизнеса. В этом гайде мы разберём все этапы.

Шаг 1: Подготовка документов
• Решение о создании ООО
• Устав общества
• Заявление по форме Р11001

Шаг 2: Выбор юридического адреса
Адрес должен быть реальным и подтверждённым гарантийным письмом.

Шаг 3: Оплата госпошлины
Размер пошлины в 2026 году — 4000 рублей.

Шаг 4: Подача документов
Документы можно подать лично, через МФЦ или онлайн через портал ФНС.`,
            author: 'Алексей Смирнов',
            date: '8 января 2026',
            readTime: '8 мин',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
            category: 'Гайд'
        },
        {
            id: 3,
            title: 'Налоговые вычеты для ИП: что нужно знать',
            excerpt: 'Обзор доступных налоговых вычетов для индивидуальных предпринимателей...',
            content: `Индивидуальные предприниматели имеют право на различные налоговые вычеты.

Виды вычетов:

Профессиональные вычеты — расходы, связанные с получением дохода.

Стандартные вычеты — на самого ИП и его детей.

Социальные вычеты — лечение, обучение, пенсионные взносы.

Как получить вычет?
Подайте декларацию 3-НДФЛ с приложением подтверждающих документов в налоговую инспекцию.`,
            author: 'Мария Иванова',
            date: '5 января 2026',
            readTime: '6 мин',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Налоги'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <>
            <section className="py-20 bg-transparent relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#023A55]/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] text-slate-300 text-sm font-medium rounded-full mb-6 border border-white/10 backdrop-blur-md shadow-sm">
                            <BookOpen size={14} className="text-[#06B6D4]" />
                            Блог DEPA
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Полезные материалы
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Актуальные новости законодательства, гайды и советы от наших юристов
                        </p>
                    </motion.div>

                    {/* News Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {news.map((item) => (
                            <motion.article
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedArticle(item)}
                                className="group relative bg-white/[0.03] rounded-3xl overflow-hidden border border-white/[0.08] cursor-pointer hover:border-[#06B6D4]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 backdrop-blur-xl"
                            >
                                {/* Top Glare */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent z-10 opacity-60"></div>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white/90 text-[10px] uppercase font-bold tracking-wider rounded-full border border-white/10 shadow-lg">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 pt-6 relative z-20 -mt-10">
                                    {/* Date & Time Pill */}
                                    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#050B14]/80 backdrop-blur-sm border border-white/5 text-xs text-slate-400 mb-4 shadow-sm">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#06B6D4]" />
                                            {item.date}
                                        </span>
                                        <div className="w-0.5 h-3 bg-white/10"></div>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={12} className="text-[#06B6D4]" />
                                            {item.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#06B6D4] transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
                                        {item.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#023A55] to-[#06B6D4] flex items-center justify-center text-white text-[10px] font-bold shadow-inner">
                                                {item.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-xs font-medium text-slate-300">{item.author}</span>
                                        </div>
                                        <span className="text-[#06B6D4] font-semibold text-xs uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Читать
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link
                            to="/news"
                            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/20 backdrop-blur-sm"
                        >
                            Все статьи
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Article Overlay Modal - Premium Dark Glass */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <div className="absolute inset-0 bg-[#050B14]/80 backdrop-blur-xl transition-all" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-[#050B14] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-6 right-6 z-30 p-2.5 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10 text-white group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Hero Image */}
                            <div className="relative h-72 sm:h-96">
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                                    <span className="inline-block px-3 py-1 bg-[#06B6D4]/90 text-white text-[10px] uppercase font-bold tracking-wider rounded-full mb-4 shadow-lg backdrop-blur-md">
                                        {selectedArticle.category}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
                                        {selectedArticle.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 sm:p-10 md:p-12">
                                {/* Meta */}
                                <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#023A55] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg ring-4 ring-[#050B14]">
                                            {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg">{selectedArticle.author}</p>
                                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                                <span>{selectedArticle.date}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                                                <span>{selectedArticle.readTime} чтения</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/5">
                                            <Share2 size={18} />
                                            <span className="text-sm font-medium">Поделиться</span>
                                        </button>
                                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 text-slate-300">
                                            <Bookmark size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-lg prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-li:text-slate-300 prose-strong:text-white">
                                    {selectedArticle.content.split('\n').map((line, i) => {
                                        if (line.startsWith('•')) {
                                            return <li key={i} className="ml-4 mb-2 marker:text-[#06B6D4]">{line.slice(2)}</li>;
                                        } else if (line.trim()) {
                                            return <p key={i} className="mb-6 leading-relaxed opacity-90">{line}</p>;
                                        }
                                        return null;
                                    })}
                                </div>

                                {/* CTA */}
                                <div className="mt-16 p-8 relative rounded-3xl overflow-hidden group">
                                    {/* Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#023A55] to-[#06B6D4] opacity-20 group-hover:opacity-25 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 border border-[#06B6D4]/30 rounded-3xl"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Нужна юридическая помощь?</h3>
                                            <p className="text-cyan-100/80">Получите бесплатную консультацию от наших экспертов</p>
                                        </div>
                                        <Link
                                            to="/auth"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl shadow-cyan-900/20"
                                        >
                                            Получить консультацию
                                            <ChevronRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NewsSection;
