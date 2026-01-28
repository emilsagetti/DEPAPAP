import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Edit, Eye, Trash2, Plus, Search,
    Home, Info, Phone, Shield, HelpCircle, X, Save
} from 'lucide-react';

const CMSPages = () => {
    const [selectedPage, setSelectedPage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const pages = [
        { id: 'home', title: 'Главная', slug: '/', icon: Home, status: 'published', lastModified: '10 янв 2026' },
        { id: 'about', title: 'О компании', slug: '/about', icon: Info, status: 'published', lastModified: '8 янв 2026' },
        { id: 'services', title: 'Услуги', slug: '/services', icon: FileText, status: 'published', lastModified: '5 янв 2026' },
        { id: 'contacts', title: 'Контакты', slug: '/contacts', icon: Phone, status: 'published', lastModified: '3 янв 2026' },
        { id: 'privacy', title: 'Политика конфиденциальности', slug: '/privacy', icon: Shield, status: 'draft', lastModified: '1 янв 2026' },
        { id: 'faq', title: 'FAQ', slug: '/faq', icon: HelpCircle, status: 'published', lastModified: '28 дек 2025' },
    ];

    const filteredPages = pages.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Страницы</h1>
                    <p className="text-slate-500">Управление статическими страницами сайта</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                    <Plus size={18} />
                    Новая страница
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Поиск страниц..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPages.map((page, i) => (
                    <motion.div
                        key={page.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedPage(page)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                <page.icon size={24} className="text-slate-600" />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${page.status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                {page.status === 'published' ? 'Опубликовано' : 'Черновик'}
                            </span>
                        </div>

                        <h3 className="font-semibold text-slate-900 mb-1">{page.title}</h3>
                        <p className="text-sm text-slate-400 font-mono mb-4">{page.slug}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400">Изменено: {page.lastModified}</span>
                            <div className="flex gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <Eye size={16} className="text-slate-400" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedPage(page); }}
                                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <Edit size={16} className="text-blue-500" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {selectedPage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Редактирование: {selectedPage.title}
                                </h3>
                                <button
                                    onClick={() => setSelectedPage(null)}
                                    className="p-2 hover:bg-slate-100 rounded-lg"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedPage.title}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">URL (slug)</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedPage.slug}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Мета-описание</label>
                                    <textarea
                                        rows={3}
                                        placeholder="SEO описание страницы..."
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Статус</label>
                                    <select
                                        defaultValue={selectedPage.status}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        <option value="draft">Черновик</option>
                                        <option value="published">Опубликовано</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                                <button
                                    onClick={() => setSelectedPage(null)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Отмена
                                </button>
                                <button className="flex-1 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <Save size={18} />
                                    Сохранить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CMSPages;
