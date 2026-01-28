import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Upload, Download, Trash2, Search,
    Folder, File, Eye, Plus, Filter, MoreVertical,
    FileSpreadsheet, Image, FileType
} from 'lucide-react';

const LawyerDocuments = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('all');
    const [showUpload, setShowUpload] = useState(false);

    const folders = [
        { id: 'all', name: 'Все документы', count: 156 },
        { id: 'contracts', name: 'Договоры', count: 45 },
        { id: 'templates', name: 'Шаблоны', count: 23 },
        { id: 'client_docs', name: 'Документы клиентов', count: 67 },
        { id: 'court', name: 'Судебные документы', count: 21 },
    ];

    const documents = [
        { id: 1, name: 'Договор_ООО_Ромашка.pdf', type: 'pdf', size: '2.4 MB', folder: 'contracts', date: '11 янв 2026', client: 'ООО "Ромашка"' },
        { id: 2, name: 'Шаблон_НДА.docx', type: 'doc', size: '156 KB', folder: 'templates', date: '10 янв 2026', client: null },
        { id: 3, name: 'Выписка_ЕГРЮЛ.pdf', type: 'pdf', size: '1.1 MB', folder: 'client_docs', date: '10 янв 2026', client: 'ИП Петров А.В.' },
        { id: 4, name: 'Исковое_заявление.pdf', type: 'pdf', size: '890 KB', folder: 'court', date: '9 янв 2026', client: 'АО "СтройИнвест"' },
        { id: 5, name: 'Устав_ООО.pdf', type: 'pdf', size: '3.2 MB', folder: 'client_docs', date: '8 янв 2026', client: 'ООО "ТехноПром"' },
        { id: 6, name: 'Доверенность_шаблон.docx', type: 'doc', size: '89 KB', folder: 'templates', date: '7 янв 2026', client: null },
        { id: 7, name: 'Решение_суда.pdf', type: 'pdf', size: '1.5 MB', folder: 'court', date: '5 янв 2026', client: 'ИП Сидорова М.И.' },
    ];

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileType className="text-red-500" size={20} />;
            case 'doc': return <FileText className="text-blue-500" size={20} />;
            case 'xls': return <FileSpreadsheet className="text-green-500" size={20} />;
            case 'img': return <Image className="text-purple-500" size={20} />;
            default: return <File className="text-slate-400" size={20} />;
        }
    };

    const filteredDocs = documents.filter(doc => {
        if (selectedFolder !== 'all' && doc.folder !== selectedFolder) return false;
        if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

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
                    <h1 className="text-2xl font-bold text-slate-900">Документы</h1>
                    <p className="text-slate-500">Управление файлами и шаблонами</p>
                </div>
                <button
                    onClick={() => setShowUpload(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                    <Upload size={18} />
                    Загрузить
                </button>
            </div>

            <div className="flex gap-6">
                {/* Sidebar - Folders */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-64 flex-shrink-0"
                >
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-3 px-2">Папки</h3>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder.id)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${selectedFolder === folder.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Folder size={18} className={selectedFolder === folder.id ? 'text-blue-500' : 'text-slate-400'} />
                                        <span className="text-sm font-medium">{folder.name}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">{folder.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content - Documents List */}
                <div className="flex-1">
                    {/* Search */}
                    <div className="mb-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Поиск документов..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Documents Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Название</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Клиент</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Размер</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Дата</th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Действия</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredDocs.map((doc, i) => (
                                    <motion.tr
                                        key={doc.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(doc.type)}
                                                <span className="font-medium text-slate-900">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-slate-500">{doc.client || '—'}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-slate-500">{doc.size}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-sm text-slate-500">{doc.date}</span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <Eye size={16} className="text-slate-400" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                    <Download size={16} className="text-slate-400" />
                                                </button>
                                                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                                    <Trash2 size={16} className="text-slate-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUpload && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUpload(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Загрузить документ</h3>

                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center mb-4 hover:border-blue-400 transition-colors cursor-pointer">
                                <Upload size={40} className="mx-auto text-slate-300 mb-3" />
                                <p className="text-slate-600 mb-1">Перетащите файл сюда</p>
                                <p className="text-sm text-slate-400">или нажмите для выбора</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Папка</label>
                                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                                    {folders.filter(f => f.id !== 'all').map(folder => (
                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowUpload(false)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Отмена
                                </button>
                                <button className="flex-1 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                                    Загрузить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LawyerDocuments;
