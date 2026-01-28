import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Scale, ChevronRight, BarChart, ExternalLink, Bookmark } from 'lucide-react';

const ResearchCard = ({ title, type, date, relevance, summary }) => (
    <motion.div
        whileHover={{ y: -2 }}
        className="bg-white/5 border border-white/5 hover:border-[#06B6D4]/30 rounded-2xl p-5 mb-4 cursor-pointer transition-all group"
    >
        <div className="flex justify-between items-start mb-2">
            <div>
                <span className={`text-xs px-2 py-0.5 rounded mr-2 ${type === 'case' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {type === 'case' ? 'Судебный акт' : 'Статья'}
                </span>
                <span className="text-xs text-white/40">{date}</span>
            </div>
            <div className="flex items-center gap-1 text-[#06B6D4] text-xs font-bold">
                {relevance}% релевантность
            </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">{title}</h3>
        <p className="text-sm text-slate-300 line-clamp-2">{summary}</p>
    </motion.div>
);

const AIInsight = () => (
    <div className="bg-gradient-to-b from-[#06B6D4]/20 to-blue-600/10 border border-[#06B6D4]/30 rounded-2xl p-6 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none"><Scale size={64} /></div>
        <h3 className="text-[#06B6D4] font-bold mb-4 flex items-center gap-2 relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
            AI Аналитика практики
        </h3>
        <p className="text-white/90 text-sm mb-4 leading-relaxed relative z-10">
            По запросу <b>«неустойка по ДДУ»</b> проанализировано 12 400 дел за 2024-2025 гг.
        </p>
        <ul className="space-y-3 text-sm text-slate-300 relative z-10">
            <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">82%</span>
                <span>Исков удовлетворяются частично (снижение суммы по ст. 333 ГК РФ).</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold shrink-0">~50%</span>
                <span>Средний размер снижения неустойки судами общей юрисдикции.</span>
            </li>
        </ul>
        <button className="mt-6 w-full py-2 bg-[#06B6D4]/20 hover:bg-[#06B6D4]/30 text-[#06B6D4] rounded-xl text-sm font-medium transition-colors border border-[#06B6D4]/30 relative z-10">
            Скачать полный отчет (AI)
        </button>
    </div>
);

const CabinetResearch = () => {
    const [query, setQuery] = useState('неустойка по дду');

    const results = [
        { title: 'Определение ВС РФ от 12.10.2023 № 45-КГ-23', type: 'case', date: '12 окт 2023', relevance: 98, summary: 'Верховный суд указал на недопустимость произвольного снижения неустойки без соответствующего заявления ответчика...' },
        { title: 'Как взыскать максимальную неустойку с застройщика?', type: 'article', date: '15 янв 2024', relevance: 95, summary: 'Полный гайд по подготовке претензии, расчету суммы иска и стратегии поведения в суде для дольщиков.' },
        { title: 'Решение Московского городского суда по делу А40-...', type: 'case', date: '02 дек 2023', relevance: 88, summary: 'Суд удовлетворил требования истца в полном объеме, отказав в применении статьи 333 ГК РФ ввиду отсутствия доказательств несоразмерности.' },
    ];

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            {/* Search Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">База знаний и аналитика</h1>
                <p className="text-slate-400 mb-6">Поиск по 50+ млн судебных актов и аналитических статей с помощью ИИ.</p>

                <div className="relative max-w-3xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={24} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-lg text-white placeholder-white/30 focus:outline-none focus:border-[#06B6D4] shadow-lg transition-all focus:bg-white/10"
                    />
                    <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#06B6D4] hover:bg-[#0891b2] text-white rounded-xl font-medium transition-colors">
                        Найти
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                {/* Results Column */}
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                    <h2 className="text-white/50 text-sm font-bold uppercase tracking-wider mb-4">Результаты поиска</h2>
                    {results.map((item, i) => (
                        <ResearchCard key={i} {...item} />
                    ))}
                    {results.map((item, i) => (
                        <ResearchCard key={i + 3} {...item} />
                    ))}
                </div>

                {/* Sidebar Stats */}
                <div className="w-96 shrink-0 flex flex-col gap-6 overflow-y-auto pb-4 scrollbar-hide">
                    <AIInsight />

                    <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <BarChart size={18} className="text-white/50" />
                            Динамика исков
                        </h3>
                        {/* Mock Chart */}
                        <div className="h-32 flex items-end gap-2">
                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#06B6D4]/30 hover:bg-[#06B6D4] transition-colors rounded-t" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-white/30 mt-2">
                            <span>Янв</span>
                            <span>Июл</span>
                            <span>Дек</span>
                        </div>
                    </div>

                    <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Bookmark size={18} className="text-white/50" />
                            Сохраненное
                        </h3>
                        <div className="space-y-3">
                            <div className="text-sm text-white hover:text-[#06B6D4] cursor-pointer truncate">• Обзор практики ВС РФ №3 (2023)</div>
                            <div className="text-sm text-white hover:text-[#06B6D4] cursor-pointer truncate">• Статья: Налоговые риски 2024</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetResearch;
