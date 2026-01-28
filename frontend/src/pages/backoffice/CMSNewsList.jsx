import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, Plus, Edit, Trash2, Eye, ChevronDown,
    Calendar, Clock, User, Image, MoreVertical
} from 'lucide-react';

const CMSNewsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock news data
    const news = [
        {
            id: 1,
            title: 'Изменения в законодательстве о банкротстве 2026',
            excerpt: 'С 1 января 2026 года вступают в силу изменения в Федеральном законе о банкротстве...',
            author: 'Елена Козлова',
            status: 'published',
            publishedAt: '10.01.2026',
            views: 1247,
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=120&fit=crop'
        },
        {
            id: 2,
            title: 'Как зарегистрировать ООО в 2026 году: пошаговая инструкция',
            excerpt: 'Подробное руководство по регистрации общества с ограниченной ответственностью...',
            author: 'Елена Козлова',
            status: 'draft',
            publishedAt: null,
            views: 0,
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=120&fit=crop'
        },
        {
            id: 3,
            title: 'Налоговые вычеты для ИП: что нужно знать',
            excerpt: 'Обзор доступных налоговых вычетов для индивидуальных предпринимателей...',
            author: 'Елена Козлова',
            status: 'published',
            publishedAt: '05.01.2026',
            views: 892,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=120&fit=crop'
        },
        {
            id: 4,
            title: 'Изменения в трудовом законодательстве',
            excerpt: 'Ключевые изменения в Трудовом кодексе РФ, которые вступят в силу в 2026 году...',
            author: 'Елена Козлова',
            status: 'scheduled',
            publishedAt: '15.01.2026',
            views: 0,
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=120&fit=crop'
        },
    ];

    const filteredNews = news
        .filter(item => statusFilter === 'all' || item.status === statusFilter)
        .filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const statusLabels = {
        published: { label: 'Опубликовано', color: 'bg-green-100 text-green-700' },
        draft: { label: 'Черновик', color: 'bg-slate-100 text-slate-600' },
        scheduled: { label: 'Запланировано', color: 'bg-blue-100 text-blue-700' },
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Новости</h1>
                    <p className="text-slate-500">{news.length} статей</p>
                </div>
                <Link
                    to="/cms/news/new"
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
                >
                    <Plus size={18} />
                    Новая статья
                </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[300px] relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по заголовку..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                </div>
                <div className="flex bg-white border border-slate-200 rounded-2xl p-1">
                    {[
                        { id: 'all', label: 'Все' },
                        { id: 'published', label: 'Опубликованные' },
                        { id: 'draft', label: 'Черновики' },
                        { id: 'scheduled', label: 'Запланированные' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setStatusFilter(f.id)}
                            className="relative px-5 py-2.5 text-sm font-medium transition-colors rounded-xl"
                        >
                            {statusFilter === f.id && (
                                <motion.div
                                    layoutId="cmsTabPill"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}
                            <span className={`relative z-10 ${statusFilter === f.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                                {f.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredNews.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="flex">
                            {/* Image */}
                            <div className="w-40 h-32 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusLabels[item.status]?.color}`}>
                                            {statusLabels[item.status]?.label}
                                        </span>
                                        <h3 className="font-semibold text-slate-900 mt-2 line-clamp-2">{item.title}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <User size={12} />
                                        {item.author}
                                    </span>
                                    {item.publishedAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {item.publishedAt}
                                        </span>
                                    )}
                                    {item.views > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Eye size={12} />
                                            {item.views}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mt-3">
                                    <Link
                                        to={`/cms/news/${item.id}`}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <Edit size={14} />
                                        Редактировать
                                    </Link>
                                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                                        <Trash2 size={16} className="text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CMSNewsList;
