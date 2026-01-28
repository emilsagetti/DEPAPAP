import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';
import PaymentModal from '../../components/PaymentModal';

const NewAuditRequest = () => {
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [file, setFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/rtf'
    ];

    const handleFile = (selectedFile) => {
        setErrorMsg('');
        if (!selectedFile) return;

        // 1. Strict Validation
        if (!allowedTypes.includes(selectedFile.type)) {
            setErrorMsg('Неверный формат. Загрузите PDF или Word.');
            return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
            setErrorMsg('Файл слишком большой (макс. 10 МБ).');
            return;
        }

        setFile(selectedFile);
        setStatus('uploading');

        // Simulate Upload & Pre-check (3 seconds)
        setTimeout(() => {
            setStatus('success');
        }, 3000);
    };

    // --- Animation: Shuffling Documents (Slower) ---
    const ShufflingDeck = () => {
        return (
            <div className="relative w-24 h-32 mb-10">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md"
                        initial={{ y: index * 6, scale: 1 - (index * 0.05), opacity: 1 - (index * 0.3) }}
                        animate={{
                            y: [index * 6, (index * 6) - 10, index * 6],
                            scale: [1 - (index * 0.05), 1, 1 - (index * 0.05)],
                            zIndex: [3 - index, 4, 3 - index],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 1.3
                        }}
                    >
                        <FileText className="text-[#06B6D4] opacity-80" size={32} />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto pt-10 px-4 relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Аудит договора</h1>
                <p className="text-[#9EACB7] max-w-md mx-auto">
                    Загрузите документ. Профессиональный юрист проверит риски и пришлет отчет в течение 3 часов.
                </p>
            </div>

            {/* Main Glass Container (Deep Blue, NOT Grey) */}
            <motion.div
                layout
                className="relative z-10 w-full min-h-[450px] bg-[#0F2837]/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col justify-center"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <AnimatePresence mode="wait">

                    {/* --- IDLE STATE --- */}
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center p-10 w-full h-full cursor-pointer group"
                            onClick={() => inputRef.current.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                        >
                            <input ref={inputRef} type="file" className="hidden" onChange={(e) => handleFile(e.target.files[0])} accept=".pdf,.doc,.docx,.txt,.rtf" />

                            {/* Error Message */}
                            {errorMsg && (
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/50 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                                    <AlertCircle size={16} /> {errorMsg}
                                </div>
                            )}

                            {/* Icon */}
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-8 border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#06B6D4] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                                <CloudUpload className="text-white relative z-10" size={40} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Нажмите или перетащите</h3>
                            <p className="text-[#9EACB7]">PDF, DOCX или TXT</p>
                        </motion.div>
                    )}

                    {/* --- UPLOADING STATE --- */}
                    {status === 'uploading' && (
                        <motion.div
                            key="uploading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center p-10 w-full h-full"
                        >
                            <ShufflingDeck />

                            <h3 className="text-white font-bold text-xl mb-2 tracking-wide uppercase">Загрузка файла...</h3>
                            <p className="text-[#9EACB7] text-sm mb-8">Подготовка к передаче юристу</p>

                            {/* Progress Bar */}
                            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#06B6D4] shadow-[0_0_15px_#06B6D4]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* --- SUCCESS STATE --- */}
                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col justify-center p-10 w-full h-full"
                        >
                            <div className="flex items-center gap-6 mb-10 bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 flex items-center justify-center text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl mb-1">{file?.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[#9EACB7] text-sm">Файл принят</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <p className="text-[#9EACB7] text-xs uppercase tracking-wider mb-2">Стоимость аудита</p>
                                    <div className="text-4xl font-bold text-white">5 000 ₽</div>
                                </div>
                                <button
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    className="w-full md:w-auto px-10 py-4 bg-[#06B6D4] hover:bg-[#0891a9] text-[#0F2837] font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/30 text-lg"
                                >
                                    Оплатить работу
                                </button>
                            </div>

                            <button
                                onClick={() => { setStatus('idle'); setFile(null); }}
                                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors p-2"
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>

            {/* Payment Modal Integration */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={() => navigate('/dashboard')}
                planName="Аудит договора"
                amount="5 000 ₽"
            />
        </div >
    );
};

export default NewAuditRequest;
