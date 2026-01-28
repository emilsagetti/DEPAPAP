import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, Plus, FileText, CreditCard, Monitor, HelpCircle, Lightbulb, ChevronRight, AlertCircle, Paperclip } from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const CabinetSupport = () => {
    // ... state ...
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({
        subject: '',
        category: '',
        description: '',
        priority: 'normal',
        files: null
    });
    const [tickets, setTickets] = useState([
        { id: 1024, subject: 'Не проходит оплата картой', status: 'closed', date: '21.05.2024', category: 'payment' },
        { id: 1045, subject: 'Как сменить тариф?', status: 'answered', date: '25.05.2024', category: 'tariff' }
    ]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Categories Data
    const categories = [
        { id: 'login', label: 'Проблемы со входом', icon: Monitor, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { id: 'payment', label: 'Ошибка оплаты / счет', icon: CreditCard, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { id: 'cabinet', label: 'Ошибка в личном кабинете', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
        { id: 'docs', label: 'Проблема с документами', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { id: 'improvement', label: 'Предложение по улучшению', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        { id: 'other', label: 'Другое', icon: HelpCircle, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    ];

    // Status Badge Component
    const StatusBadge = ({ status }) => {
        const styles = {
            new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            answered: 'bg-green-500/20 text-green-400 border-green-500/30',
            closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
        };
        const labels = {
            new: 'Новое',
            in_progress: 'В работе',
            answered: 'Ответ получен',
            closed: 'Закрыто',
        };

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.new} animate-scale-in`}>
                {labels[status] || status}
            </span>
        );
    };

    // ... handlers ...
    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        setFormData(prev => ({ ...prev, category: category.id }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, files: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!formData.subject.trim()) newErrors.subject = 'Укажите тему обращения';
        if (!formData.description.trim()) newErrors.description = 'Опишите проблему';
        if (!formData.category) newErrors.category = 'Выберите категорию';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newTicket = {
            id: Math.floor(Math.random() * 1000) + 2000,
            subject: formData.subject,
            status: 'new',
            date: new Date().toLocaleDateString('ru-RU'),
            category: formData.category
        };

        setTickets([newTicket, ...tickets]);
        setFormData({ subject: '', category: '', description: '', priority: 'normal', files: null });
        setSelectedCategory(null);
        setSubmitting(false);
        // Maybe show toast success here
    };



    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-8 animate-fade-in text-white"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <LifeBuoy size={24} />
                        </div>
                        Поддержка
                    </h1>
                    <p className="text-white/50 mt-2 text-sm pl-14 max-w-xl">
                        Мы всегда на связи. Выберите категорию вопроса или опишите проблему, и мы поможем в кратчайшие сроки.
                    </p>
                </div>
                <button
                    onClick={() => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#06B6D4] to-blue-600 hover:from-[#0891B2] hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 duration-300 group"
                >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <Plus size={16} />
                    </div>
                    Создать обращение
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Left Column - Categories */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-2 rounded-[24px] overflow-hidden">
                        <div className="bg-[#050B14]/60 backdrop-blur-xl rounded-[22px] p-4 border border-white/5">
                            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest px-4 mb-4">Категории</h3>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat)}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 border relative overflow-hidden group ${selectedCategory === cat.id
                                            ? 'bg-[#06B6D4]/10 border-[#06B6D4]/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                            : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${cat.bg.replace('/10', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={`p-2.5 rounded-lg ${selectedCategory === cat.id ? 'bg-[#06B6D4] text-white shadow-[0_0_10px_#06B6D4]' : `${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}`}>
                                                <cat.icon size={18} />
                                            </div>
                                            <span className={`text-sm font-medium ${selectedCategory === cat.id ? 'text-white' : ''}`}>{cat.label}</span>
                                        </div>
                                        <ChevronRight size={16} className={`relative z-10 transition-transform duration-300 text-white/30 group-hover:text-white ${selectedCategory === cat.id ? 'rotate-90 text-[#06B6D4]' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ Mini Block */}
                    <div className="glass-card p-6 rounded-[24px] border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#06B6D4]/5 to-transparent opacity-50"></div>
                        <h4 className="text-lg font-bold text-white mb-4 relative z-10">Частые вопросы</h4>
                        <ul className="space-y-3 relative z-10">
                            <li>
                                <a href="#" className="text-sm text-white/60 hover:text-[#06B6D4] transition-colors flex items-center gap-3 group/link p-2 hover:bg-white/5 rounded-lg -mx-2">
                                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[#06B6D4]/20 transition-colors">
                                        <HelpCircle size={14} />
                                    </div>
                                    Как изменить пароль?
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-white/60 hover:text-[#06B6D4] transition-colors flex items-center gap-3 group/link p-2 hover:bg-white/5 rounded-lg -mx-2">
                                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-[#06B6D4]/20 transition-colors">
                                        <FileText size={14} />
                                    </div>
                                    Где скачать закрывающие документы?
                                </a>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Right Column - Create Form */}
                <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
                    <div className="glass-card p-8 rounded-[32px] border border-white/5 relative z-10" id="ticket-form">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

                        <h3 className="text-2xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
                            Создать новое обращение
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Subject */}
                                <div className="space-y-2.5">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Тема обращения <span className="text-[#06B6D4]">*</span></label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Коротко о проблеме"
                                        className={`w-full bg-[#050B14]/50 border ${errors.subject ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#050B14]/80 transition-all placeholder:text-white/20 focus:shadow-[0_0_25px_rgba(6,182,212,0.15)]`}
                                    />
                                    {errors.subject && <p className="text-xs text-red-400 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
                                </div>

                                {/* Category */}
                                <div className="space-y-2.5">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Категория <span className="text-[#06B6D4]">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={`w-full bg-[#050B14]/50 border ${errors.category ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#050B14]/80 transition-all appearance-none cursor-pointer focus:shadow-[0_0_25px_rgba(6,182,212,0.15)]`}
                                        >
                                            <option value="" disabled className="text-gray-500">Выберите категорию из списка</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id} className="bg-[#0F172A] text-white py-2">
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 rotate-90 pointer-events-none" size={18} />
                                    </div>
                                    {errors.category && <p className="text-xs text-red-400 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.category}</p>}
                                </div>
                            </div>

                            {/* Priority */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Приоритет заявки</label>
                                <div className="flex gap-4">
                                    <label className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${formData.priority === 'normal' ? 'bg-[#06B6D4]/10 border-[#06B6D4]/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                        <input
                                            type="radio"
                                            name="priority"
                                            value="normal"
                                            checked={formData.priority === 'normal'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.priority === 'normal' ? 'border-[#06B6D4]' : 'border-white/30'}`}>
                                            {formData.priority === 'normal' && <div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div>}
                                        </div>
                                        <span className={`text-sm font-medium ${formData.priority === 'normal' ? 'text-white' : 'text-white/60'}`}>Обычный приоритет</span>
                                    </label>

                                    <label className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${formData.priority === 'urgent' ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                                        <input
                                            type="radio"
                                            name="priority"
                                            value="urgent"
                                            checked={formData.priority === 'urgent'}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.priority === 'urgent' ? 'border-red-500' : 'border-white/30'}`}>
                                            {formData.priority === 'urgent' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                        </div>
                                        <span className={`text-sm font-medium ${formData.priority === 'urgent' ? 'text-white' : 'text-white/60'}`}>Срочный вопрос</span>
                                    </label>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Подробное описание <span className="text-[#06B6D4]">*</span></label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Опишите ситуацию как можно подробнее..."
                                    className={`w-full bg-[#050B14]/50 border ${errors.description ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20'} rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#050B14]/80 transition-all placeholder:text-white/20 resize-none focus:shadow-[0_0_25px_rgba(6,182,212,0.15)]`}
                                />
                                {errors.description && <p className="text-xs text-red-400 ml-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.description}</p>}
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2.5">
                                <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Приложения</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex items-center gap-3 cursor-pointer w-full p-4 rounded-2xl bg-white/5 border border-dashed border-white/20 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5 transition-all text-sm text-white/60 hover:text-white group-hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                    >
                                        <div className="p-2 bg-white/5 rounded-lg text-white/40 group-hover:text-[#06B6D4] transition-colors">
                                            <Paperclip size={18} />
                                        </div>
                                        {formData.files ? (
                                            <span className="text-[#06B6D4] font-medium">{formData.files.name}</span>
                                        ) : (
                                            <span>Нажмите, чтобы прикрепить файл (скриншот, лог ошибки или документ)</span>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#06B6D4] to-blue-600 hover:from-[#0891B2] hover:to-blue-700 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 duration-200"
                                >
                                    {submitting ? 'Отправка...' : 'Отправить обращение'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Ticket Status Block */}
                    <div className="glass-card p-8 rounded-[32px] border border-white/5 relative z-10 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">История обращений</h3>
                            <div className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded">Всего: {tickets.length}</div>
                        </div>

                        {tickets.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">№</th>
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest w-1/3">Тема</th>
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">Категория</th>
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">Дата</th>
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest">Статус</th>
                                            <th className="py-4 px-4 text-xs font-bold text-white/30 uppercase tracking-widest text-right">Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {tickets.map((ticket) => (
                                            <tr key={ticket.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 px-4 text-sm font-mono text-white/40">#{ticket.id}</td>
                                                <td className="py-4 px-4 text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors">{ticket.subject}</td>
                                                <td className="py-4 px-4 text-sm text-white/60">
                                                    <span className={`px-2 py-1 rounded-lg bg-white/5 text-xs ${categories.find(c => c.id === ticket.category)?.color}`}>
                                                        {categories.find(c => c.id === ticket.category)?.label || ticket.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-white/60 font-mono">{ticket.date}</td>
                                                <td className="py-4 px-4">
                                                    <StatusBadge status={ticket.status} />
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <button className="text-white/40 hover:text-[#06B6D4] p-2 hover:bg-[#06B6D4]/10 rounded-lg transition-all">
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/10">
                                    <FileText size={32} />
                                </div>
                                <p className="text-white/50 font-medium">У вас пока нет обращений в поддержку</p>
                                <p className="text-white/30 text-sm mt-1">Здесь будет отображаться история ваших переписок</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CabinetSupport;
