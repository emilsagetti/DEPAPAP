import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, Filter, User, Building2, Mail, Phone,
    MessageSquare, FileText, MoreVertical, Calendar,
    SortAsc, ChevronDown
} from 'lucide-react';

const LawyerClients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent'); // recent, name, orders

    // Mock clients data
    const clients = [
        {
            id: 1,
            name: 'Иван Петров',
            company: 'ИП Петров И.И.',
            inn: '123456789012',
            email: 'petrov@example.com',
            phone: '+7 (999) 123-45-67',
            ordersCount: 5,
            lastActivity: '5 минут назад',
            status: 'active'
        },
        {
            id: 2,
            name: 'ООО "Ромашка"',
            company: 'ООО "Ромашка"',
            inn: '1234567890',
            email: 'info@romashka.ru',
            phone: '+7 (495) 123-45-67',
            ordersCount: 12,
            lastActivity: '2 часа назад',
            status: 'active'
        },
        {
            id: 3,
            name: 'Мария Сидорова',
            company: null,
            inn: null,
            email: 'sidorova@mail.ru',
            phone: '+7 (916) 555-12-34',
            ordersCount: 2,
            lastActivity: '1 день назад',
            status: 'inactive'
        },
        {
            id: 4,
            name: 'Алексей Козлов',
            company: 'ООО "ТехноСервис"',
            inn: '9876543210',
            email: 'kozlov@technoservice.ru',
            phone: '+7 (495) 987-65-43',
            ordersCount: 8,
            lastActivity: '3 дня назад',
            status: 'active'
        },
    ];

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Мои клиенты</h1>
                    <p className="text-slate-500">{clients.length} клиентов</p>
                </div>
            </div>

            {/* Search & Sort */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по имени, компании или email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    >
                        <option value="recent">По активности</option>
                        <option value="name">По имени</option>
                        <option value="orders">По заказам</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredClients.map((client, index) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                {client.name[0]}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{client.name}</h3>
                                        {client.company && (
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <Building2 size={12} />
                                                {client.company}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${client.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {client.status === 'active' ? 'Активный' : 'Неактивный'}
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Mail size={12} />
                                        {client.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FileText size={12} />
                                        {client.ordersCount} заказов
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <Link
                                        to={`/lawyer/chat/${client.id}`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-depa-cta hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <MessageSquare size={14} />
                                        Чат
                                    </Link>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                                        <User size={14} />
                                        Профиль
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LawyerClients;
