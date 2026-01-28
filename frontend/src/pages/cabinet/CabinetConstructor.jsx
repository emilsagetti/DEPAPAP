import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, Download, Save, PenTool, Sparkles, Check, ChevronRight, RefreshCw, X } from 'lucide-react';

const ConstructorChat = () => {
    return (
        <div className="flex flex-col h-full bg-[#050B14] border-r border-white/5">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <span className="font-medium text-white flex items-center gap-2">
                    <Bot size={18} className="text-[#06B6D4]" />
                    AI-Конструктор
                </span>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">Beta</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* AI Intro */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shrink-0 shadow-lg text-white">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-slate-300">
                        <p>Я подготовил шаблон <b>Договора оказания услуг</b>. Мы можем настроить его под ваши задачи.</p>
                        <p className="mt-2">Уточните, кто будет Исполнителем: компания или ИП?</p>
                    </div>
                </div>

                {/* User Reply */}
                <div className="flex gap-3 flexDirection-row-reverse justify-end">
                    <div className="bg-[#06B6D4]/20 border border-[#06B6D4]/30 rounded-2xl rounded-tr-none p-3 text-sm text-white max-w-[80%]">
                        Исполнитель — ООО "Вектор"
                    </div>
                </div>

                {/* AI Follow-up */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center shrink-0 shadow-lg text-white">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-3 text-sm text-slate-300">
                        <p>Принято. Автоматически подгрузил реквизиты из базы. </p>
                        <p className="mt-2 text-[#06B6D4] flex items-center gap-1">
                            <Sparkles size={14} />
                            <span>Сгенерировал раздел "Ответственность сторон" на основе вашей практики.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Напишите правку (например: измени срок на 30 дней)"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#06B6D4]"
                    />
                    <button className="absolute right-2 top-2 p-1 text-[#06B6D4] hover:bg-white/10 rounded-lg transition-colors">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simple Arrow Right Icon Component for input
const ArrowRight = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

const DocumentPreview = () => {
    return (
        <div className="flex-1 bg-[#1E293B] overflow-hidden flex flex-col relative">
            {/* Toolbar */}
            <div className="h-14 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-6 shadow-md">
                <div className="flex items-center gap-4">
                    <h2 className="text-white font-medium text-sm flex items-center gap-2">
                        <FileText size={18} className="text-white/50" />
                        Договор оказания услуг № 24-10
                    </h2>
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 flex items-center gap-1">
                        <Check size={10} /> Saved
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Export PDF">
                        <Download size={18} />
                    </button>
                    <button className="px-4 py-2 bg-[#06B6D4] hover:bg-[#0891b2] text-white text-sm font-medium rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                        Подписать
                    </button>
                </div>
            </div>

            {/* A4 Paper View */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#334155]/50 flex justify-center">
                <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl p-[25mm] text-[12pt] leading-relaxed relative">

                    {/* Mock Document Content */}
                    <div className="text-center font-bold mb-8 uppercase">
                        Договор возмездного оказания услуг
                    </div>

                    <p className="mb-4 text-justify">
                        г. Москва <span className="float-right">«29» января 2026 г.</span>
                    </p>

                    <p className="mb-4 text-justify">
                        Общество с ограниченной ответственностью <span className="bg-cyan-100 px-1 rounded border-b-2 border-cyan-300">«Вектор»</span>, именуемое в дальнейшем «Заказчик», в лице Генерального директора <span className="bg-cyan-100 px-1 rounded border-b-2 border-cyan-300">Иванова И.И.</span>, действующего на основании Устава, с одной стороны, и
                    </p>

                    <p className="mb-4 text-justify">
                        <span className="bg-blue-100 px-1 rounded">Индивидуальный предприниматель Петров П.П.</span>, именуемый в дальнейшем «Исполнитель», действующий на основании Свидетельства о регистрации, с другой стороны, заключили настоящий Договор о нижеследующем:
                    </p>

                    <h3 className="font-bold mt-6 mb-2">1. Предмет договора</h3>
                    <p className="mb-4 text-justify">
                        1.1. Исполнитель обязуется по заданию Заказчика оказать услуги по <span className="bg-purple-100 px-1 rounded border border-purple-300 relative group cursor-help">
                            юридическому сопровождению сделки
                            {/* AI Suggestion Tooltip Mock */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs p-2 rounded w-48 hidden group-hover:block z-50 text-center shadow-xl">
                                AI: Формулировка оптимизирована для снижения налоговых рисков
                            </div>
                        </span>, а Заказчик обязуется оплатить эти услуги.<br />
                        1.2. Срок оказания услуг: с момента подписания до <span className="bg-cyan-100 px-1 rounded">28 февраля 2026 г.</span>
                    </p>

                    <h3 className="font-bold mt-6 mb-2">2. Стоимость услуг</h3>
                    <p className="mb-4 text-justify">
                        2.1. Стоимость услуг составляет <span className="bg-cyan-100 px-1 rounded">150 000 (Сто пятьдесят тысяч)</span> рублей, НДС не облагается.
                    </p>

                    {/* AI Generated Block */}
                    <div className="relative group border border-dashed border-blue-400/50 p-2 rounded -mx-2 bg-blue-50/50">
                        <div className="absolute -right-6 top-0 text-blue-500 opacity-50"><Sparkles size={16} /></div>
                        <h3 className="font-bold mb-2">3. Ответственность сторон</h3>
                        <p className="mb-1 text-justify text-sm">
                            3.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору Стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

const CabinetConstructor = () => {
    return (
        <div className="h-[calc(100vh-100px)] -m-6 flex overflow-hidden">
            {/* Split View */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-[400px] shrink-0 z-20 shadow-2xl"
            >
                <ConstructorChat />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 min-w-0"
            >
                <DocumentPreview />
            </motion.div>
        </div>
    );
};

export default CabinetConstructor;
