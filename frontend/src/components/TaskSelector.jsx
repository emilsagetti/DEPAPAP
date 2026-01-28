import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskSelector = () => {
    const [activeType, setActiveType] = useState('legal');

    const tabs = [
        { id: 'legal', label: 'Юридический' },
        { id: 'finance', label: 'Финансы' },
        { id: 'consulting', label: 'Консалтинг' }
    ];

    const contentVariants = {
        hidden: { opacity: 0, x: -20, filter: 'blur(10px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: 20, filter: 'blur(10px)' }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-10">
            {/* Tabs */}
            <div className="flex bg-black/40 p-1 rounded-full mb-8 backdrop-blur-md border border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveType(tab.id)}
                        className={`relative flex-1 py-3 text-sm font-medium uppercase tracking-wider transition-colors z-10 ${activeType === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {activeType === tab.id && (
                            <motion.div
                                layoutId="activeTaskTab"
                                className="absolute inset-0 bg-gold-500 rounded-full -z-10 shadow-lg shadow-gold-500/30"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[300px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeType}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                    >
                        <h3 className="text-2xl text-gold-400 mb-4 capitalize">
                            {tabs.find(t => t.id === activeType)?.label}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {activeType === 'legal' && "Автоматизированная подготовка исковых заявлений и анализ судебной практики."}
                            {activeType === 'finance' && "Управление активами, налоговый аудит и финансовое моделирование рисков."}
                            {activeType === 'consulting' && "Стратегическое планирование и кризис-менеджмент для вашего бизнеса."}
                        </p>

                        {/* Fake Form Lines to simulate content */}
                        <div className="mt-6 space-y-4">
                            <div className="h-2 bg-white/10 rounded w-3/4" />
                            <div className="h-2 bg-white/10 rounded w-1/2" />
                            <div className="h-2 bg-white/10 rounded w-full" />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskSelector;
