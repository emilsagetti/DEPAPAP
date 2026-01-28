import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

const JobApplicationModal = ({ isOpen, onClose, vacancyTitle }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        link: '', // Resume link or portfolio
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            await api.post('dashboard/career/apply/', {
                ...formData,
                vacancy: vacancyTitle
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', phone: '', email: '', link: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Error submitting application:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#050B14]/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]" />

                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Отклик на вакансию</h3>
                                    <p className="text-[#9EACB7] text-sm mt-1">{vacancyTitle}</p>
                                </div>
                                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[#9EACB7] hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            {status === 'success' ? (
                                <div className="py-12 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h4>
                                    <p className="text-[#9EACB7]">Мы свяжемся с вами в ближайшее время.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#9EACB7] mb-1.5">Имя</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#06B6D4]/50 transition-colors"
                                            placeholder="Иван Иванов"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#9EACB7] mb-1.5">Телефон</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#06B6D4]/50 transition-colors"
                                                placeholder="+7 (999)..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#9EACB7] mb-1.5">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#06B6D4]/50 transition-colors"
                                                placeholder="example@mail.ru"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#9EACB7] mb-1.5">Ссылка на резюме / Портфолио</label>
                                        <input
                                            type="text"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#06B6D4]/50 transition-colors"
                                            placeholder="hh.ru/resume/..."
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                                            Произошла ошибка. Пожалуйста, попробуйте позже.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Отправка...
                                            </>
                                        ) : (
                                            <>
                                                Отправить отклик
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JobApplicationModal;
