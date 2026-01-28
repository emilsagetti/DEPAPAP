import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Paperclip, MoreVertical, Search, CheckCheck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ChatService from '../../api/chat.service';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';

const CabinetChats = () => {
    const { user } = useAuth();
    const [threads, setThreads] = useState([]);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoadingThreads, setIsLoadingThreads] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch Threads
    useEffect(() => {
        const fetchThreads = async () => {
            setIsLoadingThreads(true);
            try {
                const data = await ChatService.getThreads();
                setThreads(data.results || data);
                if (data.length > 0 && !selectedThreadId) {
                    // Optionally auto-select first thread but maybe better to let user choose
                    // setSelectedThreadId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch threads", error);
            } finally {
                setIsLoadingThreads(false);
            }
        };

        if (user) {
            fetchThreads();
        }
    }, [user]);

    // Fetch Messages when thread selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedThreadId) return;
            setIsLoadingMessages(true);
            try {
                // We might need to handle pagination here, but for now fetch all
                const data = await ChatService.getMessages(selectedThreadId);
                // Reverse if backend sends newest first, verify backend order
                // Typically messaging requires oldest first at top
                setMessages(data.results || data);
                scrollToBottom();
            } catch (error) {
                console.error("Failed to fetch messages", error);
            } finally {
                setIsLoadingMessages(false);
            }
        };

        fetchMessages();
        // Polling interval could be set here
        const interval = setInterval(fetchMessages, 10000); // 10s poll
        return () => clearInterval(interval);

    }, [selectedThreadId]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !selectedThreadId) return;

        try {
            const newMessage = await ChatService.sendMessage(selectedThreadId, messageInput);
            setMessages(prev => [...prev, newMessage]);
            setMessageInput('');
            scrollToBottom();

            // Update last message in thread list
            setThreads(prev => prev.map(t =>
                t.id === selectedThreadId
                    ? { ...t, last_message_at: new Date().toISOString() } // Simplified update
                    : t
            ));

        } catch (error) {
            console.error("Failed to send message", error);
            alert("Не удалось отправить сообщение");
        }
    };

    const selectedThread = threads.find(t => t.id === selectedThreadId);

    return (
        <div className="h-[calc(100vh-140px)] glass-card rounded-[32px] overflow-hidden flex relative z-10 animate-fade-in group border border-white/5">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 via-transparent to-blue-600/5 pointer-events-none"></div>

            {/* Chat List Sidebar */}
            <div className={`w-full md:w-80 border-r border-white/5 bg-[#050B14]/60 backdrop-blur-xl flex flex-col relative z-20 transition-all duration-300 ${selectedThreadId ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-5 border-b border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white tracking-tight text-lg">Обращения</h3>
                        <span className="bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/5">{threads.length}</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {isLoadingThreads ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-3">
                            <div className="w-6 h-6 border-2 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
                            <span className="text-white/30 text-sm">Загрузка...</span>
                        </div>
                    ) : (
                        threads.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedThreadId(chat.id)}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 relative group/item overflow-hidden ${selectedThreadId === chat.id
                                    ? 'bg-[#06B6D4]/10 border border-[#06B6D4]/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                    : 'border border-transparent hover:bg-white/5'
                                    }`}
                            >
                                {selectedThreadId === chat.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#06B6D4]"></div>
                                )}
                                <div className="flex justify-between items-start mb-1.5 pl-2">
                                    <h4 className={`font-bold text-sm line-clamp-1 transition-colors ${selectedThreadId === chat.id ? 'text-white' : 'text-white/70 group-hover/item:text-white'}`}>
                                        {chat.subject}
                                    </h4>
                                    <span className="text-[10px] text-white/30 whitespace-nowrap ml-2 bg-white/5 px-1.5 py-0.5 rounded">
                                        {new Date(chat.last_message_at || chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pl-2 mt-2">
                                    <StatusBadge status={chat.status} className="scale-90 origin-left" />
                                    {chat.unread_count > 0 && (
                                        <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#06B6D4] flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.4)] animate-pulse-slow">
                                            {chat.unread_count}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-white/5 bg-[#050B14]/40 backdrop-blur-md">
                    <button className="w-full py-3.5 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white rounded-xl font-bold hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 group">
                        <MessageSquare size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        Новое обращение
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            {selectedThread ? (
                <div className={`flex-1 flex flex-col bg-transparent relative z-10 ${!selectedThreadId ? 'hidden md:flex' : 'flex'}`}>
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#050B14]/40 backdrop-blur-md sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedThreadId(null)}
                                className="md:hidden p-2 -ml-2 text-white/60 hover:text-white bg-white/5 rounded-lg"
                            >
                                <div className="rotate-180">➜</div>
                            </button>
                            <div>
                                <h3 className="font-bold text-white text-lg leading-tight mb-0.5">{selectedThread.subject}</h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-xs text-white/40 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                        #{selectedThread.id.toString().padStart(6, '0')}
                                    </p>
                                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                    <StatusBadge status={selectedThread.status} className="scale-90 origin-left" />
                                </div>
                            </div>
                        </div>
                        <button className="p-2.5 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                            <MoreVertical size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative custom-scrollbar scroll-smooth">
                        {isLoadingMessages ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-3">
                                    <div className="w-8 h-8 border-2 border-white/10 border-t-[#06B6D4] rounded-full animate-spin mx-auto"></div>
                                    <div className="text-white/30 text-sm">Загрузка переписки...</div>
                                </div>
                            </div>
                        ) : messages.length > 0 ? (
                            messages.map((msg, index) => {
                                const isUser = msg.author === user?.id || msg.is_owner;
                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] md:max-w-[70%] relative group ${isUser
                                                ? 'bg-gradient-to-br from-[#06B6D4]/20 to-blue-600/20 border-white/10 rounded-2xl rounded-tr-sm'
                                                : 'bg-white/5 border-white/5 rounded-2xl rounded-tl-sm'
                                            } p-4 border shadow-lg hover:shadow-xl transition-all duration-300`}>

                                            {/* Glow effect for user messages */}
                                            {isUser && <div className="absolute inset-0 bg-[#06B6D4]/5 blur-lg -z-10 rounded-2xl"></div>}

                                            <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>

                                            <div className="flex items-center justify-end gap-1.5 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] text-white/60 font-medium">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {isUser && (
                                                    <CheckCheck size={14} className={msg.is_read ? "text-[#06B6D4]" : "text-white/30"} />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center pb-20 opacity-50">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <MessageSquare size={32} className="text-white/20" />
                                </div>
                                <p className="text-white/40 font-medium">История сообщений пуста</p>
                                <p className="text-white/20 text-xs mt-1">Начните диалог первым</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-6 border-t border-white/5 bg-[#050B14]/40 backdrop-blur-md relative z-20">
                        <div className="flex gap-3 items-end max-w-4xl mx-auto">
                            <button className="p-3.5 text-white/40 hover:text-white transition-colors hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 mb-[2px] group">
                                <Paperclip size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="flex-1 bg-[#0F172A]/50 border border-white/10 rounded-2xl overflow-hidden focus-within:border-[#06B6D4]/50 focus-within:bg-[#0F172A] focus-within:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all">
                                <textarea
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Напишите сообщение..."
                                    className="w-full bg-transparent px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none resize-none max-h-32 min-h-[52px] custom-scrollbar text-sm"
                                    rows={1}
                                    style={{ height: 'auto', minHeight: '52px' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className="p-3.5 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white rounded-xl hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] disabled:opacity-50 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed mb-[2px] hover:scale-105 active:scale-95 group"
                            >
                                <Send size={20} className={messageInput.trim() ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" : ""} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center flex-col text-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-50 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 glass-card p-12 rounded-[40px] border border-white/5 shadow-2xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#06B6D4]/20 to-blue-600/20 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.2)] animate-float">
                            <MessageSquare size={40} className="text-[#06B6D4]" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Выберите чат</h3>
                        <p className="text-white/40 max-w-xs mx-auto text-sm leading-relaxed">
                            Выберите существующее обращение из списка слева или создайте новое для связи с поддержкой
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CabinetChats;
