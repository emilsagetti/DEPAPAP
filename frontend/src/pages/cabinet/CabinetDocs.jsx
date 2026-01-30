import React, { useState, useEffect } from 'react';
import { Folder, Upload, FileText, Download, Search, File, FileSpreadsheet, MoreVertical, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import DocsService from '../../api/docs.service';
import CabinetPageHeader from '../../components/common/CabinetPageHeader';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import TrigramSearchService from '../../utils/TrigramSearchService';

const CabinetDocs = () => {
    const { user } = useAuth();
    const [activeCategory, setActiveCategory] = useState('Все документы');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDocs = async () => {
        setIsLoading(true);
        try {
            const data = await DocsService.getAll();
            setDocs(data.results || data);
        } catch (error) {
            console.error("Failed to fetch documents", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDocs();
        }
    }, [user]);

    // Categories
    const categories = ['Все документы', 'Уставные', 'Договоры', 'Бухгалтерия', 'Кадры', 'Судебное'];

    // Filter logic
    const filteredDocs = docs.filter(doc => {
        const matchesSearch = TrigramSearchService.match(doc.title, searchQuery);
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const getCount = (cat) => {
        if (cat === 'Все документы') return docs.length;
        return docs.filter(d => d.category === cat).length;
    };

    // File Icon Helper (Basic extension check)
    const getFileIcon = (filename) => {
        const ext = filename?.split('.').pop().toLowerCase();
        switch (ext) {
            case 'pdf': return <FileText className="text-red-400" size={24} />;
            case 'xls':
            case 'xlsx': return <FileSpreadsheet className="text-green-400" size={24} />;
            case 'doc':
            case 'docx': return <FileText className="text-blue-400" size={24} />;
            default: return <File className="text-gray-400" size={24} />;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            await handleUpload(files[0]);
        }
    };

    const handleFileInput = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            await handleUpload(files[0]);
        }
    };

    const handleUpload = async (file) => {
        try {
            // Default category if "All" is selected
            const category = activeCategory === 'Все документы' ? 'Договоры' : activeCategory;
            await DocsService.upload(file, category, file.name);
            fetchDocs(); // Refresh list
        } catch (error) {
            console.error("Upload failed", error);
            alert("Ошибка загрузки файла");
        }
    };

    // Helper for file size display
    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Вы уверены, что хотите удалить этот документ?")) {
            try {
                await DocsService.delete(id);
                fetchDocs();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <CabinetPageHeader title="Документы">
                <label className="flex items-center gap-2 bg-gradient-to-r from-[#06B6D4] to-blue-600 px-6 py-3 rounded-xl text-white font-bold hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
                        <Upload size={14} />
                    </div>
                    <span>Загрузить файл</span>
                    <input type="file" className="hidden" onChange={handleFileInput} />
                </label>
            </CabinetPageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
                {/* Folders Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="glass-card p-2 rounded-[24px]">
                        <div className="bg-[#050B14]/60 backdrop-blur-xl rounded-[22px] p-4 border border-white/5 space-y-1">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-4 mb-4 mt-2">Папки</h3>
                            {categories.map((folder, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveCategory(folder)}
                                    className={`w-full p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300 group ${activeCategory === folder
                                        ? 'bg-[#06B6D4]/10 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-[#06B6D4]/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg transition-colors ${activeCategory === folder ? 'bg-[#06B6D4] text-white shadow-[0_0_10px_#06B6D4]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white'}`}>
                                            <Folder size={18} className={activeCategory === folder ? 'fill-current' : ''} />
                                        </div>
                                        <span className="font-medium text-sm">{folder}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${activeCategory === folder ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/30' : 'bg-white/5 text-white/30 border-white/5'
                                        }`}>
                                        {getCount(folder)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cloud Storage Usage Mock */}
                    <div className="glass-card p-6 rounded-[24px] border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Хранилище</h4>
                                    <p className="text-xs text-white/40">Использовано места</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[#06B6D4] font-bold">1.2 ГБ</span>
                                    <span className="text-white/30 text-xs"> / 10 ГБ</span>
                                </div>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-[#06B6D4] to-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: '12%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Files Area */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-white/30 group-focus-within:text-[#06B6D4] transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Поиск документов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#050B14]/30 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#050B14]/50 transition-all focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-sm"
                        />
                    </div>

                    {/* Drag & Drop Zone / List */}
                    <div
                        className={`glass-card rounded-[32px] min-h-[500px] flex flex-col transition-all duration-300 relative group overflow-hidden ${isDragging
                            ? 'border-[#06B6D4] bg-[#06B6D4]/10 shadow-[0_0_50px_rgba(6,182,212,0.2)]'
                            : 'border-white/5'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {/* Background Decor */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 via-transparent to-blue-600/5 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

                        <div className="flex-1 relative z-10 p-2">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                                    <div className="w-10 h-10 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin mb-4"></div>
                                    <div className="text-white/30 animate-pulse font-medium">Загрузка документов...</div>
                                </div>
                            ) : filteredDocs.length > 0 ? (
                                <div className="flex flex-col h-full">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-white/30 uppercase tracking-widest">
                                        <div className="col-span-6 md:col-span-5 pl-2">Название</div>
                                        <div className="col-span-3 hidden md:block">Категория</div>
                                        <div className="col-span-2 hidden md:block">Размер</div>
                                        <div className="col-span-6 md:col-span-2 text-right pr-2">Действия</div>
                                    </div>

                                    <div className="p-2 space-y-1">
                                        <AnimatePresence mode='popLayout'>
                                            {filteredDocs.map((doc, index) => (
                                                <motion.div
                                                    key={doc.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                                    className="group/row grid grid-cols-12 gap-4 px-4 py-3 items-center rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer relative"
                                                >
                                                    <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#0F172A]/50 flex items-center justify-center border border-white/5 group-hover/row:border-[#06B6D4]/30 group-hover/row:scale-110 transition-all duration-300 relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"></div>
                                                            {getFileIcon(doc.file || doc.name)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-white text-sm truncate group-hover/row:text-[#06B6D4] transition-colors mb-0.5">{doc.title || doc.name}</h4>
                                                            <p className="text-xs text-white/40 group-hover/row:text-white/60 transition-colors flex items-center gap-1.5">
                                                                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                                                                {new Date(doc.created_at || doc.date).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-3 hidden md:flex items-center">
                                                        <span className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-white/60 border border-white/5 group-hover/row:bg-white/10 group-hover/row:text-white transition-colors">
                                                            {doc.category}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-2 hidden md:flex items-center text-sm font-mono text-white/40 group-hover/row:text-white/60">
                                                        {formatSize(doc.file_size || doc.size)}
                                                    </div>
                                                    <div className="col-span-6 md:col-span-2 flex justify-end items-center gap-2 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-2 group-hover/row:translate-x-0">
                                                        <a
                                                            href={doc.file}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 text-white/60 hover:text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-xl transition-all hover:scale-110 active:scale-95"
                                                            title="Скачать"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Download size={18} />
                                                        </a>
                                                        <button
                                                            className="p-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all hover:scale-110 active:scale-95"
                                                            title="Удалить"
                                                            onClick={(e) => handleDelete(doc.id, e)}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState
                                    title={isDragging ? "Отпустите файлы для загрузки" : "Документы не найдены"}
                                    description={isDragging ? "Файлы будут добавлены в текущую папку" : "Попробуйте изменить параметры поиска или категорию"}
                                    action={
                                        !isDragging && (
                                            <label className="mt-6 px-6 py-3 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] font-bold rounded-xl hover:bg-[#06B6D4] hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer inline-flex items-center gap-2">
                                                <Upload size={16} />
                                                Загрузить первый документ
                                                <input type="file" className="hidden" onChange={handleFileInput} />
                                            </label>
                                        )
                                    }
                                />
                            )}
                        </div>

                        {/* Drop Overlay Hint */}
                        {!isDragging && filteredDocs.length > 0 && (
                            <div className="p-4 border-t border-white/5 text-center">
                                <span className="text-xs text-white/30 font-medium px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                                    Перетащите файлы сюда для быстрой загрузки
                                </span>
                            </div>
                        )}

                        {/* Dragging Overlay */}
                        {isDragging && (
                            <div className="absolute inset-0 bg-[#06B6D4]/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center pointer-events-none animate-fade-in border-2 border-[#06B6D4] border-dashed rounded-[32px] m-1">
                                <div className="p-6 bg-[#050B14] rounded-full shadow-[0_0_50px_rgba(6,182,212,0.5)] animate-bounce">
                                    <Upload size={48} className="text-[#06B6D4]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mt-6">Отпустите файлы</h3>
                                <p className="text-white/60 mt-2">для загрузки в "{activeCategory}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetDocs;
