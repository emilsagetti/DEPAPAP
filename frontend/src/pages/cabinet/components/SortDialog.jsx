import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

const SortDialog = ({ onClose, onSort }) => {
    const [sortBy, setSortBy] = useState('paragraphs'); // paragraphs
    const [sortType, setSortType] = useState('text'); // text, number, date
    const [direction, setDirection] = useState('asc'); // asc, desc
    const [hasHeader, setHasHeader] = useState(false);

    const handleSort = () => {
        onSort({ sortBy, sortType, direction, hasHeader });
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl w-[400px] overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="h-10 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-4">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                        <ArrowDownAZ size={16} className="text-[#06B6D4]" />
                        Сортировка текста
                    </span>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    {/* Primary Sort */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                            <span>Сортировать по</span>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
                            >
                                <option value="paragraphs">Абзацам</option>
                                <option value="headings">Заголовкам</option>
                            </select>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-24 bg-black/20 border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
                            >
                                <option value="text">Текст</option>
                                <option value="number">Число</option>
                                <option value="date">Дата</option>
                            </select>
                        </div>
                    </div>

                    {/* Direction */}
                    <div className="flex flex-col gap-2 bg-black/20 p-3 rounded border border-white/5">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${direction === 'asc' ? 'border-[#06B6D4]' : 'border-slate-500'}`}>
                                {direction === 'asc' && <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />}
                            </div>
                            <input type="radio" className="hidden" checked={direction === 'asc'} onChange={() => setDirection('asc')} />
                            <span className="text-sm text-slate-300 group-hover:text-white">По возрастанию</span>
                            <ArrowDownAZ size={14} className="ml-auto text-slate-500" />
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${direction === 'desc' ? 'border-[#06B6D4]' : 'border-slate-500'}`}>
                                {direction === 'desc' && <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />}
                            </div>
                            <input type="radio" className="hidden" checked={direction === 'desc'} onChange={() => setDirection('desc')} />
                            <span className="text-sm text-slate-300 group-hover:text-white">По убыванию</span>
                            <ArrowUpAZ size={14} className="ml-auto text-slate-500" />
                        </label>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                        <div className="text-xs text-slate-400 mb-1">Список</div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                <input type="radio" checked={!hasHeader} onChange={() => setHasHeader(false)} className="accent-[#06B6D4]" />
                                без строки заголовка
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                                <input type="radio" checked={hasHeader} onChange={() => setHasHeader(true)} className="accent-[#06B6D4]" />
                                со строкой заголовка
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-12 bg-[#0F172A] border-t border-white/5 flex items-center justify-end px-4 gap-2">
                    <button onClick={onClose} className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        Отмена
                    </button>
                    <button onClick={handleSort} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#06B6D4] hover:bg-[#0891b2] text-white transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        ОК
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SortDialog;
