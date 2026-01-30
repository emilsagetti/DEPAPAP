import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupportWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Sending message:', message);
            // 这里 можно добавить логику отправки
            setMessage('');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[350px] h-[500px] bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#1E293B]/50 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/20 relative">
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0F172A]"></div>
                                    <MessageCircle size={20} className="text-[#06B6D4]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Поддержка DEPA</h3>
                                    <p className="text-xs text-slate-400">Мы онлайн! Отвечаем быстро.</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleOpen}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body / Chat Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0F172A]/80">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex-shrink-0 flex items-center justify-center border border-[#06B6D4]/20">
                                    <span className="text-xs font-bold text-[#06B6D4]">D</span>
                                </div>
                                <div className="bg-[#1E293B] p-3 rounded-2xl rounded-tl-none border border-white/5 text-sm text-slate-300 max-w-[85%]">
                                    <p>Здравствуйте! Чем я могу помочь вам сегодня?</p>
                                    <span className="text-[10px] text-slate-500 mt-1 block text-right">Just now</span>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#1E293B]/50 border-t border-white/5">
                            <form onSubmit={handleSend} className="relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Напишите сообщение..."
                                    className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#06B6D4]/50 placeholder:text-slate-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#06B6D4] hover:bg-[#0891B2] rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!message.trim()}
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleOpen}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all duration-300 ${isOpen ? 'bg-[#1E293B] border border-white/10' : 'bg-[#06B6D4] hover:bg-[#0891B2]'}`}
            >
                {/* Ping Animation logic for when closed */}
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-20 animate-ping"></span>
                )}

                <div className="relative flex items-center justify-center">
                    {isOpen ? (
                        <X size={24} className="text-white" />
                    ) : (
                        <MessageCircle size={26} className="text-white fill-white/20" />
                    )}
                </div>
            </motion.button>
        </div>
    );
};

export default SupportWidget;
