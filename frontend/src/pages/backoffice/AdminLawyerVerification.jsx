import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, FileText, Clock, Check, X,
    User, Building2, Award, ChevronRight,
    Eye, CheckCircle, XCircle, AlertCircle
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
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Верификация юристов</h1>
                    <p className="text-slate-500">{pendingLawyers.length} заявок ожидают проверки</p>
                </div>
            </div>

            <div className="flex gap-6">
                {/* List */}
                <div className="w-1/2">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {pendingLawyers.map((lawyer, index) => (
                                <motion.button
                                    key={lawyer.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedLawyer(lawyer)}
                                    className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${selectedLawyer?.id === lawyer.id
                                            ? 'bg-blue-50 border-l-4 border-blue-600'
                                            : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold">
                                        {lawyer.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900">{lawyer.name}</h3>
                                        <p className="text-sm text-slate-500">{lawyer.specialty}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            {lawyer.submittedAt}
                                        </span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-400" />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="w-1/2">
                    {selectedLawyer ? (
                        <motion.div
                            key={selectedLawyer.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-slate-200 p-6"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {selectedLawyer.name[0]}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedLawyer.name}</h2>
                                    <p className="text-slate-500">{selectedLawyer.specialty}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <User size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Email</p>
                                        <p className="text-sm font-medium">{selectedLawyer.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Award size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Опыт работы</p>
                                        <p className="text-sm font-medium">{selectedLawyer.experience}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Building2 size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Образование</p>
                                        <p className="text-sm font-medium">{selectedLawyer.education}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <FileText size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-400">Номер лицензии</p>
                                        <p className="text-sm font-medium">{selectedLawyer.licenseNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-slate-900 mb-3">Документы</h4>
                                <div className="space-y-2">
                                    {selectedLawyer.documents.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <FileText size={18} className="text-red-500" />
                                                <span className="text-sm font-medium">{doc.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-400">{doc.size}</span>
                                                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                                                    <Eye size={16} className="text-slate-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-xl transition-colors">
                                    <XCircle size={18} />
                                    Отклонить
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors">
                                    <CheckCircle size={18} />
                                    Подтвердить
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center h-full">
                            <AlertCircle size={48} className="text-slate-300 mb-4" />
                            <p className="text-slate-500">Выберите заявку для просмотра</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLawyerVerification;
