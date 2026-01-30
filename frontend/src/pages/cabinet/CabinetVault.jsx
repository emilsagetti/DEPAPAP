import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Folder, FileText, Search, Filter, Grid, List, Share2, MoreVertical, Clock, AlertTriangle, Database, Network, PenTool, Trash2 } from 'lucide-react';

// Mock Knowledge Graph Component (Visualizing Links)
// --- Mock Knowledge Graph (Redesigned) ---
const KnowledgeGraph = () => {
    // We can simulate a force-directed graph with simple absolute positioning and movement
    return (
        <div className="w-full h-[500px] bg-[#0F172A] rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center group perspective-1000">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#06B6D410_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-3xl animate-pulse-slow"></div>

            {/* SVG Connections with gradient */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                        <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Central to Satellites */}
                <motion.line x1="50%" y1="50%" x2="30%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
                <motion.line x1="50%" y1="50%" x2="70%" y2="25%" stroke="url(#lineGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }} />
                <motion.line x1="50%" y1="50%" x2="65%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 1, repeat: Infinity, repeatType: "reverse" }} />
                <motion.line x1="50%" y1="50%" x2="25%" y2="65%" stroke="url(#lineGradient)" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.2, repeat: Infinity, repeatType: "reverse" }} />
            </svg>

            {/* Central Node */}
            <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group/node"
                style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
            >
                <div className="relative w-20 h-20 bg-[#0F172A] rounded-full border-2 border-[#06B6D4] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all group-hover/node:shadow-[0_0_80px_rgba(6,182,212,0.6)] group-hover/node:scale-110">
                    <div className="absolute inset-0 rounded-full border border-[#06B6D4] animate-ping opacity-20"></div>
                    <FileText size={32} className="text-[#06B6D4]" />
                </div>
                <div className="mt-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white font-medium text-sm">
                    Основной договор
                </div>
            </motion.div>

            {/* Satellite Nodes */}
            {[
                { icon: FileText, label: "Доп. согл №1", x: "30%", y: "30%", color: "bg-blue-500" },
                { icon: FileText, label: "Акт сдачи", x: "70%", y: "25%", color: "bg-purple-500" },
                { icon: AlertTriangle, label: "Претензия", x: "65%", y: "75%", color: "bg-red-500" },
                { icon: Database, label: "Реестр", x: "25%", y: "65%", color: "bg-emerald-500" },
            ].map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="absolute flex flex-col items-center cursor-pointer hover:z-30 transition-all hover:scale-110"
                    style={{ top: node.y, left: node.x, x: '-50%', y: '-50%' }}
                >
                    <div className={`w-12 h-12 ${node.color} rounded-full flex items-center justify-center shadow-lg relative group-hover:ring-4 ring-white/10`}>
                        <node.icon className="text-white" size={20} />
                    </div>
                    <div className="mt-2 text-xs font-bold text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur">
                        {node.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const FileCard = ({ file, onSelect, onEdit }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={onSelect}
        className="group relative bg-[#1E293B]/50 hover:bg-white/5 border border-white/5 hover:border-[#06B6D4]/30 rounded-2xl p-4 transition-all hover:shadow-lg cursor-pointer"
    >
        <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-xl ${file.type === 'alert' ? 'bg-red-500/10 text-red-400' : 'bg-[#06B6D4]/10 text-[#06B6D4]'}`}>
                {file.type === 'alert' ? <AlertTriangle size={24} /> : <FileText size={24} />}
            </div>
            <div className="flex gap-1">
                {(file.name.endsWith('.docx') || file.name.endsWith('.doc')) && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(file); }}
                        className="text-white/20 hover:text-[#06B6D4] transition-colors p-1"
                        title="Редактировать"
                    >
                        <PenTool size={16} />
                    </button>
                )}
                <button className="text-white/20 hover:text-white transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>
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

const FileDetails = ({ file, onClose, onDelete }) => (
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
        {/* Actions */}
        <div className="pt-4 mt-auto border-t border-white/5">
            {(file.name.endsWith('.docx') || file.name.endsWith('.doc')) && (
                <button
                    onClick={() => onClose({ edit: true })} // Pass signal to edit
                    className="w-full py-3 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] font-bold rounded-xl hover:bg-[#06B6D4] hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center gap-2 mb-2"
                >
                    <PenTool size={18} />
                    Открыть в редакторе
                </button>
            )}
            <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors mb-2">
                Скачать документ
            </button>
            <button
                onClick={onDelete}
                className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-bold rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
            >
                <Trash2 size={18} />
                Удалить из хранилища
            </button>
        </div>

    </motion.div >
);

// Simple X icon
const X = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)


// Initial Mock Data
const INITIAL_FILES = [
    { id: 1, name: 'Договор поставки №45-А.pdf', date: '28 янв 2026', size: '2.4 MB', type: 'doc', tags: ['Поставка', 'Срочно'], folder: 'Входящие' },
    { id: 2, name: 'Претензия по срокам.docx', date: '25 янв 2026', size: '1.1 MB', type: 'alert', tags: ['Спор', 'Высокий риск'], folder: 'Претензии' },
    { id: 3, name: 'Акт сверки за 2025.xlsx', date: '15 янв 2026', size: '4.5 MB', type: 'xls', tags: ['Бухгалтерия'], folder: 'Входящие' },
    { id: 4, name: 'Устав ООО Вектор.pdf', date: '10 янв 2026', size: '8.2 MB', type: 'doc', tags: ['Учредительные'], folder: 'Общие' },
];

const CabinetVault = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [files, setFiles] = useState([]);

    // --- Persistence Logic ---
    useEffect(() => {
        // Load on mount
        const stored = localStorage.getItem('depa_vault_files');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // We mock URLs for old items if they don't have one (though DataURL is better)
                setFiles(parsed);
            } catch (e) {
                setFiles(INITIAL_FILES);
            }
        } else {
            setFiles(INITIAL_FILES);
            localStorage.setItem('depa_vault_files', JSON.stringify(INITIAL_FILES));
        }
    }, []);

    // Save whenever files change (only metadata + base64 content if small)
    const saveToStorage = (updatedFiles) => {
        try {
            // We shouldn't store HUGE files in localStorage. 
            // FILTER: If file has `contentData` (base64) that is too large, maybe strip it?
            // For this demo, we assume relatively small docs (< 2MB).
            localStorage.setItem('depa_vault_files', JSON.stringify(updatedFiles));
        } catch (e) {
            console.error("Storage quota exceeded", e);
            alert("Не удалось сохранить файл локально (слишком большой).");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Convert key info to persistent object
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Content = event.target.result;

            const newFile = {
                id: Date.now(),
                name: file.name,
                date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
                size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
                type: file.name.endsWith('.docx') ? 'doc' : 'doc',
                tags: ['Загруженное', 'Новое'],
                folder: 'ДОКИ КЛЕИНТ БЕТА', // Added to specific folder
                url: base64Content, // Store Persistent Data URL!
                fileObject: null // Can't store File object in JSON. DataURL acts as source.
            };

            const updated = [newFile, ...files];
            setFiles(updated);
            saveToStorage(updated);
        };
        reader.readAsDataURL(file); // Trigger read
    };

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
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#0891b2] rounded-xl text-white transition-premium shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                    <Folder size={18} /> Загрузить
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                />
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
                                {files.map(file => (
                                    <FileCard
                                        key={file.id}
                                        file={file}
                                        onSelect={() => setSelectedFile(file)}
                                        onEdit={(f) => {
                                            console.log("Navigating with file:", f); // DEBUG
                                            // Fallback: Save to localStorage in case state is lost
                                            localStorage.setItem('depa_active_file_id', f.id);
                                            navigate('/cabinet/constructor', { state: { fileUrl: f.url, title: f.name, fileId: f.id } });
                                        }}
                                    />
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
                        <FileDetails
                            file={selectedFile}
                            onDelete={() => setFileToDelete(selectedFile)}
                            onClose={(result) => {
                                if (result?.edit) {
                                    navigate('/cabinet/constructor', { state: { fileUrl: selectedFile.url, title: selectedFile.name, fileId: selectedFile.id } });
                                } else {
                                    setSelectedFile(null);
                                }
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Custom Confirmation Modal for Deletion */}
                <AnimatePresence>
                    {fileToDelete && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setFileToDelete(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-md bg-[#1E293B] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
                            >
                                {/* Decorative gradient background */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                                        <Trash2 size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Удалить документ?</h3>
                                    <p className="text-slate-400 mb-6 text-sm">
                                        Вы собираетесь удалить <span className="text-white font-medium">"{fileToDelete.name}"</span>.
                                        Это действие нельзя отменить.
                                    </p>

                                    <div className="flex gap-3 w-full">
                                        <button
                                            onClick={() => setFileToDelete(null)}
                                            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition-colors"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={() => {
                                                const updated = files.filter(f => f.id !== fileToDelete.id);
                                                setFiles(updated);
                                                saveToStorage(updated);
                                                setSelectedFile(null);
                                                setFileToDelete(null);
                                            }}
                                            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CabinetVault;
