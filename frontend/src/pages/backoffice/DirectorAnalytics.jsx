import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Users, DollarSign,
    ShoppingCart, Eye, Calendar, ArrowUpRight, ArrowDownRight,
    BarChart3
} from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';

// Simple Bar Chart Component
const SimpleBarChart = ({ data, height = 200 }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="flex items-end justify-between gap-2" style={{ height }}>
            {data.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className="flex-1 flex flex-col items-center gap-2"
                >
                    <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer relative group"
                        style={{ height: '100%' }}
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ₽{item.value.toLocaleString('ru-RU')}
                        </div>
                    </div>
                    <span className="text-xs text-slate-500">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

// Simple Line indicator
const TrendLine = ({ data, color = 'blue' }) => {
    const points = data.map((val, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - ((val - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 100
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-16" preserveAspectRatio="none">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                d={pathD}
                fill="none"
                stroke={color === 'green' ? '#22c55e' : color === 'red' ? '#ef4444' : '#3b82f6'}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

const StatCard = ({ icon: Icon, label, value, numericValue, trend, trendValue, color, delay = 0, sparkline }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 0.1 }}
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={24} className="text-white" />
            </div>
            {trend && (
                <span className={`flex items-center gap-0.5 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trendValue}
                </span>
            )}
        </div>

        {sparkline && (
            <div className="mb-3">
                <TrendLine data={sparkline} color={trend === 'up' ? 'green' : trend === 'down' ? 'red' : 'blue'} />
            </div>
        )}

        <p className="text-2xl font-bold text-slate-900">
            {numericValue !== undefined ? (
                <AnimatedCounter
                    value={numericValue}
                    prefix={value.startsWith('₽') ? '₽' : ''}
                    suffix={value.includes('%') ? '%' : ''}
                />
            ) : value}
        </p>
        <p className="text-sm text-slate-500">{label}</p>
    </motion.div>
);

const DirectorAnalytics = () => {
    const [period, setPeriod] = useState('month');

    const stats = [
        {
            icon: DollarSign,
            label: 'Выручка',
            value: '₽2,847,000',
            numericValue: 2847000,
            trend: 'up',
            trendValue: '+18%',
            color: 'from-green-500 to-green-600',
            sparkline: [100, 120, 115, 140, 160, 155, 180]
        },
        {
            icon: Users,
            label: 'Активных клиентов',
            value: '342',
            numericValue: 342,
            trend: 'up',
            trendValue: '+12%',
            color: 'from-blue-500 to-blue-600',
            sparkline: [280, 290, 300, 310, 320, 335, 342]
        },
        {
            icon: ShoppingCart,
            label: 'Новых заказов',
            value: '156',
            numericValue: 156,
            trend: 'up',
            trendValue: '+23%',
            color: 'from-purple-500 to-purple-600',
            sparkline: [100, 110, 105, 130, 140, 145, 156]
        },
        {
            icon: Eye,
            label: 'Посещений сайта',
            value: '12,847',
            numericValue: 12847,
            trend: 'down',
            trendValue: '-5%',
            color: 'from-amber-500 to-amber-600',
            sparkline: [14000, 13500, 13200, 12800, 12900, 12700, 12847]
        },
    ];

    const monthlyRevenue = [
        { label: 'Янв', value: 1850000 },
        { label: 'Фев', value: 2100000 },
        { label: 'Мар', value: 1950000 },
        { label: 'Апр', value: 2400000 },
        { label: 'Май', value: 2200000 },
        { label: 'Июн', value: 2650000 },
        { label: 'Июл', value: 2847000 },
    ];

    const topServices = [
        { name: 'Регистрация ООО', count: 47, revenue: 705000 },
        { name: 'Составление договора', count: 89, revenue: 712000 },
        { name: 'Судебное представительство', count: 12, revenue: 600000 },
        { name: 'Правовая экспертиза', count: 34, revenue: 408000 },
        { name: 'Регистрация ИП', count: 56, revenue: 280000 },
    ];

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
                    <h1 className="text-2xl font-bold text-slate-900">Аналитика</h1>
                    <p className="text-slate-500">Ключевые показатели бизнеса</p>
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                    {['week', 'month', 'year'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${period === p
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {p === 'week' ? 'Неделя' : p === 'month' ? 'Месяц' : 'Год'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-slate-900">Выручка по месяцам</h3>
                        <span className="text-sm text-slate-500">2026</span>
                    </div>
                    <SimpleBarChart data={monthlyRevenue} height={200} />
                </motion.div>

                {/* Top Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-semibold text-slate-900 mb-6">Топ услуг</h3>
                    <div className="space-y-4">
                        {topServices.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 text-center">
                                    <span className="text-lg font-bold text-slate-300">#{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900">{service.name}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>{service.count} заказов</span>
                                        <span>₽{service.revenue.toLocaleString('ru-RU')}</span>
                                    </div>
                                </div>
                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(service.revenue / topServices[0].revenue) * 100}%` }}
                                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Conversion Funnel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
                <h3 className="font-semibold text-slate-900 mb-6">Воронка конверсии</h3>
                <div className="flex items-center justify-between gap-4">
                    {[
                        { label: 'Посетители', value: 12847, percent: 100 },
                        { label: 'Регистрации', value: 1847, percent: 14.4 },
                        { label: 'Заявки', value: 523, percent: 4.1 },
                        { label: 'Оплаты', value: 156, percent: 1.2 },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className="flex-1 text-center"
                        >
                            <div
                                className="mx-auto mb-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold"
                                style={{
                                    width: `${40 + (100 - step.percent) * 0.6}%`,
                                    height: 60 + i * 5
                                }}
                            >
                                <AnimatedCounter value={step.value} />
                            </div>
                            <p className="font-medium text-slate-900">{step.label}</p>
                            <p className="text-sm text-slate-500">{step.percent}%</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DirectorAnalytics;
