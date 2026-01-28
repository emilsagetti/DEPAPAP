import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Filter, Search, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import RequestsService from '../../api/requests.service';
import CabinetPageHeader from '../../components/common/CabinetPageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../context/AuthContext';

// Map backend statuses to frontend labels/colors (if needed)
// Assuming backend returns keys like 'in_progress' which matched our mock keys previously
const SERVICE_STATUSES = {
    new: { label: 'Новая', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    in_progress: { label: 'В работе', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    pending: { label: 'Ожидает', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    done: { label: 'Выполнено', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    canceled: { label: 'Отменено', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    // Add others as needed
};

const CabinetServices = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            try {
                // We can pass filters to getAll if backend supports it
                // For now fetching all and filtering client-side for "Tabs" to match previous UI logic
                // Or ideally backend supports ?status=...
                const data = await RequestsService.getAll();
                setServices(data.results || data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchServices();
        }
    }, [user]);

    // Filter logic
    const filteredServices = services.filter(service => {
        const matchesSearch = (service.title || '').toLowerCase().includes(searchQuery.toLowerCase());

        let matchesTab = true;
        if (activeTab === 'active') {
            matchesTab = !['done', 'canceled'].includes(service.status);
        } else if (activeTab === 'history') {
            matchesTab = ['done', 'canceled'].includes(service.status);
        }

        return matchesSearch && matchesTab;
    });

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <CabinetPageHeader title="Услуги и заявки">
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#06B6D4] to-blue-600 px-6 py-3 rounded-xl text-white font-bold hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95 group">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <Plus size={14} />
                    </div>
                    <span>Создать заявку</span>
                </button>
            </CabinetPageHeader>

            <div className="glass-card p-1 rounded-[32px] min-h-[600px] flex flex-col relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 via-transparent to-purple-600/5 rounded-[32px] pointer-events-none"></div>

                <div className="bg-[#050B14]/80 backdrop-blur-xl rounded-[30px] p-6 md:p-8 border border-white/5 relative z-10 flex-1 flex flex-col">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

                    {/* Controls */}
                    <div
                        className="flex flex-col xl:flex-row justify-between gap-6 mb-8 border-b border-white/5 pb-6 animate-slide-up opacity-0 relative z-10"
                        style={{ animationDelay: '100ms' }}
                    >
                        {/* Tabs */}
                        <div className="flex p-1.5 bg-[#0F172A]/80 rounded-2xl border border-white/5 w-fit">
                            {[
                                { id: 'all', label: 'Все заявки' },
                                { id: 'active', label: 'В работе' },
                                { id: 'history', label: 'История' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                            ? 'text-white shadow-lg'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-blue-600 rounded-xl"
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search & Filter */}
                        <div className="flex items-center gap-4">
                            <div className="relative group w-full md:w-80">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="text-white/30 group-focus-within:text-[#06B6D4] transition-colors" size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Поиск по номеру или названию..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-[#0F172A]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                />
                            </div>
                            <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all hover:border-white/20">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-4 flex-1 relative z-10">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                <div className="w-10 h-10 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
                                <p className="text-white/30 font-medium">Загрузка данных...</p>
                            </div>
                        ) : filteredServices.length > 0 ? (
                            <AnimatePresence mode='popLayout'>
                                {filteredServices.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        layout
                                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1], delay: index * 0.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                        <div className="relative flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-[#06B6D4]/30 hover:bg-[#0F172A]/60 transition-all cursor-pointer group-hover:translate-x-1 duration-300">
                                            <div className="flex items-start gap-5 mb-4 md:mb-0">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06B6D4]/10 to-blue-600/10 flex items-center justify-center border border-white/5 group-hover:border-[#06B6D4]/30 group-hover:scale-110 transition-all duration-300">
                                                    <Briefcase size={24} className="text-[#06B6D4] group-hover:text-white transition-colors" />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-bold text-white text-lg group-hover:text-[#06B6D4] transition-colors">{service.title}</h3>
                                                        <span className="text-white/20 text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5">#{service.id}</span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                                                        <span className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></div>
                                                            {service.service_type || service.serviceType}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 opacity-60">
                                                            <Clock size={14} />
                                                            {new Date(service.updated_at || service.lastUpdate).toLocaleDateString()}
                                                        </span>
                                                        {service.assigned_to && (
                                                            <span className="flex items-center gap-1.5 text-white/40">
                                                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                                                                    {(service.assigned_to.first_name || service.assigned_to)[0]}
                                                                </div>
                                                                {service.assigned_to.first_name || service.assigned_to}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-8 pl-20 md:pl-0 border-t md:border-0 border-white/5 pt-4 md:pt-0">
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-white mb-1">{(service.price || 0).toLocaleString()} ₽</div>
                                                    <StatusBadge status={service.status} label={SERVICE_STATUSES[service.status]?.label || service.status_display} />
                                                </div>

                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:bg-[#06B6D4] group-hover:text-white transition-all transform group-hover:translate-x-1 duration-300 shadow-lg">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                                <div className="w-24 h-24 rounded-full bg-[#06B6D4]/5 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                    <Search size={40} className="text-[#06B6D4]/40" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Заявки не найдены</h3>
                                <p className="text-white/40 text-center max-w-sm mb-8">
                                    {searchQuery ? "Попробуйте изменить параметры поиска или фильтры" : "У вас пока нет активных заявок. Создайте новую, чтобы начать работу."}
                                </p>
                                {!searchQuery && (
                                    <button className="px-8 py-3 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] font-bold rounded-xl hover:bg-[#06B6D4] hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                        Создать первую заявку
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetServices;
