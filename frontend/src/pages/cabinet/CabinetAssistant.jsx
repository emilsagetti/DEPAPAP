import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Paperclip, Mic, Sparkles, FileText, Scale, Search, ArrowRight } from 'lucide-react';

const SuggestedAction = ({ icon: Icon, title, desc, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#06B6D4]/30 transition-all group flex flex-col gap-2 h-full"
    >
        <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center group-hover:bg-[#06B6D4] group-hover:text-white transition-colors">
            <Icon size={20} />
        </div>
        <div>
            <h3 className="font-semibold text-white group-hover:text-[#06B6D4] transition-colors">{title}</h3>
            <p className="text-sm text-white/50">{desc}</p>
        </div>
    </motion.button>
);

const Message = ({ role, content, attachments = [] }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex gap-4 mb-6 ${role === 'user' ? 'flex-row-reverse' : ''}`}
    >
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${role === 'ai'
            ? 'bg-gradient-to-br from-[#06B6D4] to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            : 'bg-white/10 text-white'
            }`}>
            {role === 'ai' ? <Bot size={20} /> : <div className="text-sm font-bold">YOU</div>}
        </div>

        {/* Bubble */}
        <div className={`max-w-[80%] rounded-2xl p-4 ${role === 'ai'
            ? 'bg-white/5 border border-white/10 text-slate-200'
            : 'bg-[#06B6D4]/20 border border-[#06B6D4]/20 text-white'
            }`}>
            <p className="whitespace-pre-wrap leading-relaxed">{content}</p>

            {/* Attachments if any */}
            {attachments.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {attachments.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg border border-white/5 text-sm text-white/70">
                            <FileText size={14} />
                            <span>{file}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </motion.div>
);

const CabinetAssistant = () => {
    const [query, setQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!query.trim()) return;

        // User message
        const userMsg = { role: 'user', content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = {
                role: 'ai',
                content: 'Я проанализировал ваш запрос. Для решения этой задачи рекомендую воспользоваться конструктором документов для создания договора, либо изучить похожие кейсы в базе знаний.'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500);
    };

    const suggestions = [
        { icon: FileText, title: 'Составить договор', desc: 'Автоматическая генерация документа по вашим условиям' },
        { icon: Scale, title: 'Судебный анализ', desc: 'Оценка перспектив дела на основе судебной практики' },
        { icon: Search, title: 'Правовая справка', desc: 'Быстрый ответ на юридический вопрос со ссылками на законы' },
    ];

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            {/* Header / Empty State */}
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-fade-in space-y-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#06B6D4] blur-[80px] opacity-20 rounded-full"></div>
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)] relative z-10 mx-auto">
                            <Bot size={48} className="text-white" />
                        </div>
                    </div>

                    <div className="space-y-2 max-w-lg">
                        <h1 className="text-3xl font-bold text-white">Интеллектуальный Ассистент</h1>
                        <p className="text-slate-400">
                            Я ваш персональный юридический AI-помощник. Задайте вопрос, и я помогу найти решение, составить документ или проанализировать ситуацию.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                        {suggestions.map((s, i) => (
                            <SuggestedAction
                                key={i}
                                {...s}
                                onClick={() => {
                                    setQuery(s.title + '...');
                                    // document.querySelector('input').focus();
                                }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                    <div className="space-y-6 pb-4">
                        {messages.map((m, i) => (
                            <Message key={i} {...m} />
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                    <Bot size={20} className="text-white animate-pulse" />
                                </div>
                                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                    <span className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    <span className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="mt-4 relative z-20">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-end shadow-[0_0_30px_rgba(0,0,0,0.3)] focus-within:border-[#06B6D4]/50 focus-within:bg-white/10 transition-all">
                    <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <Paperclip size={20} />
                    </button>

                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Опишите вашу задачу или вопрос..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 resize-none max-h-32 min-h-[50px] py-3 px-2 scrollbar-hide"
                        rows={1}
                    />

                    <div className="flex items-center gap-1">
                        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!query.trim()}
                            className={`p-3 rounded-xl transition-all ${query.trim()
                                    ? 'bg-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95'
                                    : 'bg-white/5 text-white/20'
                                }`}
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
                <div className="text-center mt-3 text-xs text-white/30">
                    AI может допускать ошибки. Проверяйте важную юридическую информацию.
                </div>
            </div>
        </div>
    );
};

export default CabinetAssistant;
