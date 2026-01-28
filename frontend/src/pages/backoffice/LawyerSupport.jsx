import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, Monitor, BookOpen, UserCog, MessageSquare, Send, ChevronRight } from 'lucide-react';

const SupportChannel = ({ icon: Icon, title, desc, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl border transition-all group relative overflow-hidden ${active
                ? 'bg-[#06B6D4]/10 border-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
            }`}
    >
        <div className="flex items-start gap-4 z-10 relative">
            <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-[#06B6D4] text-white' : 'bg-white/10 text-white/50 group-hover:text-white'
                }`}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className={`font-bold text-lg mb-1 transition-colors ${active ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    </button>
);

const LawyerSupport = () => {
    const [selectedChannel, setSelectedChannel] = useState('tech'); // tech, method, admin

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-8">

            {/* Left Column: Channels */}
            <div className="w-full md:w-1/3 space-y-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Поддержка</h1>
                    <p className="text-slate-400 mb-6">Выберите направление обращения</p>
                </div>

                <SupportChannel
                    icon={Monitor}
                    title="Техническая поддержка"
                    desc="Проблемы с доступом, ошибки в CRM, настройка почты или VPN."
                    active={selectedChannel === 'tech'}
                    onClick={() => setSelectedChannel('tech')}
                />
                <SupportChannel
                    icon={BookOpen}
                    title="Методология и Право"
                    desc="Вопросы старшим партнерам, сложные кейсы, конфликт интересов."
                    active={selectedChannel === 'method'}
                    onClick={() => setSelectedChannel('method')}
                />
                <SupportChannel
                    icon={UserCog}
                    title="HR и Администрирование"
                    desc="Отпуска, больничные, заказ пропусков, командировочные."
                    active={selectedChannel === 'admin'}
                    onClick={() => setSelectedChannel('admin')}
                />
            </div>

            {/* Right Column: Chat/Form Interface */}
            <div className="flex-1 bg-[#1E293B]/60 backdrop-blur-md border border-white/5 rounded-3xl flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0F172A]/50">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            {selectedChannel === 'tech' && <Monitor className="text-[#06B6D4]" />}
                            {selectedChannel === 'method' && <BookOpen className="text-purple-400" />}
                            {selectedChannel === 'admin' && <UserCog className="text-orange-400" />}

                            {selectedChannel === 'tech' && 'IT Отдел'}
                            {selectedChannel === 'method' && 'Совет Партнеров'}
                            {selectedChannel === 'admin' && 'HR Департамент'}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {selectedChannel === 'tech' && 'Среднее время ответа: 10 мин'}
                            {selectedChannel === 'method' && 'Среднее время ответа: 4 часа'}
                            {selectedChannel === 'admin' && 'Среднее время ответа: 1 час'}
                        </p>
                    </div>
                </div>

                {/* Chat Area (Empty State) */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center opacity-50">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <MessageSquare size={32} className="text-white/30" />
                    </div>
                    <p className="text-slate-400 max-w-sm">
                        Напишите ваш вопрос. История переписки будет сохранена в этом разделе.
                    </p>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#0F172A]/30">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Опишите проблему или вопрос..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#06B6D4] transition-colors"
                        />
                        <button className="absolute right-2 top-2 bottom-2 aspect-square bg-[#06B6D4] hover:bg-[#0891b2] text-white rounded-lg flex items-center justify-center transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                    <div className="flex gap-4 mt-3 px-2">
                        <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                            Прикрепить скриншот
                        </button>
                        <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                            Записать голосовое
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerSupport;
