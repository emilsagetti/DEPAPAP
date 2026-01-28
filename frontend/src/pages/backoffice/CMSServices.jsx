import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit, Plus, Trash2, X, Check,
    FileText, DollarSign, Clock, GripVertical
} from 'lucide-react';

const CMSServices = () => {
    const [editingService, setEditingService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Mock services data
    const [services, setServices] = useState([
        {
            id: 1,
            name: 'Регистрация ООО',
            description: 'Полное сопровождение регистрации общества с ограниченной ответственностью',
            price: 15000,
            duration: '5-7 дней',
            isActive: true,
            order: 1
        },
        {
            id: 2,
            name: 'Регистрация ИП',
            description: 'Регистрация индивидуального предпринимателя под ключ',
            price: 5000,
            duration: '3-5 дней',
            isActive: true,
            order: 2
        },
        {
            id: 3,
            name: 'Ликвидация юр. лица',
            description: 'Добровольная ликвидация ООО или АО',
            price: 35000,
            duration: '3-6 месяцев',
            isActive: true,
            order: 3
        },
        {
            id: 4,
            name: 'Составление договора',
            description: 'Разработка договора любой сложности',
            price: 8000,
            duration: '2-3 дня',
            isActive: true,
            order: 4
        },
        {
            id: 5,
            name: 'Правовая экспертиза',
            description: 'Анализ документов и выявление правовых рисков',
            price: 12000,
            duration: '1-2 дня',
            isActive: true,
            order: 5
        },
        {
            id: 6,
            name: 'Судебное представительство',
            description: 'Представление интересов в арбитражных судах',
            price: 50000,
            duration: 'от 1 месяца',
            isActive: false,
            order: 6
        },
    ]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const handleEdit = (service) => {
        setEditingService({ ...service });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingService) {
            if (editingService.id) {
                setServices(prev => prev.map(s =>
                    s.id === editingService.id ? editingService : s
                ));
            } else {
                setServices(prev => [...prev, { ...editingService, id: Date.now(), order: prev.length + 1 }]);
            }
        }
        setShowModal(false);
        setEditingService(null);
    };

    const handleAdd = () => {
        setEditingService({
            id: null,
            name: '',
            description: '',
            price: 0,
            duration: '',
            isActive: true
        });
        setShowModal(true);
    };

    const toggleActive = (id) => {
        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Услуги</h1>
                    <p className="text-slate-500">Управление списком услуг на сайте</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
                >
                    <Plus size={18} />
                    Добавить услугу
                </button>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-10"></th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Услуга</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Цена</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Срок</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
                            <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((service, index) => (
                            <motion.tr
                                key={service.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className={`hover:bg-slate-50 ${!service.isActive ? 'opacity-50' : ''}`}
                            >
                                <td className="px-5 py-4">
                                    <GripVertical size={16} className="text-slate-300 cursor-grab" />
                                </td>
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="font-medium text-slate-900">{service.name}</p>
                                        <p className="text-sm text-slate-500 max-w-md truncate">{service.description}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="font-medium text-slate-900">₽{formatPrice(service.price)}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500 flex items-center gap-1">
                                        <Clock size={14} />
                                        {service.duration}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => toggleActive(service.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${service.isActive ? 'bg-green-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <motion.span
                                            animate={{ x: service.isActive ? 24 : 4 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="absolute h-4 w-4 rounded-full bg-white shadow-sm"
                                        />
                                    </button>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={16} className="text-slate-500" />
                                        </button>
                                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                            <Trash2 size={16} className="text-slate-400" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {showModal && editingService && (
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
                            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {editingService.id ? 'Редактировать услугу' : 'Новая услуга'}
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
                                        value={editingService.name}
                                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                        placeholder="Название услуги"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
                                    <textarea
                                        value={editingService.description}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
                                        placeholder="Описание услуги"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Цена (₽)</label>
                                        <input
                                            type="number"
                                            value={editingService.price}
                                            onChange={(e) => setEditingService({ ...editingService, price: parseInt(e.target.value) || 0 })}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Срок</label>
                                        <input
                                            type="text"
                                            value={editingService.duration}
                                            onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                            placeholder="3-5 дней"
                                        />
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingService.isActive}
                                        onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-sm text-slate-700">Активна</span>
                                </label>
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

export default CMSServices;
