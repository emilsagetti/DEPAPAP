import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, Search, Filter, Grid, List, Share2, MoreVertical, Clock, AlertTriangle, Database, Network } from 'lucide-react';

// Mock Knowledge Graph Component (Visualizing Links)
const KnowledgeGraph = () => {
    return (
        <div className="w-full h-[500px] bg-[#0F172A] rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                    x1="50%" y1="50%" x2="30%" y2="30%" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.3"
                />
                <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
                    x1="50%" y1="50%" x2="70%" y2="20%" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.3"
                />
                <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4 }}
                    x1="50%" y1="50%" x2="60%" y2="70%" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.3"
                />
                <motion.line
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }}
                    x1="30%" y1="30%" x2="20%" y2="40%" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.2"
                />
            </svg>

            {/* Nodes */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bg-[#06B6D4] p-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] z-10 cursor-pointer hover:scale-110 transition-transform">
                <FileText className="text-white" size={24} />
                <div className="absolute top-14 left-1/2 -translate-x-1/2 text-center w-32 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-md">Основной договор</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[30%] left-[30%] bg-blue-600 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <FileText className="text-white" size={18} />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center w-24 text-xs text-white/70">Доп. согл №1</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute top-[20%] left-[70%] bg-purple-600 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <FileText className="text-white" size={18} />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center w-24 text-xs text-white/70">Акт сдачи</div>
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute top-[70%] left-[60%] bg-red-500 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <AlertTriangle className="text-white" size={18} />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center w-24 text-xs text-red-300 font-bold">Претензия</div>
            </motion.div>
        </div>
    );
};

const FileCard = ({ file, onSelect }) => (
    <motion.div
        layout
        onClick={onSelect}
        className="group relative bg-[#1E293B]/50 hover:bg-white/5 border border-white/5 hover:border-[#06B6D4]/30 rounded-2xl p-4 transition-all hover:shadow-lg cursor-pointer"
    >
        <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-xl ${file.type === 'alert' ? 'bg-red-500/10 text-red-400' : 'bg-[#06B6D4]/10 text-[#06B6D4]'}`}>
                {file.type === 'alert' ? <AlertTriangle size={24} /> : <FileText size={24} />}
            </div>
            <button className="text-white/20 hover:text-white transition-colors">
                <MoreVertical size={18} />
            </button>
        </div>
        <h3 className="font-medium text-white group-hover:text-[#06B6D4] transition-colors line-clamp-2">{file.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
            <span>{file.date}</span>
            <span>•</span>
            <span>{file.size}</span>
        </div>

        {/* AI Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
            {file.tags.map((tag, i) => (
                <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/60 group-hover:bg-[#06B6D4]/20 group-hover:text-[#06B6D4] transition-colors">
                    {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

const FileDetails = ({ file, onClose }) => (
    <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="w-full lg:w-80 bg-[#0F172A] border-l border-white/10 p-6 flex flex-col h-full absolute right-0 top-0 z-20 shadow-2xl"
    >
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Анализ документа</h3>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <FileText size={32} className="text-[#06B6D4] mb-2" />
                <div className="font-medium text-white">{file.name}</div>
                <div className="text-xs text-white/50">{file.size} • PDF</div>
            </div>

            {/* AI Extraction */}
            <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-[#06B6D4] mb-3">
                    <Database size={14} />
                    Извлеченные данные
                </h4>
                <div className="space-y-3">
                    <div className="group">
                        <div className="text-xs text-white/40 mb-1">Контрагент</div>
                        <div className="text-sm text-white bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer">ООО "СтройКомплект"</div>
                    </div>
                    <div className="group">
                        <div className="text-xs text-white/40 mb-1">Сумма договора</div>
                        <div className="text-sm text-white bg-white/5 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer">1 500 000 ₽</div>
                    </div>
                    <div className="group">
                        <div className="text-xs text-white/40 mb-1">Срок действия</div>
                        <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-center justify-between">
                            до 31.12.2023
                            <AlertTriangle size={12} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Risks */}
            <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-red-400 mb-3">
                    <AlertTriangle size={14} />
                    Риски (AI)
                </h4>
                <div className="text-sm text-white/70 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                    Обнаружена неустойка 0.5% за день просрочки, что выше среднего по рынку.
                </div>
            </div>
        </div>
    </motion.div>
);

// Simple X icon
const X = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)

const CabinetVault = () => {
    const [viewMode, setViewMode] = useState('grid'); // grid, list, graph
    const [selectedFile, setSelectedFile] = useState(null);

    const mockFiles = [
        { id: 1, name: 'Договор поставки №45-А.pdf', date: '28 янв 2026', size: '2.4 MB', type: 'doc', tags: ['Поставка', 'Срочно'] },
        { id: 2, name: 'Претензия по срокам.docx', date: '25 янв 2026', size: '1.1 MB', type: 'alert', tags: ['Спор', 'Высокий риск'] },
        { id: 3, name: 'Акт сверки за 2025.xlsx', date: '15 янв 2026', size: '4.5 MB', type: 'xls', tags: ['Бухгалтерия'] },
        { id: 4, name: 'Устав ООО Вектор.pdf', date: '10 янв 2026', size: '8.2 MB', type: 'doc', tags: ['Учредительные'] },
    ];

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Юридическое хранилище</h1>
                    <p className="text-slate-400">Интеллектуальный сейф с семантическим поиском и картой связей.</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#06B6D4] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#06B6D4] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <List size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('graph')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'graph' ? 'bg-[#06B6D4] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        <Network size={20} />
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <input
                        type="text"
                        placeholder="Поиск по содержанию (например: 'договоры с ООО Вектор')"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#06B6D4]"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors border border-white/10">
                    <Filter size={18} /> Фильтры
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#0891b2] rounded-xl text-white transition-premium shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Folder size={18} /> Загрузить
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative rounded-3xl bg-black/20 border border-white/5 p-1">
                <AnimatePresence mode="wait">
                    {viewMode === 'graph' ? (
                        <motion.div
                            key="graph"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full w-full p-4"
                        >
                            <KnowledgeGraph />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {mockFiles.map(file => (
                                    <FileCard key={file.id} file={file} onSelect={() => setSelectedFile(file)} />
                                ))}
                                {/* Upload Placeholder */}
                                <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-white/30 hover:text-white/50 hover:border-white/20 transition-all cursor-pointer min-h-[160px]">
                                    <Database size={32} className="mb-2" />
                                    <span className="text-sm font-medium">Перетащите файлы</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Details Sidebar Overlay */}
                <AnimatePresence>
                    {selectedFile && (
                        <FileDetails file={selectedFile} onClose={() => setSelectedFile(null)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CabinetVault;
