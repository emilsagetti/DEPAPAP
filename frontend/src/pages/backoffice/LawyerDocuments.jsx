import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Upload, Download, Trash2, Search,
    Folder, File, Eye, Plus, Filter, MoreVertical,
    FileSpreadsheet, Image, FileType, X
} from 'lucide-react';
import TrigramSearchService from '../../utils/TrigramSearchService';

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
            case 'pdf': return <FileType className="text-red-400" size={20} />;
            case 'doc': return <FileText className="text-blue-400" size={20} />;
            case 'xls': return <FileSpreadsheet className="text-green-400" size={20} />;
            case 'img': return <Image className="text-purple-400" size={20} />;
            default: return <File className="text-slate-400" size={20} />;
        }
    };

    const filteredDocs = documents.filter(doc => {
        if (selectedFolder !== 'all' && doc.folder !== selectedFolder) return false;
        if (searchQuery && !TrigramSearchService.match(doc.name, searchQuery)) return false;
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
                    <h1 className="text-2xl font-bold text-white tracking-tight">Документы</h1>
                    <p className="text-slate-500">Управление файлами и шаблонами</p>
                </div>
                <button
                    onClick={() => setShowUpload(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold rounded-xl shadow-lg shadow-[#06B6D4]/20 transition-all"
                >
                    <Upload size={18} />
                    Загрузить
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - Folders */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-64 flex-shrink-0"
                >
                    <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-4 backdrop-blur-xl">
                        <h3 className="font-bold text-slate-400 mb-3 px-3 uppercase text-xs tracking-wider">Папки</h3>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setSelectedFolder(folder.id)}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all ${selectedFolder === folder.id
                                        ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Folder size={18} className={selectedFolder === folder.id ? 'text-white' : 'text-slate-400'} />
                                        <span className="text-sm font-bold">{folder.name}</span>
                                    </div>
                                    <span className={`text-xs font-medium ${selectedFolder === folder.id ? 'text-white/80' : 'text-slate-600'}`}>
                                        {folder.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content - Documents List */}
                <div className="flex-1">
                    {/* Search */}
                    <div className="mb-6 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" />
                        <input
                            type="text"
                            placeholder="Поиск документов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:bg-white/[0.05] focus:border-[#06B6D4]/50 text-white placeholder-slate-600 transition-all font-medium"
                        />
                    </div>

                    {/* Documents Table */}
                    <div className="bg-[#0F172A]/40 rounded-[24px] border border-white/10 backdrop-blur-xl overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/[0.02] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Название</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Клиент</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Размер</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Дата</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredDocs.map((doc, i) => (
                                        <motion.tr
                                            key={doc.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.03 }}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                                                        {getFileIcon(doc.type)}
                                                    </div>
                                                    <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                                                        {doc.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-400 font-medium">{doc.client || '—'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500 font-medium">{doc.size}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500 font-medium">{doc.date}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 text-slate-400 hover:text-[#06B6D4] rounded-lg transition-colors">
                                                        <Download size={16} />
                                                    </button>
                                                    <button className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredDocs.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                                <Search size={48} className="mb-4 opacity-50" />
                                <p>Документы не найдены</p>
                            </div>
                        )}
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
                        className="fixed inset-0 bg-[#050B14]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUpload(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0F172A] border border-white/10 rounded-[24px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-white">Загрузить документ</h3>
                                <button onClick={() => setShowUpload(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="relative z-10 border-2 border-dashed border-white/10 rounded-2xl p-8 text-center mb-6 hover:border-[#06B6D4]/50 hover:bg-white/[0.02] transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Upload size={32} className="text-slate-400 group-hover:text-[#06B6D4] transition-colors" />
                                </div>
                                <p className="text-white font-medium mb-1">Перетащите файл сюда</p>
                                <p className="text-sm text-slate-500">или нажмите для выбора</p>
                            </div>

                            <div className="relative z-10 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Папка</label>
                                    <select className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:bg-white/[0.05] focus:border-[#06B6D4]/50 text-white transition-all font-medium appearance-none cursor-pointer">
                                        {folders.filter(f => f.id !== 'all').map(folder => (
                                            <option key={folder.id} value={folder.id} className="bg-[#0F172A]">{folder.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowUpload(false)}
                                        className="flex-1 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold rounded-xl transition-colors"
                                    >
                                        Отмена
                                    </button>
                                    <button className="flex-1 py-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#06B6D4]/20">
                                        Загрузить
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LawyerDocuments;
