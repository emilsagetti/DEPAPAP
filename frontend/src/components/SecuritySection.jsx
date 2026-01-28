import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, Shield } from 'lucide-react';

const securityPillars = [
    {
        icon: ShieldCheck,
        title: "Банковский уровень защиты",
        description: "Шифрование AES-256, защищенные серверы на территории РФ и двухфакторная аутентификация для входа в кабинет.",
        highlight: false
    },
    {
        icon: Lock,
        title: "Режим коммерческой тайны",
        description: "Все загруженные документы и переписка в чате защищены NDA (Соглашением о неразглашении) с момента регистрации.",
        highlight: false
    },
    {
        icon: EyeOff,
        title: "Конфиденциальность обращения",
        description: "Мы гарантируем тайну самого факта вашего обращения. Никто не узнает, что вы консультировались с нами.",
        highlight: true // Premium differentiator
    }
];

const SecurityCard = ({ icon: Icon, title, description, highlight, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={`relative group p-8 rounded-2xl backdrop-blur-2xl transition-all duration-500 overflow-hidden ${highlight
            ? 'bg-gradient-to-b from-[#06B6D4]/[0.05] to-transparent border border-[#06B6D4]/20 shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]'
            : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/10 hover:shadow-lg'
            }`}
    >
        {/* Glass Glare */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>

        {/* Highlight Gradient Blob */}
        {highlight && (
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#06B6D4]/10 rounded-full blur-[40px] pointer-events-none"></div>
        )}

        {/* Icon */}
        <div className="relative mb-6">
            <div className={`absolute inset-0 blur-xl opacity-40 ${highlight ? 'bg-[#06B6D4]' : 'bg-white/20'}`}></div>
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-sm ${highlight
                ? 'bg-[#06B6D4]/10 border-[#06B6D4]/20 text-[#06B6D4]'
                : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                <Icon size={28} strokeWidth={1.5} />
            </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className={`leading-relaxed text-sm ${highlight ? 'text-cyan-100/70' : 'text-slate-400'}`}>
            {description}
        </p>

        {/* Premium Badge for Highlight */}
        {highlight && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_10px_-3px_rgba(6,182,212,0.3)]">
                <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#06B6D4]">Premium</span>
            </div>
        )}
    </motion.div>
);

const SecuritySection = () => {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#023A55]/20 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-sm font-medium text-slate-300 mb-6 shadow-sm">
                        <ShieldCheck size={16} className="text-[#06B6D4]" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Безопасность уровня Enterprise</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ваши данные и репутация <br className="hidden md:block" />
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#22D3EE]">
                            под надежной защитой
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-[#06B6D4]/20 blur-xl rounded-full"></div>
                        </span>
                    </h2>

                    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Безопасность — наш фундамент. Мы храним ваши секреты надежнее, чем швейцарский банк.
                    </p>
                </motion.div>

                {/* Security Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {securityPillars.map((pillar, i) => (
                        <SecurityCard key={pillar.title} {...pillar} delay={i * 0.1} />
                    ))}
                </div>

                {/* Bottom Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm font-medium"
                >
                    <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]"></div>
                        <span className="group-hover:text-slate-300 transition-colors">ISO 27001 Сертификация</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]"></div>
                        <span className="group-hover:text-slate-300 transition-colors">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]"></div>
                        <span className="group-hover:text-slate-300 transition-colors">152-ФЗ (Персональные данные)</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SecuritySection;
