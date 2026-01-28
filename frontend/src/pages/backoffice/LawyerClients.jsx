import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, User, Building2, Mail, Phone,
    MessageSquare, FileText, ChevronDown, MoreHorizontal
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Мои клиенты</h1>
                    <p className="text-slate-500">{clients.length} клиентов в базе</p>
                </div>
                <button className="px-4 py-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold rounded-xl shadow-lg shadow-[#06B6D4]/20 transition-all flex items-center gap-2">
                    <User size={18} />
                    Добавить клиента
                </button>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors" />
                    <input
                        type="text"
                        placeholder="Поиск по имени, компании или email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:bg-white/[0.05] focus:border-[#06B6D4]/50 text-white placeholder-slate-600 transition-all font-medium"
                    />
                </div>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none w-full md:w-48 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-[#06B6D4]/50 text-white font-medium cursor-pointer"
                    >
                        <option value="recent" className="bg-[#0F172A]">По активности</option>
                        <option value="name" className="bg-[#0F172A]">По имени</option>
                        <option value="orders" className="bg-[#0F172A]">По заказам</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredClients.map((client, index) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/[0.03] border border-white/10 rounded-[20px] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group relative overflow-hidden"
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="relative z-10 flex items-start gap-5">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/20">
                                {client.name[0]}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-tight truncate pr-2">{client.name}</h3>
                                        {client.company && (
                                            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                <Building2 size={14} className="text-[#06B6D4]" />
                                                {client.company}
                                            </p>
                                        )}
                                    </div>
                                    <button className="p-1 text-slate-500 hover:text-white transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                                        <Mail size={14} className="text-slate-500" />
                                        <span className="truncate max-w-[150px]">{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                                        <Phone size={14} className="text-slate-500" />
                                        {client.phone}
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <FileText size={14} />
                                        {client.ordersCount} заказов
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="px-4 py-2 bg-white/[0.05] hover:bg-white/10 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-colors border border-white/5">
                                            Профиль
                                        </button>
                                        <Link
                                            to={`/lawyer/chat/${client.id}`}
                                            className="px-4 py-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#06B6D4]/20 flex items-center gap-2"
                                        >
                                            <MessageSquare size={16} />
                                            Чат
                                        </Link>
                                    </div>
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
