import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Tag, Check, X, Edit, Plus, Trash2,
    DollarSign, Clock, Users, Star
} from 'lucide-react';

const CMSTariffs = () => {
    const [editingTariff, setEditingTariff] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Mock tariffs data
    const [tariffs, setTariffs] = useState([
        {
            id: 1,
            name: 'Базовый',
            price: 4900,
            period: 'месяц',
            description: 'Для начинающих предпринимателей',
            features: [
                'До 5 консультаций в месяц',
                'Базовая проверка документов',
                'Email поддержка',
                'Доступ к шаблонам',
            ],
            isPopular: false,
            isActive: true
        },
        {
            id: 2,
            name: 'Бизнес',
            price: 14900,
            period: 'месяц',
            description: 'Для малого и среднего бизнеса',
            features: [
                'Неограниченные консультации',
                'Полная проверка документов',
                'Приоритетная поддержка 24/7',
                'Персональный юрист',
                'Составление договоров',
            ],
            isPopular: true,
            isActive: true
        },
        {
            id: 3,
            name: 'Корпоративный',
            price: 49900,
            period: 'месяц',
            description: 'Для крупных компаний',
            features: [
                'Всё из тарифа "Бизнес"',
                'Команда юристов',
                'Представительство в суде',
                'Аудит бизнес-процессов',
                'Выездные консультации',
                'SLA 99.9%'
            ],
            isPopular: false,
            isActive: true
        },
    ]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const handleEdit = (tariff) => {
        setEditingTariff({ ...tariff });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingTariff) {
            setTariffs(prev => prev.map(t =>
                t.id === editingTariff.id ? editingTariff : t
            ));
        }
        setShowModal(false);
        setEditingTariff(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Тарифы</h1>
                    <p className="text-slate-500">Управление тарифными планами</p>
                </div>
            </div>

            {/* Tariffs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tariffs.map((tariff, index) => (
                    <motion.div
                        key={tariff.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-2xl border-2 p-6 relative ${tariff.isPopular
                                ? 'border-purple-500 shadow-lg shadow-purple-500/10'
                                : 'border-slate-200'
                            }`}
                    >
                        {tariff.isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                    <Star size={12} fill="currentColor" />
                                    Популярный
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">{tariff.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{tariff.description}</p>
                            <div className="mt-4">
                                <span className="text-3xl font-bold text-slate-900">₽{formatPrice(tariff.price)}</span>
                                <span className="text-slate-500">/{tariff.period}</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {tariff.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(tariff)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-xl transition-colors"
                            >
                                <Edit size={16} />
                                Редактировать
                            </button>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className={`text-xs font-medium ${tariff.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                                {tariff.isActive ? 'Активен' : 'Неактивен'}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {showModal && editingTariff && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Редактировать тариф
                                </h3>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
                                    <input
                                        type="text"
                                        value={editingTariff.name}
                                        onChange={(e) => setEditingTariff({ ...editingTariff, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Цена (₽)</label>
                                    <input
                                        type="number"
                                        value={editingTariff.price}
                                        onChange={(e) => setEditingTariff({ ...editingTariff, price: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
                                    <input
                                        type="text"
                                        value={editingTariff.description}
                                        onChange={(e) => setEditingTariff({ ...editingTariff, description: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editingTariff.isPopular}
                                            onChange={(e) => setEditingTariff({ ...editingTariff, isPopular: e.target.checked })}
                                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className="text-sm text-slate-700">Популярный</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={editingTariff.isActive}
                                            onChange={(e) => setEditingTariff({ ...editingTariff, isActive: e.target.checked })}
                                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className="text-sm text-slate-700">Активен</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CMSTariffs;
