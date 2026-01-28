import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, CheckCheck, Circle, MessageSquare } from 'lucide-react';

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
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Чаты с клиентами</h1>
                    <p className="text-slate-500">
                        {totalUnread > 0 ? `${totalUnread} непрочитанных` : 'Все сообщения прочитаны'}
                    </p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по клиентам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
                    {[
                        { id: 'all', label: 'Все' },
                        { id: 'unread', label: 'Непрочитанные' },
                        { id: 'active', label: 'Онлайн' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2.5 text-sm font-medium transition-colors ${filter === f.id
                                    ? 'bg-depa-cta text-white'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat List */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                {filteredChats.length === 0 ? (
                    <div className="py-12 text-center">
                        <MessageSquare size={48} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-500">Чаты не найдены</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredChats.map((chat, index) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/lawyer/chat/${chat.id}`}
                                    className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                                >
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                            {chat.client[0]}
                                        </div>
                                        {chat.online && (
                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`font-semibold truncate ${chat.unread > 0 ? 'text-slate-900' : 'text-slate-700'}`}>
                                                {chat.client}
                                            </h3>
                                            {chat.company && (
                                                <span className="text-xs text-slate-400 truncate">
                                                    · {chat.company}
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                            {chat.lastMessage}
                                        </p>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-col items-end gap-1.5">
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            {chat.time}
                                        </span>
                                        {chat.unread > 0 ? (
                                            <span className="min-w-[20px] h-5 px-1.5 bg-depa-cta text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {chat.unread}
                                            </span>
                                        ) : (
                                            <CheckCheck size={16} className="text-blue-500" />
                                        )}
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
