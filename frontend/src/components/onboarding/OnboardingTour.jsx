import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

const OnboardingTour = ({
    run = true,
    steps = [],
    onComplete,
    onSkip,
    storageKey = 'depa_onboarding_v4' // Changed key to force reset v4
}) => {
    // Check local storage
    const [isActive, setIsActive] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [tooltipPosition, setTooltipPosition] = useState('bottom'); // 'bottom', 'top', 'left', 'right'

    useEffect(() => {
        const hasCompleted = localStorage.getItem(storageKey);

        if (run && !hasCompleted && steps.length > 0) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                setIsActive(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [run, steps, storageKey]);

    // Manual start listener
    useEffect(() => {
        const handleStart = () => {
            console.log('[OnboardingTour] Manual start triggered');
            setIsActive(true);
            setCurrentStepIndex(0);
        };
        window.addEventListener('start-onboarding-tour', handleStart);
        return () => window.removeEventListener('start-onboarding-tour', handleStart);
    }, []);

    // Update coordinates when step changes
    useEffect(() => {
        if (!isActive) return;

        const updatePosition = () => {
            const step = steps[currentStepIndex];
            if (!step) return;

            const element = document.querySelector(step.target);
            if (element) {
                const rect = element.getBoundingClientRect();
                setCoords({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                    radius: getComputedStyle(element).borderRadius
                });

                // Calculate best tooltip position
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;

                if (spaceBelow > 200) {
                    setTooltipPosition('bottom');
                } else if (spaceAbove > 200) {
                    setTooltipPosition('top');
                } else {
                    setTooltipPosition('center');
                }
            } else {
                // Element not found - maybe skip or position center?
                console.warn(`Onboarding target not found: ${step.target}`);
            }
        };

        updatePosition();

        // Update on resize/scroll
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isActive, currentStepIndex, steps]);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(curr => curr + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        setIsActive(false);
        localStorage.setItem(storageKey, 'true');
        if (onComplete) onComplete();
    };

    const handleSkip = () => {
        setIsActive(false);
        localStorage.setItem(storageKey, 'true');
        if (onSkip) onSkip();
    };

    if (!isActive) return null;

    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex === steps.length - 1;

    // Overlay using SVG mask to create a "hole"
    return createPortal(
        <div className="fixed inset-0 z-[99999]"> {/* pointer-events-auto by default which blocks everything behind */}
            {/* SVG Mask Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
            >
                <svg width="100%" height="100%" className="w-full h-full">
                    <defs>
                        <mask id="tour-mask" x="0" y="0" width="100%" height="100%">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <motion.rect
                                animate={{
                                    x: coords.x - 10,
                                    y: coords.y - 10,
                                    width: coords.width + 20,
                                    height: coords.height + 20,
                                    rx: 16 // Hardcoded radius for now, or parse from coords.radius
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                fill="black"
                            />
                        </mask>
                    </defs>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="rgba(5, 11, 20, 0.75)"
                        mask="url(#tour-mask)"
                        style={{ backdropFilter: 'blur(4px)' }}
                    />

                    {/* Click Blocker */}
                    <motion.rect
                        animate={{
                            x: coords.x - 10,
                            y: coords.y - 10,
                            width: coords.width + 20,
                            height: coords.height + 20,
                            rx: 16
                        }}
                        fill="transparent"
                        style={{ pointerEvents: 'auto', cursor: 'default' }}
                    />

                    {/* Glowing border around hole */}
                    <motion.rect
                        animate={{
                            x: coords.x - 10,
                            y: coords.y - 10,
                            width: coords.width + 20,
                            height: coords.height + 20,
                            rx: 16
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        fill="transparent"
                        stroke="#06B6D4"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        strokeOpacity="0.5"
                    />
                </svg>
            </motion.div>

            {/* Tooltip Card - Pointer events enabled here */}
            <motion.div
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    top: tooltipPosition === 'bottom' ? coords.y + coords.height + 24 : 'auto',
                    bottom: tooltipPosition === 'top' ? window.innerHeight - coords.y + 24 : 'auto',
                    left: Math.min(Math.max(20, coords.x + coords.width / 2 - 160), window.innerWidth - 340), // Center horizontally but keep within screen
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute pointer-events-auto w-[320px] bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6"
                style={{
                    position: 'absolute',
                    // Fallback positioning logic handled in animate prop
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleSkip}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Content */}
                <div className="mb-6 min-h-[80px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepIndex}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                {currentStep.title}
                                {currentStep.icon && <currentStep.icon size={18} className="text-[#06B6D4]" />}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {currentStep.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer / Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStepIndex ? 'w-6 bg-[#06B6D4]' : 'w-1.5 bg-slate-600'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg
                            ${isLastStep
                                ? 'bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white hover:shadow-[#06B6D4]/40 hover:scale-105'
                                : 'bg-white text-slate-900 hover:bg-slate-100'}
                        `}
                    >
                        {isLastStep ? 'Начать работу' : 'Далее'}
                        {isLastStep ? <Check size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

export default OnboardingTour;
