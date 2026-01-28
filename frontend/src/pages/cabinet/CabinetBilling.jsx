import React, { useState, useEffect } from 'react';
import { CreditCard, Download, FileText, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import BillingService from '../../api/billing.service';
import CabinetPageHeader from '../../components/common/CabinetPageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';

const CabinetBilling = () => {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [/* balance */, setBalance] = useState(0); // Assuming balance logic
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [invoicesData, transactionsData] = await Promise.all([
                    BillingService.getInvoices(),
                    // BillingService.getTransactions() // Uncomment if implemented backend
                    Promise.resolve([]) // Mock empty transactions for now
                ]);

                setInvoices(invoicesData.results || invoicesData);
                setTransactions(transactionsData.results || transactionsData);

                // Balance might be on user.company.balance if we added it, 
                // or we can sum transactions

            } catch (error) {
                console.error("Failed to fetch billing data", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    // Mock stats for now
    const balance = 0;
    const expensesMonth = 0;
    const pendingAmount = invoices
        .filter(inv => inv.status === 'pending' || inv.status === 'issued')
        .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <CabinetPageHeader title="Финансы и документы">
                <button className="flex items-center gap-2.5 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 group">
                    <Wallet size={20} className="group-hover:rotate-12 transition-transform" />
                    Пополнить баланс
                </button>
            </CabinetPageHeader>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Текущий баланс"
                    value={`${balance.toLocaleString()} ₽`}
                    icon={<Wallet size={24} />}
                    delay={0}
                    className="bg-gradient-to-br from-[#06B6D4]/10 to-transparent border-[#06B6D4]/30"
                />
                <StatCard
                    title="Расходы за месяц"
                    value={`${expensesMonth.toLocaleString()} ₽`}
                    icon={<TrendingDown size={24} className="text-red-400" />}
                    trend="up"
                    delay={100}
                />
                <StatCard
                    title="Ожидает оплаты"
                    value={`${pendingAmount.toLocaleString()} ₽`}
                    icon={<CreditCard size={24} className="text-orange-400" />}
                    delay={200}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Invoices */}
                <div
                    className="glass-card rounded-[32px] overflow-hidden flex flex-col h-full animate-slide-up opacity-0 border border-white/5 relative group"
                    style={{ animationDelay: '300ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#06B6D4]/10 rounded-xl text-[#06B6D4]">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Счета на оплату</h3>
                        </div>
                        <button className="text-sm font-medium text-[#06B6D4] hover:text-[#22d3ee] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#06B6D4]/10">
                            Все счета
                        </button>
                    </div>

                    <div className="p-3">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-16 space-y-4">
                                <div className="w-8 h-8 border-2 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
                                <span className="text-white/30 text-sm">Загрузка данных...</span>
                            </div>
                        ) : invoices.length > 0 ? (
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-separate border-spacing-y-2 px-2">
                                    <thead className="text-[11px] uppercase text-white/40 font-bold tracking-wider">
                                        <tr>
                                            <th className="px-4 pb-2 pl-6">Дата / Номер</th>
                                            <th className="px-4 pb-2">Сумма</th>
                                            <th className="px-4 pb-2 text-right pr-6">Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map((inv, idx) => (
                                            <tr
                                                key={inv.id}
                                                className="group/row transition-all duration-300 hover:scale-[1.01] relative"
                                                style={{ animationDelay: `${idx * 50}ms` }}
                                            >
                                                <td className="px-6 py-4 bg-white/5 first:rounded-l-2xl group-hover/row:bg-white/10 transition-colors border-y border-l border-white/5 group-hover/row:border-white/10 group-hover/row:shadow-lg">
                                                    <div className="text-white font-bold text-sm tracking-tight">{inv.amount_due ? `Счет на оплату` : inv.title || 'Счет'}</div>
                                                    <div className="text-xs text-white/40 mt-1 font-mono group-hover/row:text-white/60 transition-colors">
                                                        № {inv.id} • {new Date(inv.created_at || inv.date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 bg-white/5 group-hover/row:bg-white/10 transition-colors border-y border-white/5 group-hover/row:border-white/10 group-hover/row:shadow-lg">
                                                    <span className="text-white font-bold font-mono tracking-tight">
                                                        {parseFloat(inv.amount).toLocaleString()} ₽
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 bg-white/5 last:rounded-r-2xl group-hover/row:bg-white/10 transition-colors border-y border-r border-white/5 group-hover/row:border-white/10 group-hover/row:shadow-lg text-right">
                                                    <StatusBadge status={inv.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 opacity-50">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <FileText size={32} className="text-white/20" />
                                </div>
                                <span className="text-white/40 font-medium">Нет активных счетов</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Transactions */}
                <div
                    className="glass-card rounded-[32px] overflow-hidden flex flex-col h-full animate-slide-up opacity-0 border border-white/5 relative group"
                    style={{ animationDelay: '400ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">История операций</h3>
                        </div>
                        <button className="text-sm font-medium text-[#06B6D4] hover:text-[#22d3ee] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#06B6D4]/10">
                            Выписка
                        </button>
                    </div>

                    <div className="p-3">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-16 space-y-4">
                                <div className="w-8 h-8 border-2 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>
                                <span className="text-white/30 text-sm">Загрузка истории...</span>
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-separate border-spacing-y-2 px-2">
                                    <thead className="text-[11px] uppercase text-white/40 font-bold tracking-wider">
                                        <tr>
                                            <th className="px-4 pb-2 pl-6">Дата / Операция</th>
                                            <th className="px-4 pb-2 text-right pr-6">Сумма</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((tr, idx) => (
                                            <tr
                                                key={tr.id}
                                                className="group/row transition-all duration-300 hover:scale-[1.01] cursor-default"
                                                style={{ animationDelay: `${idx * 50}ms` }}
                                            >
                                                <td className="px-6 py-4 bg-white/5 first:rounded-l-2xl group-hover/row:bg-white/10 transition-colors border-y border-l border-white/5 group-hover/row:border-white/10">
                                                    <div className="text-white font-medium text-sm">{tr.description}</div>
                                                    <div className="text-xs text-white/40 mt-1 font-mono">{new Date(tr.date).toLocaleDateString()}</div>
                                                </td>
                                                <td className={`px-6 py-4 bg-white/5 last:rounded-r-2xl group-hover/row:bg-white/10 transition-colors border-y border-r border-white/5 group-hover/row:border-white/10 text-right font-bold text-sm tracking-wide ${tr.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                                    {tr.amount > 0 ? '+' : ''}{parseFloat(tr.amount).toLocaleString()} ₽
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 opacity-50">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <TrendingUp size={32} className="text-white/20" />
                                </div>
                                <span className="text-white/40 font-medium">История операций пуста</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetBilling;
