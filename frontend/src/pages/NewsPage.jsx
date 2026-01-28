import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, X, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewsPage = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [filter, setFilter] = useState('all');

    const news = [
        {
            id: 1,
            title: 'Изменения в законодательстве о банкротстве 2026',
            excerpt: 'С 1 января 2026 года вступают в силу изменения в Федеральном законе о банкротстве...',
            content: `# Изменения в законодательстве о банкротстве 2026

С 1 января 2026 года вступают в силу значительные изменения в Федеральном законе "О несостоятельности (банкротстве)".

## Основные изменения

### Для физических лиц
- Упрощена процедура банкротства граждан
- Сокращены сроки рассмотрения дел
- Введены новые основания для списания долгов

### Для юридических лиц
- Изменены критерии неплатёжеспособности
- Расширены полномочия арбитражного управляющего
- Введена ответственность контролирующих лиц

## Что это значит для бизнеса?

Предпринимателям следует внимательно изучить новые требования и при необходимости пересмотреть стратегию работы с должниками.`,
            author: 'Елена Козлова',
            date: '10 января 2026',
            readTime: '5 мин',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
            category: 'Законодательство'
        },
        {
            id: 2,
            title: 'Как зарегистрировать ООО в 2026 году: пошаговая инструкция',
            excerpt: 'Подробное руководство по регистрации общества с ограниченной ответственностью под ключ...',
            content: `# Как зарегистрировать ООО в 2026 году

Регистрация ООО — первый шаг к началу легального бизнеса. В этом гайде мы разберём все этапы.

## Шаг 1: Подготовка документов
- Решение о создании ООО
- Устав общества
- Заявление по форме Р11001

## Шаг 2: Выбор юридического адреса
Адрес должен быть реальным и подтверждённым гарантийным письмом.

## Шаг 3: Оплата госпошлины
Размер пошлины в 2026 году — 4000 рублей.

## Шаг 4: Подача документов
Документы можно подать лично, через МФЦ или онлайн.`,
            author: 'Алексей Смирнов',
            date: '8 января 2026',
            readTime: '8 мин',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
            category: 'Гайд'
        },
        {
            id: 3,
            title: 'Налоговые вычеты для ИП: что нужно знать',
            excerpt: 'Обзор доступных налоговых вычетов для индивидуальных предпринимателей в 2026 году...',
            content: `# Налоговые вычеты для ИП

Индивидуальные предприниматели имеют право на различные налоговые вычеты.

## Виды вычетов

### Профессиональные вычеты
Расходы, связанные с получением дохода.

### Стандартные вычеты  
На самого ИП и его детей.

### Социальные вычеты
Лечение, обучение, пенсионные взносы.

## Как получить вычет?
Подайте декларацию 3-НДФЛ с приложением подтверждающих документов.`,
            author: 'Мария Иванова',
            date: '5 января 2026',
            readTime: '6 мин',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
            category: 'Налоги'
        },
        {
            id: 4,
            title: 'Защита интеллектуальной собственности для стартапов',
            excerpt: 'Как защитить идею, бренд и технологию на ранних этапах развития компании...',
            content: `# Защита интеллектуальной собственности

Для стартапов защита IP — критически важный аспект.

## Что защищать?
- Товарный знак (бренд)
- Патент (изобретение)
- Авторские права (код, дизайн)

## Первые шаги
1. Проведите аудит IP-активов
2. Зарегистрируйте товарный знак
3. Обеспечьте NDA с сотрудниками`,
            author: 'Дмитрий Волков',
            date: '3 января 2026',
            readTime: '7 мин',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            category: 'Советы'
        },
        {
            id: 5,
            title: 'Изменения в трудовом законодательстве 2026',
            excerpt: 'Ключевые изменения в Трудовом кодексе, которые вступят в силу в этом году...',
            content: `# Изменения в трудовом законодательстве

2026 год принёс важные изменения для работодателей и работников.

## Удалённая работа
Новые правила оформления дистанционных сотрудников.

## Электронное кадровое делопроизводство
Переход на ЭДО становится обязательным для компаний с 50+ сотрудниками.

## Повышение МРОТ
С 1 января МРОТ увеличен до 22 000 рублей.`,
            author: 'Анна Петрова',
            date: '1 января 2026',
            readTime: '4 мин',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop',
            category: 'Законодательство'
        },
    ];

    const categories = ['all', 'Законодательство', 'Гайд', 'Налоги', 'Советы'];

    const filteredNews = filter === 'all'
        ? news
        : news.filter(n => n.category === filter);

    return (
        <div className="min-h-screen bg-paper">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
                            Новости и статьи
                        </h1>
                        <p className="text-lg text-ink/60 max-w-2xl mx-auto">
                            Актуальные материалы о законодательстве, гайды и советы от наших юристов
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex justify-center mb-10"
                    >
                        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-grayline/30">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className="relative px-5 py-2 text-sm font-medium rounded-xl transition-colors"
                                >
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="newsFilter"
                                            className="absolute inset-0 bg-navy rounded-xl"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${filter === cat ? 'text-white' : 'text-ink/70'}`}>
                                        {cat === 'all' ? 'Все' : cat}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* News Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredNews.map((article, i) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedArticle(article)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-grayline/30 cursor-pointer group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-ink text-xs font-medium rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-ink/50 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {article.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {article.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-ink mb-2 line-clamp-2 group-hover:text-navy transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-ink/60 text-sm line-clamp-2 mb-4">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                                            {article.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm text-ink/70">{article.author}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </main>

            <Footer />

            {/* Article Overlay Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 overflow-y-auto"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ type: "spring", bounce: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="min-h-screen md:min-h-0 md:my-8 md:mx-auto md:max-w-3xl bg-paper md:rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                            >
                                <X size={20} className="text-ink" />
                            </button>

                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80">
                                <img
                                    src={selectedArticle.image}
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block px-3 py-1 bg-navy text-white text-xs font-medium rounded-full mb-3">
                                        {selectedArticle.category}
                                    </span>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                                        {selectedArticle.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {/* Meta */}
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-grayline/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold">
                                            {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-medium text-ink">{selectedArticle.author}</p>
                                            <div className="flex items-center gap-3 text-sm text-ink/50">
                                                <span>{selectedArticle.date}</span>
                                                <span>•</span>
                                                <span>{selectedArticle.readTime} чтения</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-grayline/20 rounded-lg transition-colors">
                                            <Share2 size={18} className="text-ink/50" />
                                        </button>
                                        <button className="p-2 hover:bg-grayline/20 rounded-lg transition-colors">
                                            <Bookmark size={18} className="text-ink/50" />
                                        </button>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-slate max-w-none">
                                    {selectedArticle.content.split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) {
                                            return <h1 key={i} className="text-2xl font-bold text-ink mt-6 mb-4">{line.slice(2)}</h1>;
                                        } else if (line.startsWith('## ')) {
                                            return <h2 key={i} className="text-xl font-semibold text-ink mt-5 mb-3">{line.slice(3)}</h2>;
                                        } else if (line.startsWith('### ')) {
                                            return <h3 key={i} className="text-lg font-semibold text-ink/90 mt-4 mb-2">{line.slice(4)}</h3>;
                                        } else if (line.startsWith('- ')) {
                                            return <li key={i} className="text-ink/80 ml-4">{line.slice(2)}</li>;
                                        } else if (line.trim()) {
                                            return <p key={i} className="text-ink/80 mb-3 leading-relaxed">{line}</p>;
                                        }
                                        return null;
                                    })}
                                </div>

                                {/* CTA */}
                                <div className="mt-8 p-6 bg-navy/5 rounded-2xl text-center">
                                    <h3 className="font-semibold text-ink mb-2">Нужна консультация?</h3>
                                    <p className="text-ink/60 text-sm mb-4">Получите бесплатную консультацию от наших юристов</p>
                                    <Link
                                        to="/auth"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy/90 text-white font-medium rounded-xl transition-colors"
                                    >
                                        Получить консультацию
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewsPage;
