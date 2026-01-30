import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, TrendingUp, TrendingDown, CreditCard,
    ArrowUpRight, ArrowDownRight, Download, Filter,
    FileText, CheckCircle, Clock, AlertCircle, Search
} from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';
import TrigramSearchService from '../../utils/TrigramSearchService';

const DirectorFinance = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        { icon: Wallet, label: 'Баланс', value: 1847000, trend: 'up', change: '+₽245,000', color: 'from-green-500 to-green-600' },
        { icon: TrendingUp, label: 'Доход за месяц', value: 2847000, trend: 'up', change: '+18%', color: 'from-blue-500 to-blue-600' },
        { icon: TrendingDown, label: 'Расходы за месяц', value: 1456000, trend: 'down', change: '+5%', color: 'from-red-500 to-red-600' },
        { icon: CreditCard, label: 'Ожидает оплаты', value: 523000, trend: 'neutral', change: '12 счетов', color: 'from-amber-500 to-amber-600' },
    ];

    const transactions = [
        { id: 1, type: 'income', description: 'Оплата заказа #1247', client: 'ООО "Ромашка"', amount: 45000, date: '11 янв 2026', status: 'completed' },
        { id: 2, type: 'income', description: 'Оплата заказа #1246', client: 'ИП Петров А.В.', amount: 15000, date: '11 янв 2026', status: 'completed' },
        { id: 3, type: 'expense', description: 'Зарплата сотрудникам', client: 'Внутренний', amount: 450000, date: '10 янв 2026', status: 'completed' },
        { id: 4, type: 'income', description: 'Оплата заказа #1245', client: 'АО "СтройИнвест"', amount: 120000, date: '10 янв 2026', status: 'pending' },
        { id: 5, type: 'expense', description: 'Аренда офиса', client: 'Внутренний', amount: 85000, date: '9 янв 2026', status: 'completed' },
        { id: 6, type: 'income', description: 'Оплата заказа #1244', client: 'ООО "ТехноПром"', amount: 35000, date: '9 янв 2026', status: 'completed' },
        { id: 7, type: 'income', description: 'Оплата заказа #1243', client: 'ИП Сидорова М.И.', amount: 8000, date: '8 янв 2026', status: 'failed' },
    ];

    const invoices = [
        { id: 'INV-2026-001', client: 'ООО "Ромашка"', service: 'Судебное представительство', amount: 120000, issued: '5 янв 2026', due: '20 янв 2026', status: 'pending' },
        { id: 'INV-2026-002', client: 'АО "СтройИнвест"', service: 'Регистрация ООО', amount: 25000, issued: '3 янв 2026', due: '18 янв 2026', status: 'pending' },
        { id: 'INV-2025-147', client: 'ИП Козлов Д.С.', service: 'Составление договора', amount: 15000, issued: '28 дек 2025', due: '12 янв 2026', status: 'overdue' },
    ];

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'income') return t.type === 'income';
        if (filter === 'expense') return t.type === 'expense';
        return true;
    }).filter(t =>
        TrigramSearchService.match(t.description, searchQuery) ||
        TrigramSearchService.match(t.client, searchQuery)
    );

    const statusColors = {
        completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
        pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
        failed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
        overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Финансы</h1>
                    <p className="text-slate-500">Управление доходами и расходами</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors">
                    <Download size={18} />
                    Экспорт
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">
                            ₽<AnimatedCounter value={stat.value} />
                        </p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Transactions & Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100"
                >
                    <div className="px-6 py-4 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-900">Транзакции</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                                {['all', 'income', 'expense'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                                            }`}
                                    >
                                        {f === 'all' ? 'Все' : f === 'income' ? 'Доход' : 'Расход'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                        {filteredTransactions.map((tx, i) => {
                            const StatusIcon = statusColors[tx.status].icon;
                            return (
                                <motion.div
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.05 }}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                        {tx.type === 'income' ? (
                                            <ArrowUpRight className="text-green-600" size={20} />
                                        ) : (
                                            <ArrowDownRight className="text-red-600" size={20} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900">{tx.description}</p>
                                        <p className="text-sm text-slate-500">{tx.client}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {tx.type === 'income' ? '+' : '-'}₽{tx.amount.toLocaleString('ru-RU')}
                                        </p>
                                        <p className="text-xs text-slate-400">{tx.date}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${statusColors[tx.status].bg} ${statusColors[tx.status].text}`}>
                                        <StatusIcon size={14} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Pending Invoices */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100"
                >
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900">Ожидающие счета</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {invoices.map((inv, i) => {
                            const StatusIcon = statusColors[inv.status].icon;
                            return (
                                <motion.div
                                    key={inv.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-mono text-slate-500">{inv.id}</span>
                                        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColors[inv.status].bg} ${statusColors[inv.status].text}`}>
                                            <StatusIcon size={12} />
                                            {inv.status === 'pending' ? 'Ожидает' : 'Просрочен'}
                                        </span>
                                    </div>
                                    <p className="font-medium text-slate-900">{inv.client}</p>
                                    <p className="text-sm text-slate-500 mb-2">{inv.service}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-slate-900">₽{inv.amount.toLocaleString('ru-RU')}</span>
                                        <span className="text-xs text-slate-400">до {inv.due}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100">
                        <button className="w-full py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                            Все счета →
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DirectorFinance;
