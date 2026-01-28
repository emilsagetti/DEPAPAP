import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, ArrowLeft, MoreVertical, Paperclip, Phone, Video,
    User, Building2, FileText, Clock, Check, CheckCheck,
    Image, File
} from 'lucide-react';

// Reuse message bubble from client chat
const MessageBubble = ({ message, isOwn }) => {
    const time = new Date(message.createdAt).toLocaleTimeString('ru-RU', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}
        >
            <div
                className={`relative max-w-[75%] ${isOwn
                    ? 'bg-gradient-to-br from-[#06B6D4] to-[#0891B2] text-white rounded-[20px] rounded-br-[6px] shadow-[0_4px_15px_rgba(6,182,212,0.2)]'
                    : 'bg-[#1E293B] border border-white/10 text-slate-200 rounded-[20px] rounded-bl-[6px] shadow-sm'
                    }`}
            >
                <div className="px-4 py-2.5">
                    <p className="text-[15px] leading-[1.45] whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className={`flex items-center justify-end gap-1 px-3 pb-2 -mt-0.5 ${isOwn ? 'text-white/70' : 'text-slate-500'
                    }`}>
                    <span className="text-[11px] font-medium">{time}</span>
                    {isOwn && (message.isRead ? <CheckCheck size={14} className="text-white/90" /> : <Check size={14} />)}
                </div>
            </div>
        </motion.div>
    );
};

const LawyerChatPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [showClientInfo, setShowClientInfo] = useState(true);
    const messagesEndRef = useRef(null);

    // Mock client data
    const client = {
        id: id,
        name: 'Иван Петров',
        company: 'ИП Петров И.И.',
        inn: '123456789012',
        email: 'petrov@example.com',
        phone: '+7 (999) 123-45-67',
        registeredAt: '15 декабря 2025',
        ordersCount: 3,
        online: true
    };

    // Mock messages
    const [messages, setMessages] = useState([
        { id: 1, content: 'Добрый день! Подскажите, пожалуйста, по договору аренды нежилого помещения.', senderRole: 'CLIENT', createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: true },
        { id: 2, content: 'Добрый день! Конечно, помогу. Какой именно вопрос по договору?', senderRole: 'LAWYER', createdAt: new Date(Date.now() - 3500000).toISOString(), isRead: true },
        { id: 3, content: 'Нужно понять, какие пункты стоит включить для защиты арендатора. У нас ИП, арендуем офис на 3 года.', senderRole: 'CLIENT', createdAt: new Date(Date.now() - 3400000).toISOString(), isRead: true },
        { id: 4, content: 'Отлично. Обязательные пункты для защиты:\n\n1. Фиксация арендной ставки на весь срок\n2. Условия индексации (если есть)\n3. Порядок расторжения договора\n4. Ответственность сторон за ненадлежащее исполнение\n\nМогу подготовить полный чек-лист для проверки вашего договора.', senderRole: 'LAWYER', createdAt: new Date(Date.now() - 3300000).toISOString(), isRead: true },
        { id: 5, content: 'Да, пришлите чек-лист, пожалуйста! И ещё вопрос — можно ли включить пункт о первоочередном праве выкупа помещения?', senderRole: 'CLIENT', createdAt: new Date(Date.now() - 300000).toISOString(), isRead: false },
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now(),
            content: message.trim(),
            senderRole: 'LAWYER',
            createdAt: new Date().toISOString(),
            isRead: false
        }]);
        setMessage('');
    };

    return (
        <div className="flex gap-6 h-[calc(100vh-140px)]">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl shadow-black/20">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0F172A]/30">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/lawyer/chats"
                            className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-lg">
                                {client.name[0]}
                            </div>
                            {client.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0F172A] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-white text-lg leading-tight">{client.name}</h2>
                            <p className="text-xs font-medium text-[#06B6D4]">
                                {client.online ? 'В сети' : 'Не в сети'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
                            <Phone size={20} />
                        </button>
                        <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
                            <Video size={20} />
                        </button>
                        <button
                            onClick={() => setShowClientInfo(!showClientInfo)}
                            className={`p-2.5 rounded-xl transition-all ${showClientInfo
                                    ? 'bg-[#06B6D4] text-white shadow-lg shadow-cyan-500/20'
                                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                                }`}
                        >
                            <User size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-transparent custom-scrollbar">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isOwn={msg.senderRole === 'LAWYER'}
                            />
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-6 py-5 border-t border-white/5 bg-[#0F172A]/30">
                    <form onSubmit={handleSend} className="flex items-center gap-3">
                        <button type="button" className="p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Написать сообщение..."
                            className="flex-1 py-3 px-5 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:bg-white/10 focus:border-[#06B6D4]/50 text-white placeholder-slate-500 transition-all"
                        />
                        <motion.button
                            type="submit"
                            disabled={!message.trim()}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-xl transition-all ${message.trim()
                                ? 'bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-lg shadow-cyan-500/20'
                                : 'bg-white/5 text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            <Send size={20} />
                        </motion.button>
                    </form>
                </div>
            </div>

            {/* Client Info Sidebar */}
            <AnimatePresence>
                {showClientInfo && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: 340, marginLeft: 0 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden flex-shrink-0 shadow-2xl shadow-black/20"
                    >
                        <div className="p-6 w-[340px]">
                            {/* Client Avatar */}
                            <div className="text-center mb-6 pt-4">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-black/20">
                                    {client.name[0]}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
                                {client.company && (
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-slate-400">
                                        {client.company}
                                    </span>
                                )}
                            </div>

                            {/* Client Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#06B6D4] transition-colors">
                                        <Building2 size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">ИНН</p>
                                        <p className="text-sm font-medium text-slate-200">{client.inn}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#06B6D4] transition-colors">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Email</p>
                                        <p className="text-sm font-medium text-slate-200">{client.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#06B6D4] transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Телефон</p>
                                        <p className="text-sm font-medium text-slate-200">{client.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#06B6D4] transition-colors">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Клиент с</p>
                                        <p className="text-sm font-medium text-slate-200">{client.registeredAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#06B6D4] transition-colors">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Заказов</p>
                                        <p className="text-sm font-medium text-slate-200">{client.ordersCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3 pt-2">
                                <button className="w-full py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]">
                                    Профиль клиента
                                </button>
                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    История заказов
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LawyerChatPage;
