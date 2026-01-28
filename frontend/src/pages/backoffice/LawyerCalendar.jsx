import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar as CalendarIcon, ChevronLeft, ChevronRight,
    Clock, User, Video, Phone, MapPin, Plus, X
} from 'lucide-react';

const LawyerCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);

    const events = [
        { id: 1, title: 'Консультация - ООО "Ромашка"', date: '2026-01-11', time: '10:00', duration: 60, type: 'video', client: 'Иван Петров' },
        { id: 2, title: 'Встреча в суде', date: '2026-01-11', time: '14:00', duration: 120, type: 'inperson', client: 'АО "СтройИнвест"' },
        { id: 3, title: 'Звонок - ИП Петров', date: '2026-01-12', time: '09:30', duration: 30, type: 'phone', client: 'Петров А.В.' },
        { id: 4, title: 'Консультация онлайн', date: '2026-01-13', time: '11:00', duration: 60, type: 'video', client: 'ООО "ТехноПром"' },
        { id: 5, title: 'Подписание договора', date: '2026-01-14', time: '15:00', duration: 45, type: 'inperson', client: 'Сидорова М.И.' },
    ];

    const typeIcons = {
        video: <Video size={16} className="text-blue-500" />,
        phone: <Phone size={16} className="text-green-500" />,
        inperson: <MapPin size={16} className="text-amber-500" />
    };

    const typeColors = {
        video: 'bg-blue-100 border-blue-300',
        phone: 'bg-green-100 border-green-300',
        inperson: 'bg-amber-100 border-amber-300'
    };

    // Calendar helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

        const days = [];

        // Previous month days
        const prevMonth = new Date(year, month, 0);
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonth.getDate() - i),
                isCurrentMonth: false
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            });
        }

        return days;
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const getEventsForDate = (date) => {
        return events.filter(e => e.date === formatDate(date));
    };

    const isToday = (date) => {
        const today = new Date();
        return formatDate(date) === formatDate(today);
    };

    const days = getDaysInMonth(currentDate);
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const navigateMonth = (delta) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
    };

    const todayEvents = events.filter(e => e.date === formatDate(new Date()));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
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
                    <h1 className="text-2xl font-bold text-slate-900">Календарь</h1>
                    <p className="text-slate-500">Управление расписанием</p>
                </div>
                <button
                    onClick={() => setShowEventModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                    <Plus size={18} />
                    Новое событие
                </button>
            </div>

            <div className="flex gap-6">
                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigateMonth(-1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button
                            onClick={() => navigateMonth(1)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Week days header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, i) => {
                            const dayEvents = getEventsForDate(day.date);
                            const isSelected = selectedDate && formatDate(day.date) === formatDate(selectedDate);

                            return (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedDate(day.date)}
                                    className={`aspect-square p-1 rounded-xl relative transition-colors ${!day.isCurrentMonth ? 'text-slate-300' :
                                            isToday(day.date) ? 'bg-depa-cta text-white' :
                                                isSelected ? 'bg-blue-100 text-blue-700' :
                                                    'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{day.date.getDate()}</span>
                                    {dayEvents.length > 0 && (
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                            {dayEvents.slice(0, 3).map((_, idx) => (
                                                <span key={idx} className={`w-1.5 h-1.5 rounded-full ${isToday(day.date) ? 'bg-white' : 'bg-blue-500'}`} />
                                            ))}
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Today's Events Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-80 flex-shrink-0"
                >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-900 mb-4">
                            {selectedDate
                                ? selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
                                : 'Сегодня'
                            }
                        </h3>

                        <div className="space-y-3">
                            {(selectedDate ? getEventsForDate(selectedDate) : todayEvents).length === 0 ? (
                                <p className="text-slate-400 text-center py-8">Нет событий</p>
                            ) : (
                                (selectedDate ? getEventsForDate(selectedDate) : todayEvents).map((event, i) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-4 rounded-xl border-l-4 ${typeColors[event.type]}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                {typeIcons[event.type]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900 truncate">{event.title}</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                    <Clock size={14} />
                                                    <span>{event.time}</span>
                                                    <span>•</span>
                                                    <span>{event.duration} мин</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                                    <User size={14} />
                                                    <span>{event.client}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* New Event Modal */}
            <AnimatePresence>
                {showEventModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowEventModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">Новое событие</h3>
                                <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        placeholder="Консультация с клиентом"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Дата</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Время</label>
                                        <input
                                            type="time"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Тип</label>
                                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                                        <option value="video">Видеозвонок</option>
                                        <option value="phone">Телефон</option>
                                        <option value="inperson">Личная встреча</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Клиент</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        placeholder="Имя клиента или компании"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Отмена
                                </button>
                                <button className="flex-1 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                                    Создать
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LawyerCalendar;
