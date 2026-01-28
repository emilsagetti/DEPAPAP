import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Save, Eye, ArrowLeft, Image, Link, Bold, Italic,
    List, AlignLeft, Code, Upload, X, Calendar, Tag
} from 'lucide-react';

const CMSNewsEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const [article, setArticle] = useState({
        title: isNew ? '' : 'Изменения в налоговом законодательстве 2026',
        slug: isNew ? '' : 'nalogovye-izmeneniya-2026',
        content: isNew ? '' : `# Основные изменения

С 1 января 2026 года вступают в силу важные изменения в налоговом законодательстве РФ.

## Изменения для ИП

- Увеличен лимит по УСН до 300 млн рублей
- Новые сроки подачи деклараций
- Электронный документооборот станет обязательным

## Изменения для ООО

Компании с оборотом более 150 млн рублей обязаны...`,
        excerpt: isNew ? '' : 'Обзор ключевых изменений в налоговом законодательстве, вступающих в силу в 2026 году.',
        category: 'news',
        tags: isNew ? [] : ['налоги', 'ИП', 'ООО', '2026'],
        status: 'draft',
        publishDate: ''
    });

    const [newTag, setNewTag] = useState('');

    const categories = [
        { value: 'news', label: 'Новости' },
        { value: 'guide', label: 'Гайд' },
        { value: 'legal', label: 'Законодательство' },
        { value: 'tips', label: 'Советы' },
    ];

    const addTag = () => {
        if (newTag && !article.tags.includes(newTag)) {
            setArticle({ ...article, tags: [...article.tags, newTag] });
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setArticle({ ...article, tags: article.tags.filter(t => t !== tagToRemove) });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[а-яё]/g, char => {
                const map = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y', э: 'e', ю: 'yu', я: 'ya' };
                return map[char] || char;
            })
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/cms/news')}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {isNew ? 'Новая статья' : 'Редактирование статьи'}
                        </h1>
                        <p className="text-slate-500">
                            {isNew ? 'Создайте новую публикацию' : `ID: ${id}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
                        <Eye size={18} />
                        Предпросмотр
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                        <Save size={18} />
                        Сохранить
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Main Editor */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 space-y-4"
                >
                    {/* Title */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <input
                            type="text"
                            value={article.title}
                            onChange={(e) => {
                                setArticle({
                                    ...article,
                                    title: e.target.value,
                                    slug: generateSlug(e.target.value)
                                });
                            }}
                            placeholder="Заголовок статьи..."
                            className="w-full text-2xl font-bold text-slate-900 focus:outline-none placeholder:text-slate-300"
                        />
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                            <span>Slug:</span>
                            <input
                                type="text"
                                value={article.slug}
                                onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                                className="flex-1 text-slate-600 bg-slate-50 px-2 py-1 rounded border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center gap-1">
                        {[Bold, Italic, AlignLeft, List, Link, Image, Code].map((Icon, i) => (
                            <button
                                key={i}
                                className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Icon size={18} className="text-slate-500" />
                            </button>
                        ))}
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <textarea
                            value={article.content}
                            onChange={(e) => setArticle({ ...article, content: e.target.value })}
                            placeholder="Начните писать статью... (поддерживается Markdown)"
                            rows={20}
                            className="w-full text-slate-700 focus:outline-none resize-none placeholder:text-slate-300 font-mono text-sm"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Краткое описание</label>
                        <textarea
                            value={article.excerpt}
                            onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                            placeholder="Краткое описание для превью..."
                            rows={3}
                            className="w-full text-slate-700 focus:outline-none resize-none placeholder:text-slate-300"
                        />
                    </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-80 flex-shrink-0 space-y-4"
                >
                    {/* Status */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-4">Публикация</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Статус</label>
                                <select
                                    value={article.status}
                                    onChange={(e) => setArticle({ ...article, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                >
                                    <option value="draft">Черновик</option>
                                    <option value="published">Опубликовано</option>
                                    <option value="scheduled">Запланировано</option>
                                </select>
                            </div>
                            {article.status === 'scheduled' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Дата публикации</label>
                                    <input
                                        type="datetime-local"
                                        value={article.publishDate}
                                        onChange={(e) => setArticle({ ...article, publishDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-4">Категория</h3>
                        <select
                            value={article.category}
                            onChange={(e) => setArticle({ ...article, category: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-4">Теги</h3>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                placeholder="Новый тег..."
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                            />
                            <button
                                onClick={addTag}
                                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                <Tag size={18} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-blue-900">
                                        <X size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-4">Обложка</h3>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                            <Upload size={32} className="mx-auto text-slate-300 mb-2" />
                            <p className="text-sm text-slate-500">Загрузить изображение</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CMSNewsEditor;
