import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, FileText, Clock, Check, X,
    User, Building2, Award, ChevronRight,
    Eye, CheckCircle2, XCircle, AlertCircle,
    Scale, ShieldCheck
} from 'lucide-react';

const AdminLawyerVerification = () => {
    const [selectedLawyer, setSelectedLawyer] = useState(null);

    // Mock pending verifications
    const pendingLawyers = [
        {
            id: 1,
            name: 'Алексей Смирнов',
            email: 'smirnov@lawyer.ru',
            phone: '+7 (495) 111-22-33',
            specialty: 'Корпоративное право',
            experience: '8 лет',
            education: 'МГУ им. Ломоносова, юридический факультет',
            licenseNumber: 'АД-123456',
            submittedAt: '2 часа назад',
            documents: [
                { name: 'Диплом.pdf', size: '2.3 MB' },
                { name: 'Лицензия.pdf', size: '1.1 MB' },
                { name: 'Паспорт.pdf', size: '890 KB' },
            ],
            status: 'pending'
        },
        {
            id: 2,
            name: 'Елена Козлова',
            email: 'kozlova@law.ru',
            phone: '+7 (495) 222-33-44',
            specialty: 'Семейное право',
            experience: '5 лет',
            education: 'МГЮА, юридический факультет',
            licenseNumber: 'АД-789012',
            submittedAt: '5 часов назад',
            documents: [
                { name: 'Диплом.pdf', size: '1.8 MB' },
                { name: 'Лицензия.pdf', size: '950 KB' },
            ],
            status: 'pending'
        },
        {
            id: 3,
            name: 'Дмитрий Волков',
            email: 'volkov@legal.ru',
            phone: '+7 (495) 333-44-55',
            specialty: 'Уголовное право',
            experience: '12 лет',
            education: 'СПбГУ, юридический факультет',
            licenseNumber: 'АД-345678',
            submittedAt: '1 день назад',
            documents: [
                { name: 'Диплом.pdf', size: '2.0 MB' },
                { name: 'Лицензия.pdf', size: '1.3 MB' },
                { name: 'Паспорт.pdf', size: '780 KB' },
                { name: 'Рекомендации.pdf', size: '450 KB' },
            ],
            status: 'pending'
        },
    ];

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Верификация юристов</h1>
                    <p className="text-slate-400">{pendingLawyers.length} заявок ожидают проверки</p>
                </div>
            </div>

            <div className="flex gap-8 flex-1 overflow-hidden">
                {/* List Panel */}
                <div className="w-[400px] flex flex-col gap-4">
                    <div className="bg-[#1E293B]/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex-1 flex flex-col">
                        <div className="p-4 border-b border-white/5 bg-[#0F172A]/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    className="w-full bg-[#1E293B] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/50 transition-colors"
                                    placeholder="Поиск заявки..."
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto custom-scrollbar p-2 space-y-2 flex-1">
                            {pendingLawyers.map((lawyer, index) => (
                                <motion.button
                                    key={lawyer.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedLawyer(lawyer)}
                                    layout
                                    className={`w-full flex items-center gap-4 p-4 text-left rounded-2xl transition-all border
                                        ${selectedLawyer?.id === lawyer.id
                                            ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                                            : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg
                                        ${selectedLawyer?.id === lawyer.id
                                            ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                                            : 'bg-[#1E293B] border border-white/5'}
                                    `}>
                                        {lawyer.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-bold transition-colors ${selectedLawyer?.id === lawyer.id ? 'text-white' : 'text-slate-300'}`}>
                                            {lawyer.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 truncate">{lawyer.specialty}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 justify-end bg-black/20 px-1.5 py-0.5 rounded">
                                            {lawyer.submittedAt}
                                        </span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {selectedLawyer ? (
                            <motion.div
                                key={selectedLawyer.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="h-full bg-[#1E293B]/60 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-col overflow-hidden"
                            >
                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                    {/* Header Info */}
                                    <div className="flex items-start gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-amber-500/20">
                                            {selectedLawyer.name[0]}
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                                                <ShieldCheck size={14} />
                                                Кандидат
                                            </div>
                                            <h2 className="text-3xl font-bold text-white mb-1">{selectedLawyer.name}</h2>
                                            <p className="text-slate-400 text-lg">{selectedLawyer.specialty}</p>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                                <User size={14} /> Email
                                            </div>
                                            <div className="text-slate-200 font-medium">{selectedLawyer.email}</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                                <Clock size={14} /> Опыт
                                            </div>
                                            <div className="text-slate-200 font-medium">{selectedLawyer.experience}</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 col-span-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                                <Building2 size={14} /> Образование
                                            </div>
                                            <div className="text-slate-200 font-medium">{selectedLawyer.education}</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 col-span-2">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                                                <Award size={14} /> Лицензия
                                            </div>
                                            <div className="text-slate-200 font-mono tracking-wide">{selectedLawyer.licenseNumber}</div>
                                        </div>
                                    </div>

                                    {/* Documents */}
                                    <div className="mb-8">
                                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                            <FileText className="text-amber-500" size={20} />
                                            Приложенные документы
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedLawyer.documents.map((doc, i) => (
                                                <div key={i} className="group relative flex items-center justify-between p-4 bg-[#0F172A]/50 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors overflow-hidden">
                                                    <div className="flex items-center gap-3 relative z-10">
                                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-200 group-hover:text-white">{doc.name}</div>
                                                            <div className="text-xs text-slate-500">{doc.size}</div>
                                                        </div>
                                                    </div>
                                                    <button className="p-2 bg-white/5 hover:bg-amber-500 text-slate-400 hover:text-white rounded-lg transition-all relative z-10">
                                                        <Eye size={18} />
                                                    </button>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-6 border-t border-white/5 flex gap-4 shrink-0">
                                    <button className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 font-bold rounded-2xl border border-red-500/20 transition-all flex items-center justify-center gap-2 group">
                                        <XCircle size={20} className="group-hover:scale-110 transition-transform" />
                                        Отклонить заявку
                                    </button>
                                    <button className="flex-[2] py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-900/40 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2">
                                        <CheckCircle2 size={20} />
                                        Верифицировать юриста
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full bg-[#1E293B]/30 border border-white/5 rounded-3xl border-dashed flex flex-col items-center justify-center text-slate-600"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <Scale size={40} className="opacity-50" />
                                </div>
                                <p className="text-lg font-medium">Выберите заявку юриста</p>
                                <p className="text-sm opacity-60">Детальная информация отобразится здесь</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminLawyerVerification;
