import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Check, CheckCheck, Loader2, ArrowLeft, MoreVertical, Trash2, VolumeX, Volume2, Info, X, FileText, Image, File } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useChat from '../hooks/useChat.jsx';

// Message Bubble Component
const MessageBubble = ({ message, isOwn }) => {
    const time = message.createdAt
        ? new Date(message.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        : '';

    if (message.type === 'SYSTEM') {
        return (
            <div className="flex justify-center my-6">
                <span className="text-xs text-slate-500/80 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                    {message.content}
                </span>
            </div>
        );
    }

    // Check if message is a file (starts with 📎)
    const isFileMessage = message.content.startsWith('📎');
    const fileName = isFileMessage ? message.content.replace('📎 ', '').trim() : '';

    // Get file extension and icon
    const getFileInfo = (name) => {
        const ext = name.split('.').pop()?.toLowerCase() || '';
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            return { icon: <Image size={24} className={isOwn ? 'text-white' : 'text-green-500'} />, type: 'Изображение', color: 'green' };
        }
        if (ext === 'pdf') {
            return { icon: <FileText size={24} className={isOwn ? 'text-white' : 'text-red-500'} />, type: 'PDF документ', color: 'red' };
        }
        if (['doc', 'docx'].includes(ext)) {
            return { icon: <FileText size={24} className={isOwn ? 'text-white' : 'text-blue-500'} />, type: 'Word документ', color: 'blue' };
        }
        if (['xls', 'xlsx'].includes(ext)) {
            return { icon: <FileText size={24} className={isOwn ? 'text-white' : 'text-green-600'} />, type: 'Excel таблица', color: 'green' };
        }
        return { icon: <File size={24} className={isOwn ? 'text-white' : 'text-slate-500'} />, type: 'Файл', color: 'slate' };
    };

    const fileInfo = isFileMessage ? getFileInfo(fileName) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}
        >
            <div
                className={`relative max-w-[85%] min-w-[100px] px-4 py-2.5 ${isOwn
                    ? 'message-bubble-own'
                    : 'message-bubble-other'
                    }`}
            >
                {isFileMessage ? (
                    <div className={`flex items-center gap-3 ${isOwn ? '' : 'pr-2'}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isOwn ? 'bg-white/20' : `bg-${fileInfo?.color}-100`
                            }`}>
                            {fileInfo?.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isOwn ? 'text-white' : 'text-slate-800'}`}>
                                {fileName}
                            </p>
                            <p className={`text-xs ${isOwn ? 'text-white/70' : 'text-slate-500'}`}>
                                {fileInfo?.type}
                            </p>
                        </div>
                        <button
                            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isOwn
                                ? 'hover:bg-white/20 text-white'
                                : 'hover:bg-slate-100 text-slate-600'
                                }`}
                            title="Скачать файл"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <p className="text-[15px] leading-[1.45] whitespace-pre-wrap break-words">{message.content}</p>
                )}

                <div className={`flex items-center justify-end gap-1 mt-1 ${isOwn ? 'text-white/70' : 'text-slate-400'
                    }`}>
                    <span className="text-[11px] font-light">{time}</span>
                    {isOwn && (
                        message.isRead
                            ? <CheckCheck size={14} strokeWidth={2.5} />
                            : <Check size={14} strokeWidth={2.5} />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// Typing indicator
const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex justify-start mb-3"
    >
        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] rounded-bl-[6px] shadow-lg shadow-slate-200/50 border border-white/50 px-5 py-4">
            <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
            </div>
        </div>
    </motion.div>
);

// Chat Sidebar list component
const ChatListSidebar = ({ chats, activeId, onSelect }) => {
    return (
        <motion.div
            initial={{ width: 76 }}
            whileHover={{ width: 340 }}
            className="flex-shrink-0 bg-white/80 backdrop-blur-xl border border-glass-border rounded-2xl overflow-hidden shadow-xl z-30 transition-all duration-300 hidden md:flex flex-col h-full"
            style={{ width: 76 }}
        >
            <div className="p-4 flex items-center gap-4 border-b border-slate-100 min-w-[340px]">
                <div className="w-10 h-10 rounded-full bg-depa-bg flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-depa-cta" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Диалоги</h3>
            </div>

            <div className="flex-1 overflow-y-auto min-w-[340px]">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => onSelect(chat.id)}
                        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${activeId === chat.id ? 'bg-blue-50/50' : ''}`}
                    >
                        <div className="relative flex-shrink-0">
                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                            {chat.status === 'online' && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-semibold text-slate-900 truncate">{chat.name}</h4>
                                <span className="text-xs text-slate-400">{chat.time}</span>
                            </div>
                            <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                                {chat.unread}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const ChatPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        isConnected,
        isConnecting,
        messages,
        lawyer,
        isTyping,
        sendMessage,
        sendTyping,
        error
    } = useChat(user?.id);

    const [newMessage, setNewMessage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showLawyerInfo, setShowLawyerInfo] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isConnected) inputRef.current?.focus();
    }, [isConnected]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        const userName = user?.first_name || 'Клиент';
        sendTyping(true, userName);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => sendTyping(false, userName), 2000);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && selectedFiles.length === 0) || !isConnected) return;
        const userName = user?.first_name || 'Клиент';

        // Send text message
        if (newMessage.trim()) {
            sendMessage(newMessage.trim(), userName);
        }

        // TODO: Send files to backend when file upload API is ready
        if (selectedFiles.length > 0) {
            // For now, just send file names as text
            selectedFiles.forEach(file => {
                sendMessage(`📎 ${file.name}`, userName);
            });
            setSelectedFiles([]);
        }

        setNewMessage('');
        sendTyping(false, userName);
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
        }
        e.target.value = ''; // Reset input
    };

    // Remove file from selection
    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Get file icon based on type
    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) return <Image size={16} className="text-green-500" />;
        if (file.type.includes('pdf')) return <FileText size={16} className="text-red-500" />;
        return <File size={16} className="text-blue-500" />;
    };

    const lawyerInfo = lawyer || {
        name: 'Юрист Depa',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
    };

    // Mock chat list data
    const mockChats = [
        {
            id: 1,
            name: lawyer?.name || 'Юрист Depa',
            avatar: lawyer?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
            lastMessage: messages.length > 0 ? messages[messages.length - 1].content : 'Начните диалог...',
            time: '12:30',
            unread: 0,
            status: isConnected ? 'online' : 'offline'
        },
        {
            id: 2,
            name: 'Поддержка',
            avatar: 'https://ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff',
            lastMessage: 'Ваш вопрос передан специалисту',
            time: 'Вчера',
            unread: 2,
            status: 'online'
        }
    ];

    const [activeChatId, setActiveChatId] = useState(1);

    return (
        <div className="flex h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] gap-4">
            {/* Left Sidebar */}
            <ChatListSidebar
                chats={mockChats}
                activeId={activeChatId}
                onSelect={setActiveChatId}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-200/50 shadow-xl bg-white/50 backdrop-blur-sm min-w-0">
                {/* Header */}
                <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl px-4 py-3 border-b border-slate-100 flex items-center gap-3 relative z-20">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-all lg:hidden"
                    >
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>

                    <div className="relative flex-shrink-0">
                        <img
                            src={lawyerInfo.avatar}
                            alt={lawyerInfo.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
                        />
                        {isConnected && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-slate-800 text-sm truncate">{lawyerInfo.name}</h2>
                        <p className="text-xs text-slate-500">
                            {isConnecting ? 'подключение...' : isConnected ? 'онлайн' : 'не в сети'}
                        </p>
                    </div>

                    {/* Menu Button with Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-all flex-shrink-0"
                        >
                            <MoreVertical size={18} className="text-slate-500" />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -8 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8
                                    }}
                                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200/50 py-2 z-50 overflow-hidden"
                                >
                                    <button
                                        onClick={() => {
                                            setIsMuted(!isMuted);
                                            setMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        {isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                        {isMuted ? 'Включить звук' : 'Выключить звук'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            // TODO: Clear chat functionality
                                            setMenuOpen(false);
                                            alert('Функция очистки чата будет добавлена');
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Очистить чат
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowLawyerInfo(true);
                                            setMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        <Info size={16} />
                                        О юристе
                                    </button>
                                    <div className="border-t border-slate-100 mt-1 pt-1">
                                        <button
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-50 transition-colors"
                                        >
                                            <X size={16} />
                                            Закрыть
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Messages */}
                <div
                    className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 min-h-0"
                    style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}
                >
                    {isConnecting && messages.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-lg">
                                <Loader2 size={28} className="animate-spin text-blue-500 mx-auto mb-2" />
                                <p className="text-sm text-slate-600">Подключение...</p>
                            </div>
                        </div>
                    )}

                    {!isConnecting && isConnected && messages.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg max-w-xs">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                                    <Send size={24} className="text-white" />
                                </div>
                                <h3 className="font-semibold text-slate-800 mb-1">Начните диалог</h3>
                                <p className="text-sm text-slate-500">Напишите вопрос — юрист ответит</p>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isOwn={msg.senderRole === 'CLIENT'}
                            />
                        ))}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isTyping && <TypingIndicator />}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                </div>

                {/* Error */}
                {error && (
                    <div className="flex-shrink-0 px-4 py-2 bg-red-50 border-t border-red-100 text-red-600 text-xs text-center">
                        {error}
                    </div>
                )}

                {/* Input */}
                <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl px-4 py-3 border-t border-slate-100">
                    {/* File Preview */}
                    <AnimatePresence>
                        {selectedFiles.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-wrap gap-2 mb-3"
                            >
                                {selectedFiles.map((file, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 pr-2"
                                    >
                                        {getFileIcon(file)}
                                        <span className="text-xs text-slate-700 max-w-[150px] truncate">
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                                        >
                                            <X size={14} className="text-slate-400" />
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSend} className="flex items-center gap-2">
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${selectedFiles.length > 0
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-slate-100 text-slate-400'
                                }`}
                        >
                            <Paperclip size={20} />
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            value={newMessage}
                            onChange={handleInputChange}
                            placeholder={isConnected ? "Сообщение..." : "Подключение..."}
                            disabled={!isConnected}
                            className="flex-1 min-w-0 py-2.5 px-4 bg-slate-100 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white disabled:opacity-50 transition-all border border-transparent focus:border-blue-200"
                        />

                        <motion.button
                            type="submit"
                            disabled={!isConnected || (!newMessage.trim() && selectedFiles.length === 0)}
                            whileTap={{ scale: 0.92 }}
                            className={`p-2.5 rounded-full transition-all flex-shrink-0 ${(newMessage.trim() || selectedFiles.length > 0) && isConnected
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-slate-100 text-slate-400'
                                }`}
                        >
                            <Send size={18} />
                        </motion.button>
                    </form>
                </div>

                {/* Lawyer Info Modal */}
                <AnimatePresence>
                    {showLawyerInfo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowLawyerInfo(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-center">
                                    <img
                                        src={lawyerInfo.avatar}
                                        alt={lawyerInfo.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100"
                                    />
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{lawyerInfo.name}</h3>
                                    <p className="text-sm text-blue-600 mb-4">Корпоративный юрист</p>

                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-xl font-bold text-slate-900">5+</p>
                                            <p className="text-xs text-slate-500">лет опыта</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-xl font-bold text-slate-900">120+</p>
                                            <p className="text-xs text-slate-500">дел</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3">
                                            <p className="text-xl font-bold text-slate-900">4.9</p>
                                            <p className="text-xs text-slate-500">рейтинг</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-6">
                                        Специализируется на корпоративном праве, регистрации ООО, договорной работе и судебных спорах.
                                    </p>

                                    <button
                                        onClick={() => setShowLawyerInfo(false)}
                                        className="w-full py-3 bg-depa-cta text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChatPage;
