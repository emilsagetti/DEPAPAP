import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FileCheck, Search, Upload, Download, MoreVertical, Trash2, Edit3, FolderOpen } from 'lucide-react';
import TrigramSearchService from '../utils/TrigramSearchService';

const documents = [
    { id: 1, name: 'Устав ООО «Вектор».pdf', type: 'pdf', size: '1.2 MB', date: '10 янв 2026', addedBy: 'Анна С.', status: 'signed', category: 'contracts' },
    { id: 2, name: 'Заявление Р11001.pdf', type: 'pdf', size: '450 KB', date: '9 янв 2026', addedBy: 'Система', status: 'review', category: 'legal' },
    { id: 3, name: 'Решение учредителя.docx', type: 'doc', size: '125 KB', date: '8 янв 2026', addedBy: 'Вы', status: 'draft', category: 'contracts' },
    { id: 4, name: 'Исковое заявление.pdf', type: 'pdf', size: '890 KB', date: '5 янв 2026', addedBy: 'Дмитрий В.', status: 'progress', category: 'legal' },
    { id: 5, name: 'Акт сверки Q4.xlsx', type: 'xls', size: '320 KB', date: '3 янв 2026', addedBy: 'Бухгалтерия', status: 'signed', category: 'accounting' },
    { id: 6, name: 'NDA соглашение.pdf', type: 'pdf', size: '210 KB', date: '1 янв 2026', addedBy: 'Анна С.', status: 'signed', category: 'contracts' },
];

const categories = [
    { id: 'all', label: 'Все' },
    { id: 'contracts', label: 'Договоры' },
    { id: 'legal', label: 'Судебные' },
    { id: 'accounting', label: 'Бухгалтерия' }
];

const statusConfig = {
    signed: { label: 'Подписан', bg: 'bg-green-100', text: 'text-green-700' },
    progress: { label: 'В работе', bg: 'bg-blue-100', text: 'text-blue-700' },
    review: { label: 'На проверке', bg: 'bg-amber-100', text: 'text-amber-700' },
    draft: { label: 'Черновик', bg: 'bg-slate-100', text: 'text-slate-600' }
};

const DocumentsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocs = documents.filter(doc => {
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        const matchesSearch = TrigramSearchService.match(doc.name, searchQuery);
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Документы</h2>
                    <p className="text-slate-500 text-sm">Управление юридическими документами</p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-3 bg-depa-cta hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                >
                    <Upload size={18} />
                    Загрузить файл
                </motion.button>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск документов..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                        >
                            {activeCategory === cat.id && (
                                <motion.div
                                    layoutId="docs-filter-pill"
                                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                                    style={{ zIndex: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className={`relative z-10 ${activeCategory === cat.id ? 'text-slate-900' : 'text-slate-500'
                                }`}>
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Documents Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                {filteredDocs.length === 0 ? (
                    <div className="py-16 text-center">
                        <FolderOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">Документы не найдены</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Название</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Дата</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                                <th className="py-4 px-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.map((doc) => (
                                <tr key={doc.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${doc.type === 'pdf' ? 'bg-red-100' : doc.type === 'xls' ? 'bg-green-100' : 'bg-blue-100'
                                                }`}>
                                                {doc.type === 'pdf' ? (
                                                    <FileText size={22} className="text-red-500" />
                                                ) : (
                                                    <FileCheck size={22} className={doc.type === 'xls' ? 'text-green-500' : 'text-blue-500'} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{doc.name}</p>
                                                <p className="text-xs text-slate-400">Добавил: {doc.addedBy} · {doc.size}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{doc.date}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${statusConfig[doc.status].bg} ${statusConfig[doc.status].text}`}>
                                            {statusConfig[doc.status].label}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Скачать">
                                                <Download size={16} className="text-slate-500" />
                                            </button>
                                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Переименовать">
                                                <Edit3 size={16} className="text-slate-500" />
                                            </button>
                                            <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Удалить">
                                                <Trash2 size={16} className="text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DocumentsPage;
