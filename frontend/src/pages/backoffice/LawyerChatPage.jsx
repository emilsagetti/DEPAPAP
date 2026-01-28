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
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-[20px] rounded-br-[6px]'
                    : 'bg-white text-slate-800 rounded-[20px] rounded-bl-[6px] shadow-sm border border-slate-100'
                    }`}
            >
                <div className="px-4 py-2.5">
                    <p className="text-[15px] leading-[1.45] whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className={`flex items-center justify-end gap-1 px-3 pb-2 -mt-0.5 ${isOwn ? 'text-white/70' : 'text-slate-400'
                    }`}>
                    <span className="text-[11px]">{time}</span>
                    {isOwn && (message.isRead ? <CheckCheck size={14} /> : <Check size={14} />)}
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
        <div className="flex gap-6 h-[calc(100vh-180px)]">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/lawyer/chats"
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            <ArrowLeft size={20} className="text-slate-500" />
                        </Link>
                        <div className="relative">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                {client.name[0]}
                            </div>
                            {client.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-slate-900">{client.name}</h2>
                            <p className="text-xs text-slate-500">
                                {client.online ? 'В сети' : 'Не в сети'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                            <Phone size={18} className="text-slate-500" />
                        </button>
                        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                            <Video size={18} className="text-slate-500" />
                        </button>
                        <button
                            onClick={() => setShowClientInfo(!showClientInfo)}
                            className={`p-2.5 rounded-xl transition-colors ${showClientInfo ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-500'
                                }`}
                        >
                            <User size={18} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
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
                <div className="px-5 py-4 border-t border-slate-100">
                    <form onSubmit={handleSend} className="flex items-center gap-3">
                        <button type="button" className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                            <Paperclip size={20} className="text-slate-400" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Написать сообщение..."
                            className="flex-1 py-2.5 px-4 bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <motion.button
                            type="submit"
                            disabled={!message.trim()}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2.5 rounded-full transition-all ${message.trim()
                                    ? 'bg-depa-cta text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                        >
                            <Send size={18} />
                        </motion.button>
                    </form>
                </div>
            </div>

            {/* Client Info Sidebar */}
            <AnimatePresence>
                {showClientInfo && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 320 }}
                        exit={{ opacity: 0, width: 0 }}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex-shrink-0"
                    >
                        <div className="p-5">
                            {/* Client Avatar */}
                            <div className="text-center mb-5">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                                    {client.name[0]}
                                </div>
                                <h3 className="font-semibold text-slate-900">{client.name}</h3>
                                {client.company && (
                                    <p className="text-sm text-slate-500">{client.company}</p>
                                )}
                            </div>

                            {/* Client Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Building2 size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">ИНН</p>
                                        <p className="text-sm font-medium text-slate-700">{client.inn}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <User size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Email</p>
                                        <p className="text-sm font-medium text-slate-700">{client.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Phone size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Телефон</p>
                                        <p className="text-sm font-medium text-slate-700">{client.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Clock size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Клиент с</p>
                                        <p className="text-sm font-medium text-slate-700">{client.registeredAt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <FileText size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Заказов</p>
                                        <p className="text-sm font-medium text-slate-700">{client.ordersCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 space-y-2">
                                <button className="w-full py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                                    Профиль клиента
                                </button>
                                <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
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
