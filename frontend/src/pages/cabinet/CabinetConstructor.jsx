import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot, FileText, Download, Save, PenTool, Sparkles,
    Check, ChevronRight, RefreshCw, X, Bold, Italic,
    AlignLeft, AlignCenter, AlignRight, Type, Undo, Redo,
    Wand2, MessageSquare, Clipboard, Scissors, Copy, PaintRoller,
    Underline, Strikethrough, Subscript, Superscript, Highlighter,
    Palette, List, ListOrdered, IndentDecrease, IndentIncrease,
    ArrowDownAZ, Pilcrow, AlignJustify, ArrowUpDown, PaintBucket,
    Grid, Eraser, CaseSensitive, ChevronDown, Baseline, Link, Image as ImageIcon,
    ArrowRight, User as UserIcon, LayoutTemplate, Smartphone, RectangleHorizontal,
    RectangleVertical, Columns as ColumnsIcon, Scissors as ScissorsIcon, MoveVertical,
    ArrowLeftToLine, ArrowRightToLine, File as FileIcon, Settings2
} from 'lucide-react';

// --- Subcomponents ---

// Simplified ToolbarGroup for cleaner look
const ToolbarGroup = ({ label, children }) => (
    <div className="flex items-center h-full px-1 relative group/section">
        <div className="flex items-center gap-1">
            {children}
        </div>
        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        {/* Tooltip on hover for section name could go here, but omitted for cleanliness */}
    </div>
);

const ToolBtn = ({ icon: Icon, onClick, title, activeTitle, className = "" }) => (
    <button
        onClick={onClick}
        title={title || activeTitle}
        className={`w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors ${className}`}
    >
        <Icon size={18} strokeWidth={2} />
    </button>
);

const MiniToolBtn = ({ icon: Icon, label, onClick, title }) => (
    <button onClick={onClick} title={title || label} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-[10px] uppercase font-bold tracking-wider text-slate-400 hover:text-white transition-colors text-left w-full whitespace-nowrap">
        <Icon size={12} />
        <span>{label}</span>
    </button>
);

const AIFloatBtn = ({ icon: Icon, label, onClick, color = "text-white hover:bg-white/10" }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-xs font-bold ${color}`}
    >
        <Icon size={14} />
        {label}
    </button>
);

// --- Assistant Panel (Right Side) ---
const AssistantPanel = ({
    messages,
    onSendMessage,
    isThinking,
    activeSuggestion,
    onAcceptSuggestion,
    onRejectSuggestion
}) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isThinking]);

    return (
        <div className="flex flex-col h-full bg-[#050B14] border-l border-white/5 w-[380px] shrink-0 z-30">
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex justify-between items-center px-6 bg-[#050B14]">
                <span className="font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <Bot size={16} className="text-white" />
                    </div>
                    AI Ассистент
                </span>
                <span className="text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-1 rounded-full">BETA</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/20">
                {/* Intro Message */}
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shrink-0 shadow-lg text-white mt-1">
                        <Bot size={16} />
                    </div>
                    <div className="bg-[#1E293B] border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300 shadow-sm leading-relaxed">
                        <p>Привет! Я помогу составить или отредактировать документ. Выделите любой текст в редакторе, чтобы я мог его улучшить, или просто опишите задачу здесь.</p>
                    </div>
                </div>

                {/* Messages History */}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg text-white mt-1
                            ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-[#06B6D4] to-blue-600'}`}>
                            {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-4 text-sm shadow-sm max-w-[85%] leading-relaxed
                            ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                                : 'bg-[#1E293B] border border-white/5 text-slate-300 rounded-2xl rounded-tl-none'}`}>
                            {msg.content}

                            {/* Suggestion Block */}
                            {msg.suggestion && (
                                <div className="mt-4 bg-[#0F172A] rounded-xl border border-white/10 overflow-hidden">
                                    <div className="bg-white/5 px-4 py-2.5 text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                                        <Sparkles size={12} className="text-[#06B6D4]" />
                                        Предлагаемый вариант
                                    </div>
                                    <div className="p-4 text-white italic border-b border-white/5 leading-relaxed">
                                        "{msg.suggestion}"
                                    </div>
                                    <div className="flex">
                                        <button
                                            onClick={() => onRejectSuggestion()}
                                            className="flex-1 py-3 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            Отмена
                                        </button>
                                        <div className="w-px bg-white/10"></div>
                                        <button
                                            onClick={() => onAcceptSuggestion(msg.suggestion)}
                                            className="flex-1 py-3 text-xs font-bold text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check size={14} />
                                            Вставить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isThinking && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shrink-0 shadow-lg text-white mt-1">
                            <Bot size={16} />
                        </div>
                        <div className="bg-[#1E293B] border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-[#050B14]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && input.trim()) {
                                onSendMessage(input);
                                setInput('');
                            }
                        }}
                        placeholder="Опишите задачу..."
                        className="w-full bg-[#1E293B] border border-white/10 rounded-xl pl-4 pr-10 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]/20 transition-all"
                    />
                    <button
                        onClick={() => {
                            if (input.trim()) {
                                onSendMessage(input);
                                setInput('');
                            }
                        }}
                        className="absolute right-2 top-2 p-1.5 text-[#06B6D4] hover:bg-[#06B6D4]/10 rounded-lg transition-colors mt-0.5"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Color Palette Component (Portal) ---
const ColorPickerPopup = ({ onSelect, onClose, position }) => {
    // Office-style palette
    const themeColors = [
        ['#FFFFFF', '#F2F2F2', '#D8D8D8', '#BFBFBF', '#A5A5A5', '#7F7F7F'], // White - Darker
        ['#000000', '#7F7F7F', '#595959', '#3F3F3F', '#262626', '#0C0C0C'], // Black - Lighter
        ['#E7E6E6', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151'], // Gray
        ['#44546A', '#D6DCE4', '#ADB9CA', '#8497B0', '#44546A', '#2F3B55'], // Blue Gray
        ['#5B9BD5', '#DEEBF6', '#BDD7EE', '#9CC2E5', '#2E75B5', '#1F4E79'], // Blue
        ['#ED7D31', '#FBE5D5', '#F8CBAD', '#F4B083', '#C55A11', '#833C0B'], // Orange
        ['#A5A5A5', '#EDEDED', '#DBDBDB', '#C9C9C9', '#7B7B7B', '#525252'], // Gray 2
        ['#FFC000', '#FFF2CC', '#FFE599', '#FFD966', '#BF9000', '#7F6000'], // Yellow
        ['#4472C4', '#D9E2F3', '#B4C6E7', '#8EA9DB', '#2F5496', '#1F3864'], // Dark Blue
        ['#70AD47', '#E2EFDA', '#C5E0B3', '#A8D08D', '#538135', '#375623'], // Green
    ];

    const standardColors = [
        '#C00000', '#FF0000', '#FFC000', '#FFFF00', '#92D050', '#00B050', '#00B0F0', '#0070C0', '#002060', '#7030A0'
    ];

    // Portal to body to prevent clipping by overflow-hidden/auto
    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl p-3 w-[260px]"
            style={{
                top: position.top + 8,
                left: position.left - 100 // Adjust to align better
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus loss from editor
        >
            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Цвета темы</div>
            <div className="grid grid-cols-10 gap-1 mb-4">
                {themeColors.map((colGroup, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                        {colGroup.map((color, cIdx) => (
                            <button
                                key={cIdx}
                                onClick={() => onSelect(color)}
                                className="w-5 h-5 border border-white/10 hover:scale-110 active:scale-95 transition-transform hover:z-10 hover:border-white shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Стандартные цвета</div>
            <div className="grid grid-cols-10 gap-1">
                {standardColors.map((color, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(color)}
                        className="w-5 h-5 border border-white/10 hover:scale-110 active:scale-95 transition-transform hover:z-10 hover:border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}
            </div>

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Table Picker Component ---
const TablePickerPopup = ({ onSelect, onClose, position }) => {
    const [hoverRows, setHoverRows] = useState(0);
    const [hoverCols, setHoverCols] = useState(0);

    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl p-3"
            style={{
                top: position.top + 8,
                left: position.left - 100
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="mb-2 text-xs font-bold text-slate-400">
                {hoverRows > 0 && hoverCols > 0 ? `${hoverCols} x ${hoverRows}` : 'Вставить таблицу'}
            </div>

            <div
                className="grid grid-cols-10 gap-1 p-1"
                onMouseLeave={() => { setHoverRows(0); setHoverCols(0); }}
            >
                {Array.from({ length: 10 }).map((_, rowIdx) => (
                    <div key={rowIdx} className="contents">
                        {Array.from({ length: 10 }).map((_, colIdx) => {
                            const isActive = rowIdx < hoverRows && colIdx < hoverCols;
                            return (
                                <div
                                    key={`${rowIdx}-${colIdx}`}
                                    className={`w-4 h-4 border ${isActive ? 'bg-[#06B6D4]/30 border-[#06B6D4]' : 'border-white/20 bg-white/5'} transition-colors cursor-pointer`}
                                    onMouseEnter={() => {
                                        setHoverRows(rowIdx + 1);
                                        setHoverCols(colIdx + 1);
                                    }}
                                    onClick={() => onSelect(rowIdx + 1, colIdx + 1)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Borders Picker Component (Word-like) ---
const BordersPickerPopup = ({ onSelect, onClose, position }) => {
    const borderOptions = [
        { id: 'bottom', label: 'Нижняя граница', icon: <path d="M4 20h16M4 4h.01M8 4h.01M12 4h.01M16 4h.01M20 4h.01M4 8h.01M20 8h.01M4 12h.01M20 12h.01M4 16h.01M20 16h.01" /> },
        { id: 'top', label: 'Верхняя граница', icon: <path d="M4 4h16M4 20h.01M8 20h.01M12 20h.01M16 20h.01M20 20h.01M4 8h.01M20 8h.01M4 12h.01M20 12h.01M4 16h.01M20 16h.01" /> },
        { id: 'left', label: 'Левая граница', icon: <path d="M4 4v16M20 4h.01M20 8h.01M20 12h.01M20 16h.01M20 20h.01M8 4h.01M8 20h.01M12 4h.01M12 20h.01M16 4h.01M16 20h.01" /> },
        { id: 'right', label: 'Правая граница', icon: <path d="M20 4v16M4 4h.01M4 8h.01M4 12h.01M4 16h.01M4 20h.01M8 4h.01M8 20h.01M12 4h.01M12 20h.01M16 4h.01M16 20h.01" /> },
        { id: 'none', label: 'Нет границу', icon: <path d="M4 4h.01M8 4h.01M12 4h.01M16 4h.01M20 4h.01M4 8h.01M20 8h.01M4 12h.01M20 12h.01M4 16h.01M20 16h.01M4 20h.01M8 20h.01M12 20h.01M16 20h.01M20 20h.01" /> },
        { id: 'all', label: 'Все границы', icon: <path d="M4 4h16v16H4zM4 12h16M12 4v16" /> },
        { id: 'outer', label: 'Внешние границы', icon: <path d="M4 4h16v16H4z" /> },
        { id: 'inner', label: 'Внутренние границы', icon: <path d="M4 4h.01M8 4h.01M12 4h.01M16 4h.01M20 4h.01M4 20h.01M8 20h.01M12 20h.01M16 20h.01M20 20h.01M4 12h16M12 4v16" /> },
    ];

    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl py-1 w-[220px]"
            style={{
                top: position.top + 8,
                left: position.left - 50
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {borderOptions.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt.id)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-white/5 text-slate-300 hover:text-white transition-colors text-left group"
                    title={opt.label}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100">
                        {opt.icon}
                    </svg>
                    <span className="text-xs font-medium">{opt.label}</span>
                </button>
            ))}

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Multi-level List Picker Component (Word-like) ---
const MultilevelListPickerPopup = ({ onSelect, onClose, position }) => {
    const listOptions = [
        { id: 'none', label: 'Нет', preview: <div className="text-[10px] p-2 text-center text-slate-500">Нет</div> },
        {
            id: 'numeric',
            label: '1) a) i)',
            preview: (
                <div className="text-[9px] leading-tight text-slate-400 pl-1">
                    <div>1. -----</div>
                    <div className="pl-2">a. ---</div>
                    <div className="pl-4">i. -</div>
                </div>
            )
        },
        {
            id: 'legal',
            label: '1 1.1 1.1.1',
            preview: (
                <div className="text-[9px] leading-tight text-slate-400 pl-1">
                    <div>1. -----</div>
                    <div className="pl-2">1.1. ---</div>
                    <div className="pl-4">1.1.1. -</div>
                </div>
            )
        },
        {
            id: 'outline',
            label: 'I. A. 1.',
            preview: (
                <div className="text-[9px] leading-tight text-slate-400 pl-1">
                    <div>I. -----</div>
                    <div className="pl-2">A. ---</div>
                    <div className="pl-4">1. -</div>
                </div>
            )
        },
        {
            id: 'bullets',
            label: 'Symbol',
            preview: (
                <div className="text-[9px] leading-tight text-slate-400 pl-1">
                    <div>● -----</div>
                    <div className="pl-2">○ ---</div>
                    <div className="pl-4">■ -</div>
                </div>
            )
        }
    ];

    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl p-2 w-[240px]"
            style={{
                top: position.top + 8,
                left: position.left - 50
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Библиотека списков</div>
            <div className="grid grid-cols-3 gap-2">
                {listOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onSelect(opt.id)}
                        className="border border-white/10 hover:bg-white/5 hover:border-white/30 rounded p-1 h-16 flex items-start justify-start overflow-hidden bg-[#0F172A]"
                        title={opt.label}
                    >
                        {opt.preview}
                    </button>
                ))}
            </div>

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Text Effects Picker Component (Word-like) ---
const TextEffectsPickerPopup = ({ onSelect, onClose, position }) => {
    const effects = [
        {
            id: 'none',
            label: 'Нет',
            preview: <div className="text-xl font-bold text-slate-500">A</div>
        },
        {
            id: 'shadow',
            label: 'Тень',
            preview: <div className="text-xl font-bold text-blue-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>A</div>
        },
        {
            id: 'reflection',
            label: 'Отражение',
            preview: (
                <div className="text-xl font-bold text-blue-400" style={{ WebkitBoxReflect: 'below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))' }}>
                    A
                </div>
            )
        },
        {
            id: 'glow',
            label: 'Свечение',
            preview: <div className="text-xl font-bold text-blue-400" style={{ textShadow: '0 0 10px #06B6D4, 0 0 20px #06B6D4' }}>A</div>
        },
        {
            id: 'outline',
            label: 'Контур',
            preview: <div className="text-xl font-bold text-transparent bg-clip-text bg-blue-400" style={{ WebkitTextStroke: '1px white' }}>A</div>
        },
    ];

    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl p-2 w-[280px]"
            style={{
                top: position.top + 8,
                left: position.left - 100
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Текстовые эффекты</div>
            <div className="grid grid-cols-5 gap-2">
                {effects.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onSelect(opt.id)}
                        className="border border-white/10 hover:bg-white/5 hover:border-white/30 rounded p-2 h-16 flex items-center justify-center overflow-hidden bg-[#0F172A] group"
                        title={opt.label}
                    >
                        <div className="scale-100 group-hover:scale-110 transition-transform">
                            {opt.preview}
                        </div>
                    </button>
                ))}
            </div>

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Image Control Overlay ---
const ImageControlOverlay = ({ imageRef, onClose, scrollContainerRef }) => {
    const [rect, setRect] = useState(null);

    const updateRect = useCallback(() => {
        if (imageRef) {
            const r = imageRef.getBoundingClientRect();
            setRect({
                top: r.top,
                left: r.left,
                width: r.width,
                height: r.height
            });
        }
    }, [imageRef]);

    useEffect(() => {
        updateRect();

        const scrollContainer = scrollContainerRef?.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', updateRect);
        }
        window.addEventListener('resize', updateRect);

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', updateRect);
            }
            window.removeEventListener('resize', updateRect);
        };
    }, [imageRef, scrollContainerRef, updateRect]);

    const handleResizeStart = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;
        const startRect = imageRef.getBoundingClientRect();
        const startWidth = startRect.width;
        const startHeight = startRect.height;

        const onMouseMove = (moveEvent) => {
            let newWidth = startWidth;
            let newHeight = startHeight;

            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            if (direction.includes('e')) newWidth = startWidth + deltaX;
            if (direction.includes('w')) newWidth = startWidth - deltaX;
            if (direction.includes('s')) newHeight = startHeight + deltaY;
            if (direction.includes('n')) newHeight = startHeight - deltaY;

            // Simple aspect ratio preservation (width based)
            if (direction.length === 2 && startWidth && startHeight) {
                const ratio = startWidth / startHeight;
                newHeight = newWidth / ratio;
            }

            // Apply size
            imageRef.style.width = `${Math.max(50, newWidth)}px`;
            imageRef.style.height = 'auto'; // Force auto height for aspect ratio preservation

            // Force overlay update immediately
            updateRect();
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            updateRect();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleAlign = (align) => {
        if (align === 'left') {
            imageRef.style.float = 'left';
            imageRef.style.marginRight = '1rem';
            imageRef.style.marginLeft = '0';
            imageRef.style.display = 'block';
        } else if (align === 'right') {
            imageRef.style.float = 'right';
            imageRef.style.marginLeft = '1rem';
            imageRef.style.marginRight = '0';
            imageRef.style.display = 'block';
        } else if (align === 'center') {
            imageRef.style.float = 'none';
            imageRef.style.display = 'block';
            imageRef.style.margin = '1rem auto';
        }
        updateRect();
    };

    if (!rect) return null;

    return createPortal(
        <>
            <div
                className="fixed border-2 border-[#06B6D4] pointer-events-none z-[50]"
                style={{
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                }}
            >
                {/* Resize Handles */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#06B6D4] pointer-events-auto cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#06B6D4] pointer-events-auto cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#06B6D4] pointer-events-auto cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#06B6D4] pointer-events-auto cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, 'se')} />
            </div>

            {/* Toolbar */}
            <div
                className="fixed z-[51] flex gap-1 bg-white shadow-lg border border-slate-200 p-1 rounded-lg"
                style={{
                    top: rect.top - 40,
                    left: rect.left
                }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <button onClick={() => handleAlign('left')} className="p-1 hover:bg-slate-100 rounded" title="Слева"><AlignLeft size={16} /></button>
                <button onClick={() => handleAlign('center')} className="p-1 hover:bg-slate-100 rounded" title="По центру"><AlignCenter size={16} /></button>
                <button onClick={() => handleAlign('right')} className="p-1 hover:bg-slate-100 rounded" title="Справа"><AlignRight size={16} /></button>
                <div className="w-px bg-slate-200 h-4 my-auto mx-1"></div>
                <button onClick={onClose} className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded"><X size={16} /></button>
            </div>
        </>,
        document.body
    );
};


// --- Layout Pickers ---
const MarginPickerPopup = ({ onSelect, current, onClose, position }) => {
    const options = [
        { label: 'Обычные', value: '2cm 1.5cm 2cm 3cm', sub: 'В: 2, Н: 2, Л: 3, П: 1.5 см' }, // Top, Right, Bottom, Left
        { label: 'Узкие', value: '1.27cm', sub: '1.27 см со всех сторон' },
        { label: 'Средние', value: '1.91cm', sub: '1.91 см со всех сторон' },
        { label: 'Широкие', value: '5.08cm', sub: '5.08 см со всех сторон' },
    ];

    return createPortal(
        <>
            <div className="fixed inset-0 z-[100]" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed z-[101] bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl p-2 w-64 overflow-hidden backdrop-blur-xl"
                style={{ top: position.top, left: position.left }}
            >
                <div className="flex flex-col gap-1">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onSelect(opt.value)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg text-sm transition-colors ${current === opt.value ? 'bg-[#06B6D4]/20 text-[#06B6D4]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <LayoutTemplate size={16} />
                            <div className="flex flex-col">
                                <span className="font-medium">{opt.label}</span>
                                <span className="text-[10px] opacity-60">{opt.sub}</span>
                            </div>
                        </button>
                    ))}
                    <div className="h-px bg-white/10 my-1"></div>
                    <button className="w-full px-3 py-2 text-left rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        Настраиваемые поля (Custom)...
                    </button>
                </div>
            </motion.div>
        </>,
        document.body
    );
};

const SizePickerPopup = ({ onSelect, current, onClose, position }) => {
    const options = [
        { label: 'A4', value: 'a4', sub: '210 x 297 мм' },
        { label: 'A5', value: 'a5', sub: '148 x 210 мм' },
        { label: 'Letter', value: 'letter', sub: '216 x 279 мм' },
    ];

    return createPortal(
        <>
            <div className="fixed inset-0 z-[100]" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed z-[101] bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl p-2 w-56 overflow-hidden backdrop-blur-xl"
                style={{ top: position.top, left: position.left }}
            >
                <div className="flex flex-col gap-1">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onSelect(opt.value)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg text-sm transition-colors ${current === opt.value ? 'bg-[#06B6D4]/20 text-[#06B6D4]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <FileIcon size={16} />
                            <div className="flex flex-col">
                                <span className="font-medium">{opt.label}</span>
                                <span className="text-[10px] opacity-60">{opt.sub}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        </>,
        document.body
    );
};

const ColumnsPickerPopup = ({ onSelect, current, onClose, position }) => {
    const options = [
        { label: 'одна', value: 1, icon: <RectangleHorizontal size={16} className="rotate-90" /> },
        { label: 'две', value: 2, icon: <ColumnsIcon size={16} /> },
        { label: 'три', value: 3, icon: <ColumnsIcon size={16} /> },
        { label: 'слева', value: 'left', icon: <ColumnsIcon size={16} /> },
        { label: 'справа', value: 'right', icon: <ColumnsIcon size={16} /> },
    ];

    return createPortal(
        <>
            <div className="fixed inset-0 z-[100]" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed z-[101] bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl p-2 w-48 overflow-hidden backdrop-blur-xl"
                style={{ top: position.top, left: position.left }}
            >
                <div className="flex flex-col gap-1">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onSelect(opt.value)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg text-sm transition-colors ${current === opt.value ? 'bg-[#06B6D4]/20 text-[#06B6D4]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            {opt.icon}
                            <span className="font-medium capitalize">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </>,
        document.body
    );
};

// --- Line Spacing Picker Component (Word-like) ---
const LineSpacingPickerPopup = ({ onSelect, onClose, position }) => {
    const options = [
        { id: '1.0', label: '1.0' },
        { id: '1.15', label: '1.15' },
        { id: '1.5', label: '1.5' },
        { id: '2.0', label: '2.0' },
        { id: '2.5', label: '2.5' },
        { id: '3.0', label: '3.0' },
    ];

    return createPortal(
        <div
            className="fixed z-[9999] bg-[#1E293B] border border-white/10 rounded shadow-2xl py-1 w-[160px]"
            style={{
                top: position.top + 8,
                left: position.left - 50
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt.id)}
                    className="flex items-center gap-3 w-full px-4 py-1.5 hover:bg-white/5 text-slate-300 hover:text-white transition-colors text-left group"
                >
                    <span className="text-sm font-medium">{opt.label}</span>
                </button>
            ))}
            <div className="h-px bg-white/10 my-1"></div>
            <button className="flex items-center gap-3 w-full px-4 py-1.5 hover:bg-white/5 text-slate-300 hover:text-white transition-colors text-left">
                <span className="text-xs">Другие варианты...</span>
            </button>

            {/* Click overlay to close */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />
        </div>,
        document.body
    );
};

// --- Editor with Manual Mode and Functional Toolbar ---
const DocumentEditor = ({ isManualMode, onTextSelection, contentRef }) => {
    // Hidden inputs for files
    const imageInputRef = useRef(null);
    const [activeColorPicker, setActiveColorPicker] = useState(null); // { type: 'text'|'highlight', position: {top, left} }
    const [activeTablePicker, setActiveTablePicker] = useState(null); // { position: {top, left} }
    const [activeBordersPicker, setActiveBordersPicker] = useState(null); // { position: {top, left} }
    const [activeListPicker, setActiveListPicker] = useState(null); // { position: {top, left} }
    const [activeTextEffectsPicker, setActiveTextEffectsPicker] = useState(null); // { position: {top, left} }
    const [activeLineSpacingPicker, setActiveLineSpacingPicker] = useState(null); // { position: {top, left} }
    const [showInvisibles, setShowInvisibles] = useState(false);


    // Image Manipulation State
    const [activeImage, setActiveImage] = useState(null); // Reference to the <img> DOM element

    const selectionRef = useRef(null);
    const scrollContainerRef = useRef(null); // For tracking scroll events

    // Layout Settings
    const [pageSettings, setPageSettings] = useState({
        margins: '2cm 1.5cm 2cm 3cm', // Top Right Bottom Left (Normal: 2cm, 1.5cm, 2cm, 3cm)
        orientation: 'portrait', // portrait | landscape
        size: 'a4', // a4 | a5 | letter
        columns: 1, // 1 | 2 | 3 | left | right
        columnGap: '1cm',
        fontSize: '14pt',
        indents: { left: 0, right: 0 }, // cm
        spacing: { before: 0, after: 0 } // pt
    });

    // Helper to calculate main style
    const getPageStyle = () => {
        const style = {
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: pageSettings.fontSize
        };

        // Size & Orientation
        // For multi-page documents, we use a larger minHeight
        if (pageSettings.size === 'a4') {
            style.width = pageSettings.orientation === 'portrait' ? '210mm' : '297mm';
            style.minHeight = pageSettings.orientation === 'portrait' ? '891mm' : '630mm'; // 3 pages
        } else if (pageSettings.size === 'a5') {
            style.width = pageSettings.orientation === 'portrait' ? '148mm' : '210mm';
            style.minHeight = pageSettings.orientation === 'portrait' ? '630mm' : '444mm'; // 3 pages
        } else if (pageSettings.size === 'letter') {
            style.width = pageSettings.orientation === 'portrait' ? '215.9mm' : '279.4mm';
            style.minHeight = pageSettings.orientation === 'portrait' ? '838.2mm' : '647.7mm'; // 3 pages
        }

        // Margins
        style.padding = pageSettings.margins;

        // Columns (applied to content wrapper, not page itself usually, but for simple editor: on page)
        if (pageSettings.columns > 1) {
            style.columnCount = pageSettings.columns;
            style.columnGap = pageSettings.columnGap;
        }

        return style;
    };


    const [activeLayoutPicker, setActiveLayoutPicker] = useState(null); // { type: 'margins'|'size'|'columns', position: {} }

    // Helper to open layout pickers
    const openLayoutPicker = (e, type) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setActiveLayoutPicker({
            type,
            position: { top: rect.bottom + 8, left: rect.left }
        });
    };

    // Layout Handlers
    const setMargins = (marginValue) => {
        setPageSettings(prev => ({ ...prev, margins: marginValue }));
        setActiveLayoutPicker(null);
    };

    const setOrientation = (orientation) => {
        setPageSettings(prev => ({ ...prev, orientation }));
        // Auto-switch size dimensions if needed, but getPageStyle handles swaps
    };

    const setSize = (size) => {
        setPageSettings(prev => ({ ...prev, size }));
        setActiveLayoutPicker(null);
    };

    const setColumns = (cols) => {
        setPageSettings(prev => ({ ...prev, columns: cols }));
        setActiveLayoutPicker(null);
    };


    // Handle clicking on images to selecting them
    const handleEditorClick = (e) => {
        if (e.target.tagName === 'IMG') {
            setActiveImage(e.target);
            // Close other pickers
            setActiveColorPicker(null);
            setActiveTablePicker(null);
            setActiveBordersPicker(null);
            setActiveListPicker(null);
            setActiveTextEffectsPicker(null);
            setActiveLineSpacingPicker(null);
        } else {
            if (activeImage) {
                setActiveImage(null);
            }
        }
    };


    const handleMouseUp = () => {
        if (!isManualMode) return;
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            onTextSelection(selection.toString(), rect, range);
        }
    };

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        // Ensure focus returns to editor after command
        if (contentRef.current) {
            contentRef.current.focus();
        }
    };

    const openColorPicker = (e, type) => {
        // ... (existing)
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }
        const rect = e.currentTarget.getBoundingClientRect();
        if (activeColorPicker?.type === type) {
            setActiveColorPicker(null);
        } else {
            setActiveColorPicker({
                type,
                position: { top: rect.bottom, left: rect.left }
            });
            setActiveTablePicker(null);
            setActiveBordersPicker(null);
            setActiveListPicker(null);
        }
    };

    const applyColor = (command, color) => { /* ... existing */
        // Restore selection
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }
        execCmd(command, color);
        setActiveColorPicker(null);
        selectionRef.current = null;
    };

    // ... (Updating other pickers to close activeListPicker) ...

    const openBordersPicker = (e) => {
        // Save current selection
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        if (activeBordersPicker) {
            setActiveBordersPicker(null);
        } else {
            setActiveBordersPicker({
                position: { top: rect.bottom, left: rect.left }
            });
            setActiveColorPicker(null);
            setActiveTablePicker(null);
        }
    };

    const applyBorder = (type) => {
        // Restore selection
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let node = range.commonAncestorContainer;
            while (node && node.nodeName !== 'TD' && node.nodeName !== 'TH' && node !== contentRef.current) {
                node = node.parentNode;
            }

            if (node && (node.nodeName === 'TD' || node.nodeName === 'TH')) {
                const style = '1px solid black';
                if (type === 'bottom') node.style.borderBottom = style;
                if (type === 'top') node.style.borderTop = style;
                if (type === 'left') node.style.borderLeft = style;
                if (type === 'right') node.style.borderRight = style;
                if (type === 'none') node.style.border = '1px dashed #ddd';
                if (type === 'all') node.style.border = style;
                if (type === 'outer') node.style.border = style;
            }
        }

        setActiveBordersPicker(null);
        selectionRef.current = null;
    };

    const openTablePicker = (e) => {
        // Save current selection
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        if (activeTablePicker) {
            setActiveTablePicker(null);
        } else {
            setActiveTablePicker({
                position: { top: rect.bottom, left: rect.left }
            });
            setActiveColorPicker(null);
            setActiveBordersPicker(null);
        }
    };

    const applyTable = (rows, cols) => {
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        let tableHTML = '<table style="width: 100%; border-collapse: collapse; margin: 1em 0;">';
        for (let i = 0; i < rows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < cols; j++) {
                tableHTML += '<td style="border: 1px solid #ccc; padding: 8px;"></td>';
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        execCmd('insertHTML', tableHTML);

        setActiveTablePicker(null);
        selectionRef.current = null;
    };

    const openListPicker = (e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        if (activeListPicker) {
            setActiveListPicker(null);
        } else {
            setActiveListPicker({
                position: { top: rect.bottom, left: rect.left }
            });
            setActiveColorPicker(null);
            setActiveTablePicker(null);
            setActiveBordersPicker(null);
        }
    };

    const applyListStyle = (styleId) => {
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        execCmd('insertOrderedList');

        // Apply class to the newly created list
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let node = range.commonAncestorContainer;

            // Traverse up to find ol
            while (node && node.nodeName !== 'OL' && node !== contentRef.current) {
                node = node.parentNode;
            }

            if (node && node.nodeName === 'OL') {
                node.className = ''; // Reset
                if (styleId === 'numeric') node.classList.add('list-numeric');
                if (styleId === 'legal') node.classList.add('list-legal');
                if (styleId === 'outline') node.classList.add('list-outline');
            }
        }

        setActiveListPicker(null);
        selectionRef.current = null;
    };

    const openTextEffectsPicker = (e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        if (activeTextEffectsPicker) {
            setActiveTextEffectsPicker(null);
        } else {
            setActiveTextEffectsPicker({
                position: { top: rect.bottom, left: rect.left }
            });
            setActiveColorPicker(null);
            setActiveTablePicker(null);
            setActiveBordersPicker(null);
            setActiveListPicker(null);
        }
    };


    const applyTextEffect = (effectId) => {
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        const selection = window.getSelection();
        if (!selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            const content = range.extractContents();
            const span = document.createElement('span');

            if (effectId === 'shadow') {
                span.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            } else if (effectId === 'reflection') {
                span.style.webkitBoxReflect = 'below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))';
                span.style.display = 'inline-block';
            } else if (effectId === 'glow') {
                span.style.textShadow = '0 0 10px #06B6D4, 0 0 20px #06B6D4';
                span.style.color = '#06B6D4';
            } else if (effectId === 'outline') {
                span.style.webkitTextStroke = '1px black';
                span.style.color = 'transparent';
            } else if (effectId === 'none') {
                execCmd('removeFormat');
                setActiveTextEffectsPicker(null);
                selectionRef.current = null;
                return;
            }

            span.appendChild(content);
            range.insertNode(span);
            selection.removeAllRanges();
        }

        setActiveTextEffectsPicker(null);
        selectionRef.current = null;
    };

    const openLineSpacingPicker = (e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        if (activeLineSpacingPicker) {
            setActiveLineSpacingPicker(null);
        } else {
            setActiveLineSpacingPicker({
                position: { top: rect.bottom, left: rect.left }
            });
            // Close other pickers
            setActiveColorPicker(null);
            setActiveTablePicker(null);
            setActiveBordersPicker(null);
            setActiveListPicker(null);
            setActiveTextEffectsPicker(null);
        }
    };

    const applyLineSpacing = (spacing) => {
        if (selectionRef.current) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let node = range.commonAncestorContainer;

            // Traverse up to find block element (p, div, li, h1-h6, td)
            while (node && !['P', 'DIV', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TD'].includes(node.nodeName) && node !== contentRef.current) {
                node = node.parentNode;
            }

            if (node && node !== contentRef.current) {
                node.style.lineHeight = spacing;
            } else {
                // Fallback: wrap in div if no block found
                if (!selection.isCollapsed) {
                    execCmd('formatBlock', '<div>');
                    // Re-get selection after formatBlock
                    const newSelection = window.getSelection();
                    if (newSelection.rangeCount > 0) {
                        const newRange = newSelection.getRangeAt(0);
                        let newNode = newRange.commonAncestorContainer;
                        if (newNode.nodeType === 3) newNode = newNode.parentNode; // Text node -> Element
                        newNode.style.lineHeight = spacing;
                    }
                }
            }
        }

        setActiveLineSpacingPicker(null);
        selectionRef.current = null;
    };

    // --- Complex Actions ---
    const handleInsertLink = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            selectionRef.current = selection.getRangeAt(0);
        }

        const url = prompt("Введите URL ссылки:", "https://");

        if (selectionRef.current) {
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }

        if (url) execCmd('createLink', url);
        selectionRef.current = null;
    };

    const handleInsertImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                execCmd('insertImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInsertTable = (e) => {
        openTablePicker(e);
    };


    return (
        <div className="flex-1 bg-[#0F172A] overflow-hidden flex flex-col relative w-full">
            <style>{`
                .show-invisibles p::after, 
                .show-invisibles h1::after, 
                .show-invisibles h2::after, 
                .show-invisibles h3::after, 
                .show-invisibles h4::after, 
                .show-invisibles h5::after, 
                .show-invisibles h6::after,
                .show-invisibles li::after,
                .show-invisibles div:not(:empty)::after {
                    content: '¶';
                    color: #94a3b8;
                    margin-left: 4px;
                    opacity: 0.5;
                    font-weight: normal;
                    pointer-events: none;
                }
                
                /* List Styles */
                ol.list-numeric { list-style-type: decimal; }
                ol.list-numeric ol { list-style-type: lower-alpha; }
                ol.list-numeric ol ol { list-style-type: lower-roman; }

                ol.list-legal { counter-reset: item; list-style-type: none; }
                ol.list-legal li { display: block; position: relative; } 
                ol.list-legal li::before { 
                    content: counters(item, ".") ". "; 
                    counter-increment: item;
                    position: absolute; 
                    left: -2.5em; 
                    font-weight: bold; 
                    text-align: right;
                    width: 2em;
                }
                ol.list-legal ol { counter-reset: item; padding-left: 2.5em; }

                ol.list-outline { list-style-type: upper-roman; }
                ol.list-outline ol { list-style-type: upper-alpha; }
                ol.list-outline ol ol { list-style-type: decimal; }
                /* Default List Styles for Editor */
                .document-page ul { list-style-type: disc; padding-left: 2em; margin-bottom: 1em; }
                .document-page ol { list-style-type: decimal; padding-left: 2em; margin-bottom: 1em; }
                .document-page li { margin-bottom: 0.25em; }
            `}</style>
            {/* Hidden Inputs */}
            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleInsertImage} />

            {/* Toolbar (Only visible in Manual Mode) */}
            <AnimatePresence>
                {isManualMode && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#1E293B] border-b border-white/10 shadow-lg z-20 shrink-0"
                    >
                        <div className="flex items-start px-2 py-2 gap-2 overflow-x-auto custom-scrollbar flex-nowrap">

                            {/* Group 1: Clipboard */}
                            <ToolbarGroup label="Буфер обмена">
                                <div className="flex gap-2">
                                    <button onClick={() => execCmd('paste')} className="flex flex-col items-center justify-center p-1 px-3 rounded-lg text-amber-400 hover:bg-white/5 transition-colors bg-amber-400/5 hover:bg-amber-400/10 border border-amber-400/10 h-full group" title="Вставить">
                                        <Clipboard size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                        <span className="text-[10px] font-medium leading-none">Вставить</span>
                                    </button>
                                    <div className="flex flex-col gap-0.5 justify-center">
                                        <MiniToolBtn icon={Scissors} label="Вырезать" onClick={() => execCmd('cut')} />
                                        <MiniToolBtn icon={Copy} label="Копировать" onClick={() => execCmd('copy')} />
                                        <MiniToolBtn icon={PaintRoller} label="Формат" title="Формат по образцу" />
                                    </div>
                                </div>
                            </ToolbarGroup>

                            <div className="w-px h-16 bg-white/5 my-auto shrink-0"></div>

                            {/* Group 2: Font */}
                            <ToolbarGroup label="Шрифт">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        {/* Font Family */}
                                        <div className="relative group">
                                            <select
                                                onChange={(e) => execCmd('fontName', e.target.value)}
                                                className="w-32 bg-[#0F172A] border border-white/10 rounded flex items-center justify-between px-2 py-1 text-xs text-white cursor-pointer hover:border-white/30 whitespace-nowrap appearance-none focus:outline-none focus:border-[#06B6D4]"
                                            >
                                                <option value="Arial">Arial</option>
                                                <option value="Times New Roman">Times New Roman</option>
                                                <option value="Courier New">Courier New</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Verdana">Verdana</option>
                                            </select>
                                        </div>
                                        {/* Font Size */}
                                        <div className="relative group">
                                            <select
                                                onChange={(e) => execCmd('fontSize', e.target.value)}
                                                className="w-14 bg-[#0F172A] border border-white/10 rounded flex items-center justify-between px-2 py-1 text-xs text-white cursor-pointer hover:border-white/30 appearance-none focus:outline-none focus:border-[#06B6D4]"
                                            >
                                                <option value="3">12</option>
                                                <option value="1">8</option>
                                                <option value="2">10</option>
                                                <option value="4">14</option>
                                                <option value="5">18</option>
                                                <option value="6">24</option>
                                                <option value="7">36</option>
                                            </select>
                                        </div>
                                        {/* Resize controls */}
                                        <div className="flex bg-[#0F172A] rounded border border-white/10 overflow-hidden">
                                            <button className="px-2 py-1 hover:bg-white/10 border-r border-white/10 transition-colors" onClick={() => execCmd('increaseFontSize')} title="Увеличить шрифт">
                                                <div className="text-xs font-bold leading-none flex items-start text-white">A<span className="text-[8px] transform -translate-y-0.5 ml-0.5 text-[#06B6D4]">▲</span></div>
                                            </button>
                                            <button className="px-2 py-1 hover:bg-white/10 transition-colors" onClick={() => execCmd('decreaseFontSize')} title="Уменьшить шрифт">
                                                <div className="text-xs font-bold leading-none flex items-start text-white">A<span className="text-[8px] transform translate-y-0.5 ml-0.5 text-red-400">▼</span></div>
                                            </button>
                                        </div>
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <ToolBtn icon={CaseSensitive} title="Регистр" />
                                        <ToolBtn icon={Eraser} title="Очистить формат" onClick={() => execCmd('removeFormat')} className="text-red-400 hover:text-red-300" />
                                    </div>

                                    <div className="flex items-center gap-1 relative z-50">
                                        <ToolBtn icon={Bold} onClick={() => execCmd('bold')} activeTitle="Полужирный" className="font-bold" />
                                        <ToolBtn icon={Italic} onClick={() => execCmd('italic')} activeTitle="Курсив" className="italic" />
                                        <ToolBtn icon={Underline} onClick={() => execCmd('underline')} activeTitle="Подчеркнутый" className="underline" />
                                        <ToolBtn icon={Strikethrough} onClick={() => execCmd('strikethrough')} activeTitle="Зачеркнутый" className="line-through" />
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <ToolBtn icon={Subscript} onClick={() => execCmd('subscript')} title="Подстрочный" />
                                        <ToolBtn icon={Superscript} onClick={() => execCmd('superscript')} title="Надстрочный" />
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <div className="relative">
                                            <ToolBtn
                                                icon={Sparkles}
                                                title="Текстовые эффекты"
                                                onClick={openTextEffectsPicker}
                                                className={`text-blue-400 ${activeTextEffectsPicker ? 'bg-white/20' : ''}`}
                                            />
                                            {activeTextEffectsPicker && (
                                                <TextEffectsPickerPopup
                                                    position={activeTextEffectsPicker.position}
                                                    onSelect={applyTextEffect}
                                                    onClose={() => setActiveTextEffectsPicker(null)}
                                                />
                                            )}
                                        </div>

                                        {/* Functional Color Pickers with Portal */}
                                        <div className="relative">
                                            <ToolBtn
                                                icon={Highlighter}
                                                onClick={(e) => openColorPicker(e, 'highlight')} // Pass event
                                                title="Цвет выделения"
                                                className={`border-b-2 border-yellow-400 rounded-none h-6 ${activeColorPicker?.type === 'highlight' ? 'bg-white/10' : ''}`}
                                            />
                                            {activeColorPicker?.type === 'highlight' && (
                                                <ColorPickerPopup
                                                    position={activeColorPicker.position}
                                                    onSelect={(color) => applyColor('hiliteColor', color)}
                                                    onClose={() => setActiveColorPicker(null)}
                                                />
                                            )}
                                        </div>

                                        <div className="relative">
                                            <ToolBtn
                                                icon={Baseline}
                                                onClick={(e) => openColorPicker(e, 'text')}
                                                title="Цвет текста"
                                                className={`border-b-2 border-red-500 rounded-none h-6 ${activeColorPicker?.type === 'text' ? 'bg-white/10' : ''}`}
                                            />
                                            {activeColorPicker?.type === 'text' && (
                                                <ColorPickerPopup
                                                    position={activeColorPicker.position}
                                                    onSelect={(color) => applyColor('foreColor', color)}
                                                    onClose={() => setActiveColorPicker(null)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ToolbarGroup>

                            <div className="w-px h-16 bg-white/5 my-auto shrink-0"></div>

                            {/* Group 3: Paragraph */}
                            <ToolbarGroup label="Абзац">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-1">
                                        <ToolBtn icon={List} onClick={() => execCmd('insertUnorderedList')} title="Маркированный список" />
                                        <ToolBtn icon={ListOrdered} onClick={() => execCmd('insertOrderedList')} title="Нумерованный список" />
                                        <div className="relative">
                                            <ToolBtn
                                                icon={List} // Can use a more specific icon if available, or keep generic
                                                title="Многоуровневый список"
                                                onClick={openListPicker}
                                                className={activeListPicker ? 'bg-white/20' : ''}
                                            />
                                            {activeListPicker && (
                                                <MultilevelListPickerPopup
                                                    position={activeListPicker.position}
                                                    onSelect={applyListStyle}
                                                    onClose={() => setActiveListPicker(null)}
                                                />
                                            )}
                                        </div>
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <ToolBtn icon={IndentDecrease} onClick={() => execCmd('outdent')} title="Уменьшить отступ" />
                                        <ToolBtn icon={IndentIncrease} onClick={() => execCmd('indent')} title="Увеличить отступ" />
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <ToolBtn icon={ArrowDownAZ} title="Сортировка" />
                                        <div className="relative">
                                            <ToolBtn
                                                icon={ArrowUpDown}
                                                title="Межстрочный интервал"
                                                onClick={openLineSpacingPicker}
                                                className={activeLineSpacingPicker ? 'bg-white/20' : ''}
                                            />
                                            {activeLineSpacingPicker && (
                                                <LineSpacingPickerPopup
                                                    position={activeLineSpacingPicker.position}
                                                    onSelect={applyLineSpacing}
                                                    onClose={() => setActiveLineSpacingPicker(null)}
                                                />
                                            )}
                                        </div>
                                        <ToolBtn
                                            icon={Pilcrow}
                                            title="Отобразить знаки"
                                            onClick={() => setShowInvisibles(!showInvisibles)}
                                            className={showInvisibles ? 'bg-white/20 text-white shadow-inner' : ''}
                                        />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ToolBtn icon={AlignLeft} onClick={() => execCmd('justifyLeft')} title="По левому краю" />
                                        <ToolBtn icon={AlignCenter} onClick={() => execCmd('justifyCenter')} title="По центру" />
                                        <ToolBtn icon={AlignRight} onClick={() => execCmd('justifyRight')} title="По правому краю" />
                                        <ToolBtn icon={AlignJustify} onClick={() => execCmd('justifyFull')} title="По ширине" />
                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                        <ToolBtn icon={ArrowUpDown} title="Интервал" />
                                        <ToolBtn icon={PaintBucket} title="Заливка" />
                                        <div className="relative">
                                            <ToolBtn
                                                icon={Grid}
                                                title="Границы"
                                                onClick={openBordersPicker}
                                                className={activeBordersPicker ? 'bg-white/20' : ''}
                                            />
                                            {activeBordersPicker && (
                                                <BordersPickerPopup
                                                    position={activeBordersPicker.position}
                                                    onSelect={applyBorder}
                                                    onClose={() => setActiveBordersPicker(null)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ToolbarGroup>

                            <div className="w-px h-16 bg-white/5 my-auto shrink-0"></div>

                            {/* Group 4: Insert (Functional) */}
                            <ToolbarGroup label="Вставка">
                                <div className="flex gap-2 h-full items-center px-1">
                                    <button
                                        onClick={handleInsertLink}
                                        className="flex flex-col items-center justify-center px-3 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full"
                                        title="Ссылка"
                                    >
                                        <Link size={18} className="mb-0.5 group-active:scale-95 transition-transform" />
                                        <span className="text-[10px] font-medium leading-none">Ссылка</span>
                                    </button>
                                    <div className="w-px h-6 bg-white/5 my-auto"></div>
                                    <button
                                        onClick={() => imageInputRef.current?.click()}
                                        className="flex flex-col items-center justify-center px-3 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full"
                                        title="Изображение"
                                    >
                                        <ImageIcon size={18} className="mb-0.5 group-active:scale-95 transition-transform" />
                                        <span className="text-[10px] font-medium leading-none">Фото</span>
                                    </button>
                                    <div className="w-px h-6 bg-white/5 my-auto"></div>
                                    <div className="relative h-full">
                                        <button
                                            onClick={handleInsertTable}
                                            className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full ${activeTablePicker ? 'bg-white/10' : ''}`}
                                            title="Таблица"
                                        >
                                            <Grid size={18} className="mb-0.5 group-active:scale-95 transition-transform" />
                                            <span className="text-[10px] font-medium leading-none">Таблица</span>
                                        </button>
                                        {activeTablePicker && (
                                            <TablePickerPopup
                                                position={activeTablePicker.position}
                                                onSelect={applyTable}
                                                onClose={() => setActiveTablePicker(null)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </ToolbarGroup>

                            <div className="w-px h-16 bg-white/5 my-auto shrink-0"></div>

                            {/* Group 5: Layout */}
                            <ToolbarGroup label="Макет">
                                <div className="flex items-center gap-1 h-full px-1">
                                    <div className="relative h-full">
                                        <button
                                            onClick={(e) => openLayoutPicker(e, 'margins')}
                                            className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full w-16 ${activeLayoutPicker?.type === 'margins' ? 'bg-white/10 text-white' : ''}`}
                                            title="Поля"
                                        >
                                            <LayoutTemplate size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                            <span className="text-[10px] font-medium leading-none">Поля</span>
                                        </button>
                                        {activeLayoutPicker?.type === 'margins' && (
                                            <MarginPickerPopup
                                                position={activeLayoutPicker.position}
                                                current={pageSettings.margins}
                                                onSelect={setMargins}
                                                onClose={() => setActiveLayoutPicker(null)}
                                            />
                                        )}
                                    </div>

                                    <div className="relative h-full">
                                        <button
                                            onClick={() => setOrientation(pageSettings.orientation === 'portrait' ? 'landscape' : 'portrait')}
                                            className="flex flex-col items-center justify-center px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full w-20"
                                            title="Ориентация"
                                        >
                                            {pageSettings.orientation === 'portrait' ?
                                                <RectangleVertical size={20} className="mb-1 group-active:scale-95 transition-transform" /> :
                                                <RectangleHorizontal size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                            }
                                            <span className="text-[10px] font-medium leading-none">Ориентация</span>
                                        </button>
                                    </div>

                                    <div className="relative h-full">
                                        <button
                                            onClick={(e) => openLayoutPicker(e, 'size')}
                                            className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full w-16 ${activeLayoutPicker?.type === 'size' ? 'bg-white/10 text-white' : ''}`}
                                            title="Размер"
                                        >
                                            <FileIcon size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                            <span className="text-[10px] font-medium leading-none">Размер</span>
                                        </button>
                                        {activeLayoutPicker?.type === 'size' && (
                                            <SizePickerPopup
                                                position={activeLayoutPicker.position}
                                                current={pageSettings.size}
                                                onSelect={setSize}
                                                onClose={() => setActiveLayoutPicker(null)}
                                            />
                                        )}
                                    </div>

                                    <div className="relative h-full">
                                        <button
                                            onClick={(e) => openLayoutPicker(e, 'columns')}
                                            className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full w-16 ${activeLayoutPicker?.type === 'columns' ? 'bg-white/10 text-white' : ''}`}
                                            title="Колонки"
                                        >
                                            <ColumnsIcon size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                            <span className="text-[10px] font-medium leading-none">Колонки</span>
                                        </button>
                                        {activeLayoutPicker?.type === 'columns' && (
                                            <ColumnsPickerPopup
                                                position={activeLayoutPicker.position}
                                                current={pageSettings.columns}
                                                onSelect={setColumns}
                                                onClose={() => setActiveLayoutPicker(null)}
                                            />
                                        )}
                                    </div>

                                    <div className="relative h-full">
                                        <button
                                            onClick={() => execCmd('insertHTML', '<div style="page-break-after: always; height: 1px; border-bottom: 2px dashed #94a3b8; margin: 2rem 0;" title="Разрыв страницы"></div>')}
                                            className="flex flex-col items-center justify-center px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group h-full w-16"
                                            title="Разрывы"
                                        >
                                            <ScissorsIcon size={20} className="mb-1 group-active:scale-95 transition-transform" />
                                            <span className="text-[10px] font-medium leading-none">Разрывы</span>
                                        </button>
                                    </div>

                                    <div className="w-px h-12 bg-white/5 my-auto mx-1"></div>

                                    {/* Indents & Spacing Inputs */}
                                    <div className="flex flex-col gap-1.5 justify-center h-full text-[10px] opacity-80">
                                        <div className="flex items-center gap-2">
                                            <span className="w-10 text-right text-slate-500">Отступ</span>
                                            <div className="flex items-center gap-1 bg-[#0F172A] border border-white/5 rounded px-1 py-0.5" title="Слева">
                                                <ArrowLeftToLine size={10} className="text-slate-400" />
                                                <input
                                                    type="number"
                                                    className="w-6 bg-transparent text-right outline-none text-xs"
                                                    value={pageSettings.indents.left}
                                                    onChange={(e) => setPageSettings(prev => ({ ...prev, indents: { ...prev.indents, left: parseFloat(e.target.value) || 0 } }))}
                                                />
                                                <span className="text-[9px] text-slate-500">см</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-[#0F172A] border border-white/5 rounded px-1 py-0.5" title="Справа">
                                                <ArrowRightToLine size={10} className="text-slate-400" />
                                                <input
                                                    type="number"
                                                    className="w-6 bg-transparent text-right outline-none text-xs"
                                                    value={pageSettings.indents.right}
                                                    onChange={(e) => setPageSettings(prev => ({ ...prev, indents: { ...prev.indents, right: parseFloat(e.target.value) || 0 } }))}
                                                />
                                                <span className="text-[9px] text-slate-500">см</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-10 text-right text-slate-500">Интерв.</span>
                                            <div className="flex items-center gap-1 bg-[#0F172A] border border-white/5 rounded px-1 py-0.5" title="Перед">
                                                <MoveVertical size={10} className="text-slate-400" />
                                                <input
                                                    type="number"
                                                    className="w-6 bg-transparent text-right outline-none text-xs"
                                                    value={pageSettings.spacing.before}
                                                    onChange={(e) => setPageSettings(prev => ({ ...prev, spacing: { ...prev.spacing, before: parseFloat(e.target.value) || 0 } }))}
                                                />
                                                <span className="text-[9px] text-slate-500">пт</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-[#0F172A] border border-white/5 rounded px-1 py-0.5" title="После">
                                                <MoveVertical size={10} className="text-slate-400 rotate-180" />
                                                <input
                                                    type="number"
                                                    className="w-6 bg-transparent text-right outline-none text-xs"
                                                    value={pageSettings.spacing.after}
                                                    onChange={(e) => setPageSettings(prev => ({ ...prev, spacing: { ...prev.spacing, after: parseFloat(e.target.value) || 0 } }))}
                                                />
                                                <span className="text-[9px] text-slate-500">пт</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </ToolbarGroup>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Paper View Container */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto w-full bg-slate-100 relative custom-scrollbar flex justify-center py-8" onClick={() => {
                // Setup click outside logic if needed
            }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                {/* A4 Paper */}
                <div
                    ref={contentRef}
                    contentEditable={isManualMode}
                    suppressContentEditableWarning={true}
                    onMouseUp={handleMouseUp}
                    onClick={handleEditorClick}
                    className={`
                        bg-white text-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] leading-relaxed relative transition-all duration-300 z-10 document-page
                        ${isManualMode ? 'outline-none ring-1 ring-[#06B6D4]/50 cursor-text' : 'cursor-default'}
                        selection:bg-[#06B6D4]/30 selection:text-slate-900 font-serif
                    `}
                    style={getPageStyle()}
                >
                    {/* Default Mock Content */}
                    <div className="text-center font-bold mb-8 uppercase tracking-wider text-[16pt]">Договор оказания услуг</div>

                    <div className="flex justify-between mb-8 text-[14pt]">
                        <span>г. Москва</span>
                        <span>«29» января 2026 г.</span>
                    </div>

                    <p className="mb-6 text-justify indent-8">
                        Общество с ограниченной ответственностью <strong>«Вектор»</strong>, именуемое в дальнейшем «Заказчик», в лице Генерального директора Иванова И.И., действующего на основании Устава, с одной стороны, и
                    </p>
                    <p className="mb-6 text-justify indent-8">
                        Индивидуальный предприниматель <strong>Петров П.П.</strong>, именуемый в дальнейшем «Исполнитель», действующий на основании Свидетельства о регистрации, с другой стороны, заключили настоящий Договор о нижеследующем:
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">1. Предмет договора</h3>
                    <p className="mb-4 text-justify indent-8">
                        1.1. Исполнитель обязуется по заданию Заказчика оказать услуги по <span className="text-blue-900 bg-blue-50 px-1 rounded">юридическому сопровождению сделки</span>, а Заказчик обязуется оплатить эти услуги.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        1.2. Срок оказания услуг: с момента подписания до <strong>28 февраля 2026 г.</strong>
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">2. Стоимость услуг</h3>
                    <p className="mb-4 text-justify indent-8">
                        2.1. Стоимость услуг составляет <strong>150 000 (Сто пятьдесят тысяч)</strong> рублей, НДС не облагается.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        2.2. Оплата производится в течение 3 (трех) банковских дней с момента подписания Акта.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">3. Ответственность</h3>
                    <p className="mb-4 text-justify indent-8">
                        3.1. За нарушение сроков оплаты Заказчик уплачивает пени в размере 0.1% от суммы за каждый день просрочки.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">4. Права и обязанности сторон</h3>
                    <p className="mb-4 text-justify indent-8">
                        4.1. Заказчик обязан предоставить Исполнителю всю необходимую документацию и информацию для выполнения услуг в течение 2 (двух) рабочих дней с момента подписания настоящего Договора.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        4.2. Исполнитель обязуется оказывать услуги качественно, в установленные сроки, с соблюдением требований действующего законодательства Российской Федерации.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        4.3. Заказчик имеет право требовать от Исполнителя предоставления отчетов о ходе выполнения работ не чаще одного раза в неделю.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        4.4. Исполнитель имеет право привлекать третьих лиц для оказания услуг по настоящему Договору, оставаясь ответственным перед Заказчиком за их действия.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">5. Порядок сдачи и приемки работ</h3>
                    <p className="mb-4 text-justify indent-8">
                        5.1. По завершении оказания услуг Исполнитель направляет Заказчику Акт выполненных работ в течение 3 (трех) рабочих дней.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        5.2. Заказчик обязан рассмотреть Акт и направить мотивированный отказ либо подписанный Акт в течение 5 (пяти) рабочих дней с момента получения.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        5.3. В случае непредставления мотивированного отказа в указанный срок, услуги считаются принятыми Заказчиком в полном объеме без замечаний.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">6. Конфиденциальность</h3>
                    <p className="mb-4 text-justify indent-8">
                        6.1. Стороны обязуются сохранять конфиденциальность информации, полученной в ходе исполнения настоящего Договора, и не разглашать ее третьим лицам без письменного согласия другой Стороны.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        6.2. Обязательство по сохранению конфиденциальности действует в течение 3 (трех) лет с момента прекращения действия настоящего Договора.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">7. Форс-мажор</h3>
                    <p className="mb-4 text-justify indent-8">
                        7.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по настоящему Договору, если это неисполнение явилось следствием обстоятельств непреодолимой силы (форс-мажор).
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        7.2. К обстоятельствам непреодолимой силы относятся: стихийные бедствия, военные действия, акты государственных органов, забастовки и иные обстоятельства, находящиеся вне контроля Сторон.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">8. Разрешение споров</h3>
                    <p className="mb-4 text-justify indent-8">
                        8.1. Все споры и разногласия, возникающие из настоящего Договора или в связи с ним, разрешаются путем переговоров между Сторонами.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        8.2. В случае невозможности разрешения споров путем переговоров, они подлежат рассмотрению в Арбитражном суде города Москвы в соответствии с действующим законодательством Российской Федерации.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">9. Срок действия и порядок расторжения договора</h3>
                    <p className="mb-4 text-justify indent-8">
                        9.1. Настоящий Договор вступает в силу с момента его подписания Сторонами и действует до полного исполнения Сторонами своих обязательств.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        9.2. Договор может быть расторгнут по соглашению Сторон, а также в одностороннем порядке в случаях, предусмотренных действующим законодательством.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        9.3. При досрочном расторжении Договора по инициативе Заказчика, Заказчик обязан оплатить фактически оказанные услуги в полном объеме.
                    </p>

                    <h3 className="font-bold mt-8 mb-4 text-[16pt]">10. Заключительные положения</h3>
                    <p className="mb-4 text-justify indent-8">
                        10.1. Настоящий Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному для каждой из Сторон.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        10.2. Все изменения и дополнения к настоящему Договору действительны только в случае, если они совершены в письменной форме и подписаны уполномоченными представителями Сторон.
                    </p>
                    <p className="mb-4 text-justify indent-8">
                        10.3. Во всем остальном, что не предусмотрено настоящим Договором, Стороны руководствуются действующим законодательством Российской Федерации.
                    </p>

                    <h3 className="font-bold mt-12 mb-6 text-[16pt]">11. Реквизиты и подписи сторон</h3>

                    <div className="grid grid-cols-2 gap-8 mt-8">
                        <div>
                            <p className="font-bold mb-2">ЗАКАЗЧИК:</p>
                            <p className="mb-1">ООО «Вектор»</p>
                            <p className="mb-1 text-sm">ИНН: 7701234567</p>
                            <p className="mb-1 text-sm">КПП: 770101001</p>
                            <p className="mb-1 text-sm">ОГРН: 1027700123456</p>
                            <p className="mb-1 text-sm">Адрес: 123456, г. Москва, ул. Примерная, д. 1</p>
                            <p className="mb-1 text-sm">Р/с: 40702810100000000001</p>
                            <p className="mb-1 text-sm">Банк: ПАО «Сбербанк»</p>
                            <p className="mb-1 text-sm">БИК: 044525225</p>
                            <p className="mb-1 text-sm">К/с: 30101810400000000225</p>
                            <div className="mt-8 border-b border-slate-400 w-48"></div>
                            <p className="text-sm mt-1">Генеральный директор Иванов И.И.</p>
                        </div>
                        <div>
                            <p className="font-bold mb-2">ИСПОЛНИТЕЛЬ:</p>
                            <p className="mb-1">ИП Петров Петр Петрович</p>
                            <p className="mb-1 text-sm">ИНН: 770123456789</p>
                            <p className="mb-1 text-sm">ОГРНИП: 304770000123456</p>
                            <p className="mb-1 text-sm">Адрес: 123456, г. Москва, ул. Образцовая, д. 2</p>
                            <p className="mb-1 text-sm">Р/с: 40802810200000000002</p>
                            <p className="mb-1 text-sm">Банк: ПАО «Сбербанк»</p>
                            <p className="mb-1 text-sm">БИК: 044525225</p>
                            <p className="mb-1 text-sm">К/с: 30101810400000000225</p>
                            <div className="mt-8 border-b border-slate-400 w-48"></div>
                            <p className="text-sm mt-1">ИП Петров П.П.</p>
                        </div>
                    </div>

                    {/* Pagination Mock */}
                    <div className="absolute bottom-8 right-8 text-xs text-slate-400 font-mono">Стр. 1 из 3</div>
                </div>
            </div>
            {/* Image Control Overlay */}
            {activeImage && (
                <ImageControlOverlay imageRef={activeImage} onClose={() => setActiveImage(null)} scrollContainerRef={scrollContainerRef} />
            )}
        </div>
    );
};

// --- Main Component ---
const CabinetConstructor = () => {
    const [isManualMode, setIsManualMode] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isThinking, setIsThinking] = useState(false);

    // For Selection Magic
    const [selectedText, setSelectedText] = useState('');
    const [selectionRange, setSelectionRange] = useState(null);
    const [selectionRect, setSelectionRect] = useState(null);
    const contentRef = useRef(null);

    const handleTextSelection = (text, rect, range) => {
        setSelectedText(text);
        setSelectionRect(rect);
        setSelectionRange(range);
    };

    const handleSendMessage = (text) => {
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsThinking(true);

        // Mock AI Response
        setTimeout(() => {
            setIsThinking(false);
            setMessages(prev => [...prev, {
                role: 'ai',
                content: 'Я могу переформулировать этот фрагмент. Вот более формальный вариант:',
                suggestion: 'В соответствии с условиями настоящего Договора, Исполнитель обязуется оказать Заказчику весь спектр консалтинговых услуг.'
            }]);
        }, 1500);
    };

    // AI Context actions from Floating Menu
    const handleAIAction = (action) => {
        setIsThinking(true);
        const textPreview = selectedText.length > 30 ? selectedText.substring(0, 30) + '...' : selectedText;
        setMessages(prev => [...prev, { role: 'user', content: `${action}: "${textPreview}"` }]);

        setSelectionRect(null); // Hide menu

        setTimeout(() => {
            setIsThinking(false);
            let suggestion = '';
            if (action === 'Улучшить') suggestion = "Исполнитель берет на себя обязательство оказать всестороннюю юридическую поддержку...";
            if (action === 'Переписать') suggestion = "Исполнитель обязуется выполнить поручение Заказчика по правовому сопровождению.";
            if (action === 'Сократить') suggestion = "Исполнитель оказывает юр. услуги по заданию Заказчика.";

            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Готово! Вот вариант (${action.toLowerCase()}):`,
                suggestion: suggestion
            }]);
        }, 1200);
    };

    const handleAcceptSuggestion = (text) => {
        if (selectionRange) {
            selectionRange.deleteContents();
            selectionRange.insertNode(document.createTextNode(text));
            setSelectionRange(null);
            setSelectedText('');
            // Optional: normalize text nodes
        }
    };

    const handleRejectSuggestion = () => {
        // Logic to remove suggestion or clear state
    };

    return (
        <div className="h-[calc(100vh-100px)] -m-6 flex bg-[#0F172A] relative overflow-hidden">

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10">
                {/* Top Bar */}
                <div className="h-16 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-6 z-30 shrink-0">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/20 shrink-0">
                            <FileText size={20} className="text-[#06B6D4]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h2 className="text-white font-bold text-base truncate pr-4">Договор оказания услуг (Юр. лица)</h2>
                            <span className="text-xs text-slate-500">Последнее сохранение: 14:32</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        {/* Toggle Mode - Premium Segmented Control */}
                        <div className="bg-[#0F172A] p-1 rounded-xl flex items-center border border-white/10 shadow-inner relative">
                            {/* Animated background could be added here with LayoutGroup from framer-motion if desired, but CSS simple version for now */}
                            <button
                                onClick={() => setIsManualMode(false)}
                                className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 z-10 ${!isManualMode ? 'bg-gradient-to-r from-[#06B6D4] to-blue-500 text-white shadow-[0_2px_10px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Bot size={14} className={!isManualMode ? 'animate-pulse' : ''} />
                                Генератор
                            </button>
                            <button
                                onClick={() => setIsManualMode(true)}
                                className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 z-10 ${isManualMode ? 'bg-gradient-to-r from-[#06B6D4] to-blue-500 text-white shadow-[0_2px_10px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <PenTool size={14} />
                                Редактор
                            </button>
                        </div>

                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] hover:bg-[#334155] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                <Save size={16} />
                                Сохранить
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white text-xs font-bold rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 border border-emerald-400/20">
                                <Download size={16} />
                                Скачать PDF
                            </button>
                        </div>
                    </div>
                </div>

                <DocumentEditor
                    isManualMode={isManualMode}
                    contentRef={contentRef}
                    onTextSelection={handleTextSelection}
                />

                {/* Floating AI Menu */}
                <AnimatePresence>
                    {isManualMode && selectionRect && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                position: 'fixed',
                                top: selectionRect.top - 60,
                                left: selectionRect.left + (selectionRect.width / 2) - 160
                            }}
                            className="z-[100] bg-[#0F172A]/90 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-1.5 flex gap-1 backdrop-blur-xl ring-1 ring-white/5"
                        >
                            <AIFloatBtn icon={Sparkles} label="Улучшить" onClick={() => handleAIAction('Улучшить')} color="text-[#06B6D4] bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20" />
                            <AIFloatBtn icon={RefreshCw} label="Переписать" onClick={() => handleAIAction('Переписать')} />
                            <AIFloatBtn icon={MessageSquare} label="Сократить" onClick={() => handleAIAction('Сократить')} />
                            <div className="w-px bg-white/10 h-6 my-auto mx-1"></div>
                            <button onClick={() => setSelectionRect(null)} className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right Panel */}
            <AssistantPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isThinking={isThinking}
                onAcceptSuggestion={handleAcceptSuggestion}
                onRejectSuggestion={handleRejectSuggestion}
            />
        </div>
    );
};



export default CabinetConstructor;
