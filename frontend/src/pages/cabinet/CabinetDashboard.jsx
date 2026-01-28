import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, MessageSquare, Briefcase, Plus, Clock, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// API
import CabinetService from '../../api/cabinet.service';
import RequestsService from '../../api/requests.service';
import { useAuth } from '../../context/AuthContext';

// Components
import CabinetPageHeader from '../../components/common/CabinetPageHeader';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';

const CabinetDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeRequests: 0,
        documentsCount: 0,
        consultationsAvailable: 0,
        balance: 0,
        nextPaymentDate: null,
        recentActivity: []
    });
    const [recentRequests, setRecentRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, requestsData] = await Promise.all([
                    CabinetService.getDashboardStats(),
                    RequestsService.getAll({ limit: 3, status: 'active' }) // Assuming backend supports filtering
                ]);

                // If backend dashboard endpoint is not fully ready, we might need to fallback or adapt
                setStats(statsData);
                setRecentRequests(requestsData.results || requestsData); // Handle pagination result
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    // Use user data from context or stats for basic info
    // Use user data from context or stats for basic info
    const balance = user?.company?.balance || stats.balance || 0;
    const planName = user?.company?.subscription?.plan?.name || "Старт";
    // Fix subscription status display
    const isSubscribed = user?.subscription_status === 'active' || user?.company?.subscription?.status === 'active';
    const subscriptionSubtext = stats.nextPaymentDate
        ? `До ${new Date(stats.nextPaymentDate).toLocaleDateString()}`
        : (isSubscribed ? 'Подписка активна' : 'Нет подписки');

    if (isLoading) {
        return <div className="text-white/50 text-center py-20 animate-pulse">Загрузка данных...</div>;
    }

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <CabinetPageHeader
                title={`Добро пожаловать, ${user?.first_name || user?.email?.split('@')[0] || 'в личный кабинет'}!`}
                parent={user?.company?.name || user?.company_name || 'Заполните профиль для начала работы'}
            >
                <div className="flex items-center gap-2 text-sm font-medium text-[#06B6D4] bg-[#06B6D4]/10 px-4 py-2 rounded-xl border border-[#06B6D4]/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <Calendar size={16} />
                    {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
            </CabinetPageHeader>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Активные заявки"
                    value={stats.activeRequests}
                    icon={<Briefcase size={24} />}
                    trend="up"
                    delay={0}
                />
                <StatCard
                    title="Документы"
                    value={stats.documentsCount}
                    icon={<FileText size={24} />}
                    delay={100}
                />
                <StatCard
                    title="Доступно консультаций"
                    value={stats.consultationsAvailable}
                    subtext={`Тариф ${planName}`}
                    icon={<MessageSquare size={24} />}
                    delay={200}
                />
                <StatCard
                    title="Баланс"
                    value={`${balance.toLocaleString()} ₽`}
                    subtext={subscriptionSubtext}
                    icon={<CreditCard size={24} />}
                    delay={300}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Requests */}
                <div
                    className="glass-card p-1 rounded-[32px] lg:col-span-2 flex flex-col h-full animate-slide-up opacity-0 relative group"
                    style={{ animationDelay: '400ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/5 to-transparent rounded-[32px] pointer-events-none"></div>
                    <div className="bg-[#050B14]/80 backdrop-blur-xl rounded-[30px] p-6 h-full flex flex-col border border-white/5 relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-[#06B6D4] rounded-full shadow-[0_0_10px_#06B6D4]"></div>
                                <h3 className="text-xl font-bold text-white tracking-tight">В работе</h3>
                            </div>
                            <button
                                onClick={() => navigate('/cabinet/services')}
                                className="text-[#06B6D4] text-sm font-medium hover:text-[#22d3ee] transition-colors relative group px-3 py-1.5 rounded-lg hover:bg-[#06B6D4]/10"
                            >
                                Все заявки
                                <span className="absolute bottom-1.5 left-3 right-3 h-px bg-[#06B6D4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </button>
                        </div>

                        <div className="space-y-3 flex-1">
                            {recentRequests.length > 0 ? (
                                recentRequests.map(req => (
                                    <div
                                        key={req.id}
                                        onClick={() => navigate(`/cabinet/services`)}
                                        className="group/item flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] hover:border-[#06B6D4]/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 cursor-pointer gap-4 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/0 via-[#06B6D4]/5 to-[#06B6D4]/0 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000"></div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 bg-[#06B6D4]/10 rounded-2xl flex items-center justify-center border border-[#06B6D4]/20 text-[#06B6D4] group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform duration-300 shadow-inner">
                                                <Briefcase size={22} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white group-hover/item:text-[#06B6D4] transition-colors text-base">{req.title}</h4>
                                                <p className="text-xs text-white/40 flex items-center gap-1.5 mt-1 font-medium">
                                                    <Clock size={12} className="text-[#06B6D4]" />
                                                    Обновлено: {new Date(req.updated_at || req.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto relative z-10">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-sm font-bold text-white tracking-wide">{(req.price || 0).toLocaleString()} ₽</div>
                                                <div className="text-[10px] uppercase tracking-wider text-white/30 font-bold">{req.service_type}</div>
                                            </div>
                                            <StatusBadge status={req.status} label={req.status_display || req.status} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/20">
                                        <Briefcase size={32} />
                                    </div>
                                    <p className="text-white/40 font-medium">Нет активных заявок</p>
                                    <p className="text-white/20 text-sm mt-1">Создайте новую заявку, чтобы начать работу</p>
                                </div>
                            )}
                        </div>

                        <button className="w-full mt-6 py-4 rounded-2xl relative overflow-hidden group transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 to-[#0891B2]/20 border border-[#06B6D4]/30 group-hover:border-[#06B6D4]/60 transition-colors rounded-2xl"></div>
                            <div className="absolute inset-0 bg-[#06B6D4]/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative flex items-center justify-center gap-2 text-[#06B6D4] font-bold group-hover:scale-105 transition-transform">
                                <Plus size={20} />
                                <span>Создать новую заявку</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Column: Quick Actions & Notification */}
                <div className="flex flex-col gap-6">
                    {/* Recent Activity Mini */}
                    <div className="glass-card p-6 rounded-[32px] border border-white/10 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-5 bg-purple-500 rounded-full shadow-[0_0_10px_#A855F7]"></div>
                            <h3 className="text-lg font-bold text-white">События</h3>
                        </div>

                        <div className="space-y-6 relative pl-3">
                            {/* Connector Line */}
                            <div className="absolute left-[19px] top-3 bottom-6 w-0.5 bg-gradient-to-b from-white/10 to-transparent"></div>

                            {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                stats.recentActivity.map((act, index) => (
                                    <div key={index} className="relative flex gap-4 group">
                                        <div className="w-3 h-3 mt-1.5 rounded-full bg-[#050B14] border-2 border-[#06B6D4] shadow-[0_0_10px_#06B6D4] flex-shrink-0 z-10 group-hover:scale-125 transition-transform"></div>
                                        <div className="py-0.5">
                                            <p className="text-sm text-white/90 leading-snug font-medium group-hover:text-[#06B6D4] transition-colors">{act.text}</p>
                                            <p className="text-xs text-white/40 mt-1.5 font-mono">{new Date(act.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-white/40 text-sm py-4 italic">Нет последних событий</div>
                            )}
                        </div>
                    </div >

                    {/* Personal Manager */}
                    <div className="relative rounded-[32px] overflow-hidden p-1 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4] to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 backdrop-blur-3xl"></div>

                        <div className="bg-[#050B14]/90 rounded-[30px] p-6 relative z-10 border border-white/10 h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/30 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none animate-pulse-slow"></div>

                            <h3 className="text-lg font-bold text-white mb-6 relative z-10">Ваш менеджер</h3>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] border-2 border-white/10">
                                    A
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg tracking-tight">Анна Смирнова</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                                        <p className="text-white/50 text-xs font-medium">Персональный юрист</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 relative z-10">
                                <button className="py-3 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-all border border-white/10 hover:border-white/30 active:scale-95 text-center">
                                    Написать
                                </button>
                                <button className="py-3 px-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 text-center">
                                    Позвонить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetDashboard;
