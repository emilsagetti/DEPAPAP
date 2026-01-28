import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Video, MoreHorizontal } from 'lucide-react';

const LawyerPlanner = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedView, setSelectedView] = useState('month'); // month, week, day
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    // Helper to get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        return { days, firstDay: adjustedFirstDay };
    };

    const monthData = getDaysInMonth(currentDate);

    // Mock events
    const events = [
        { id: 1, title: 'Судебное заседание (Иванов И.И.)', date: 15, time: '10:00', duration: 90, type: 'court', color: 'bg-red-500', border: 'border-red-500', bg: 'from-red-500/20 to-red-600/10', text: 'text-red-200' },
        { id: 2, title: 'Консультация (ООО "Вектор")', date: 18, time: '14:30', duration: 60, type: 'meeting', color: 'bg-blue-500', border: 'border-blue-500', bg: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-200' },
        { id: 3, title: 'Подготовка документов', date: 22, time: '11:00', duration: 120, type: 'task', color: 'bg-emerald-500', border: 'border-emerald-500', bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-200' },
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // --- DAY VIEW RENDERER ---
    const renderDayView = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        // Calculate current time position for indicator
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        // Mock daily events for demo (mapped relative to time)
        // Let's ensure we show some events regardless of the date for the visual demo
        const dailyEvents = [
            { id: 101, title: 'Совещание с партнерами', startHour: 10, startMin: 0, duration: 90, color: 'bg-purple-500', border: 'border-purple-500', bg: 'from-purple-500/20 to-purple-600/10', text: 'text-purple-200' },
            { id: 102, title: 'Обед', startHour: 13, startMin: 30, duration: 45, color: 'bg-amber-500', border: 'border-amber-500', bg: 'from-amber-500/20 to-amber-600/10', text: 'text-amber-200' },
            { id: 103, title: 'Анализ договора поставки', startHour: 15, startMin: 0, duration: 120, color: 'bg-emerald-500', border: 'border-emerald-500', bg: 'from-emerald-500/20 to-emerald-600/10', text: 'text-emerald-200' },
        ];

        return (
            <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[700px] relative">
                {/* Scrollable Area */}
                <div className="overflow-y-auto custom-scrollbar flex-1 relative" style={{ scrollBehavior: 'smooth' }}>
                    <div className="relative min-h-[1440px]"> {/* 24 hours * 60px */}
                        {hours.map(hour => (
                            <div key={hour} className="flex h-[60px] group border-b border-white/5 last:border-0 relative">
                                {/* Time Column */}
                                <div className="w-20 flex-shrink-0 flex items-start justify-center pt-2 border-r border-white/5 text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors bg-[#0F172A]/30 sticky left-0 z-10">
                                    {String(hour).padStart(2, '0')}:00
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 relative hover:bg-white/[0.01] transition-colors cursor-crosshair">
                                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.02] pointer-events-none" />
                                </div>
                            </div>
                        ))}

                        {/* Events Overlay */}
                        {dailyEvents.map(event => {
                            const top = (event.startHour * 60) + event.startMin;
                            const height = event.duration;
                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`absolute left-20 right-4 rounded-lg border-l-2 ${event.border} bg-gradient-to-r ${event.bg} px-4 py-2 cursor-pointer hover:brightness-110 transition-all shadow-sm z-10`}
                                    style={{ top: `${top}px`, height: `${height}px` }}
                                >
                                    <div className={`text-xs font-bold ${event.text} mb-0.5`}>
                                        {String(event.startHour).padStart(2, '0')}:{String(event.startMin).padStart(2, '0')} -
                                        {String(Math.floor((top + height) / 60)).padStart(2, '0')}:{String((top + height) % 60).padStart(2, '0')}
                                    </div>
                                    <div className="text-sm font-medium text-white">{event.title}</div>
                                </motion.div>
                            );
                        })}

                        {/* Current Time Indicator */}
                        <div
                            className="absolute left-0 right-0 flex items-center pointer-events-none z-20 transition-all duration-1000"
                            style={{ top: `${currentMinutes}px` }}
                        >
                            <div className="w-20 flex justify-end pr-2">
                                <span className="text-[10px] font-bold text-cyan-400 bg-[#0F172A] px-1.5 py-0.5 rounded shadow-lg border border-cyan-500/20">
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex-1 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                            <div className="w-2 h-2 rounded-full bg-cyan-400 -ml-1 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Планировщик</h1>
                    <p className="text-slate-400">Расписание заседаний и встреч</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                        {['month', 'week', 'day'].map((view) => (
                            <button
                                key={view}
                                onClick={() => setSelectedView(view)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedView === view
                                        ? 'bg-[#06B6D4]/10 text-[#06B6D4] shadow-sm'
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {view === 'month' ? 'Месяц' : view === 'week' ? 'Неделя' : 'День'}
                            </button>
                        ))}
                    </div>
                    <button className="px-4 py-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                        <Plus size={18} />
                        <span className="hidden sm:inline">Событие</span>
                    </button>
                </div>
            </div>

            {/* Calendar Controls (Shown only for Month view mostly, but adaptable) */}
            <div className="flex items-center justify-between bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold text-white w-40 text-center">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setCurrentDate(new Date()); setSelectedView('day'); }}
                        className="px-3 py-1.5 text-sm text-slate-400 hover:text-white border border-white/10 rounded-lg transition-colors"
                    >
                        Сегодня
                    </button>
                </div>
            </div>

            {/* View Switcher Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {selectedView === 'day' ? renderDayView() : (
                        <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                                {weekDays.map((day, i) => (
                                    <div key={i} className="py-4 text-center text-sm font-medium text-slate-400 border-r border-white/5 last:border-r-0">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)]">
                                {/* Empty cells for start of month */}
                                {Array.from({ length: monthData.firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="bg-white/[0.01] border-b border-r border-white/5 last:border-r-0" />
                                ))}

                                {/* Days */}
                                {Array.from({ length: monthData.days }).map((_, i) => {
                                    const dayNum = i + 1;
                                    const dayEvents = events.filter(e => e.date === dayNum);
                                    const isToday = dayNum === new Date().getDate() &&
                                        currentDate.getMonth() === new Date().getMonth() &&
                                        currentDate.getFullYear() === new Date().getFullYear();

                                    return (
                                        <div
                                            key={dayNum}
                                            className={`group min-h-[120px] p-2 border-b border-r border-white/5 hover:bg-white/[0.02] transition-colors relative ${(monthData.firstDay + i + 1) % 7 === 0 ? 'border-r-0' : ''
                                                }`}
                                        >
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-2 ${isToday ? 'bg-[#06B6D4] text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400 group-hover:text-white'
                                                }`}>
                                                {dayNum}
                                            </div>

                                            <div className="space-y-1.5">
                                                {dayEvents.map(event => (
                                                    <motion.div
                                                        key={event.id}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="px-2 py-1.5 rounded-lg bg-[#0F172A] border border-white/10 hover:border-white/20 cursor-pointer shadow-sm group/event"
                                                    >
                                                        <div className="flex items-center gap-1.5 mb-1">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${event.color}`} />
                                                            <span className="text-[10px] text-slate-400 font-medium">{event.time}</span>
                                                        </div>
                                                        <p className="text-xs text-white leading-tight line-clamp-2group-hover/event:text-[#06B6D4] transition-colors">
                                                            {event.title}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Add Button (Hover) */}
                                            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LawyerPlanner;
