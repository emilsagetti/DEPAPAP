import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, CheckCheck, Circle, MessageSquare, MoreVertical } from 'lucide-react';

const LawyerChatList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, active

    // Mock data - will be replaced with API
    const chats = [
        {
            id: 1,
            client: 'Иван Петров',
            company: 'ИП Петров И.И.',
            lastMessage: 'Добрый день, подскажите по договору аренды...',
            time: '5 мин',
            unread: 3,
            online: true,
            avatar: null
        },
        {
            id: 2,
            client: 'ООО "Ромашка"',
            company: 'ООО "Ромашка"',
            lastMessage: 'Документы готовы, жду вашего ответа',
            time: '15 мин',
            unread: 1,
            online: false,
            avatar: null
        },
        {
            id: 3,
            client: 'Мария Сидорова',
            company: null,
            lastMessage: 'Спасибо за консультацию!',
            time: '1 час',
            unread: 0,
            online: true,
            avatar: null
        },
        {
            id: 4,
            client: 'Алексей Козлов',
            company: 'ООО "ТехноСервис"',
            lastMessage: 'Когда будут готовы учредительные документы?',
            time: '2 часа',
            unread: 0,
            online: false,
            avatar: null
        },
        {
            id: 5,
            client: 'Елена Волкова',
            company: null,
            lastMessage: 'Подскажите по налоговым вычетам',
            time: '3 часа',
            unread: 2,
            online: false,
            avatar: null
        },
    ];

    const filteredChats = chats
        .filter(chat => {
            if (filter === 'unread') return chat.unread > 0;
            if (filter === 'active') return chat.online;
            return true;
        })
        .filter(chat =>
            chat.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.company?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Чаты с клиентами</h1>
                    <p className="text-slate-500">
                        {totalUnread > 0 ? `${totalUnread} непрочитанных сообщений` : 'Все сообщения прочитаны'}
                    </p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" />
                    <input
                        type="text"
                        placeholder="Поиск по клиентам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:bg-white/[0.05] focus:border-[#06B6D4]/50 text-white placeholder-slate-600 transition-all font-medium"
                    />
                </div>
                <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-xl">
                    {[
                        { id: 'all', label: 'Все' },
                        { id: 'unread', label: 'Непрочитанные' },
                        { id: 'active', label: 'Онлайн' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f.id
                                ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat List */}
            <div className="bg-[#0F172A]/40 rounded-[24px] border border-white/10 backdrop-blur-xl overflow-hidden min-h-[400px]">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <MessageSquare size={32} className="text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">Чаты не найдены</h3>
                        <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filteredChats.map((chat, index) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/lawyer/chat/${chat.id}`}
                                    className="block relative px-6 py-5 hover:bg-white/[0.03] transition-all group"
                                >
                                    {chat.unread > 0 && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#06B6D4] opacity-100 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                    )}
                                    <div className="flex items-center gap-5">
                                        {/* Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center group-hover:border-[#06B6D4]/50 transition-colors">
                                                <span className="text-white font-bold text-lg">{chat.client[0]}</span>
                                            </div>
                                            {chat.online && (
                                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0F172A] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2 max-w-[70%]">
                                                    <h3 className={`font-semibold truncate text-lg ${chat.unread > 0 ? 'text-white' : 'text-slate-300'}`}>
                                                        {chat.client}
                                                    </h3>
                                                    {chat.company && (
                                                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-400 uppercase tracking-wider font-bold truncate max-w-[150px]">
                                                            {chat.company}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`text-xs font-medium whitespace-nowrap ${chat.unread ? 'text-[#06B6D4]' : 'text-slate-500'}`}>
                                                    {chat.time}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <p className={`text-sm truncate w-full ${chat.unread > 0 ? 'text-slate-200' : 'text-slate-500'}`}>
                                                    {chat.lastMessage}
                                                </p>
                                                {chat.unread > 0 ? (
                                                    <span className="flex-shrink-0 min-w-[24px] h-6 px-1.5 bg-[#06B6D4] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                                                        {chat.unread}
                                                    </span>
                                                ) : (
                                                    <CheckCheck size={18} className="text-[#06B6D4] opacity-50 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LawyerChatList;
