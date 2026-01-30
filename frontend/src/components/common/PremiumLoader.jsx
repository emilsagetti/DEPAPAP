import React from 'react';
import { motion } from 'framer-motion';

const PremiumLoader = ({ size = 'md', text = 'Загрузка...', fullScreen = false }) => {

    const LoaderContent = () => (
        <div className="flex flex-col items-center justify-center gap-8 relative z-50">
            {/* Main visual container */}
            <div className="relative w-24 h-24 flex items-center justify-center">

                {/* 1. Background Blur Glow */}
                <div className="absolute inset-0 bg-[#06B6D4] opacity-20 blur-xl rounded-full animate-pulse"></div>

                {/* 2. Outer Rotating Ring (Cyan) */}
                <div className="absolute inset-0 rounded-full border border-[#06B6D4]/30 border-t-[#06B6D4] animate-spin" style={{ animationDuration: '3s' }}></div>

                {/* 3. Middle Rotating Ring (Purple) - Reverse */}
                <div className="absolute inset-3 rounded-full border border-[#8B5CF6]/30 border-b-[#8B5CF6] animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>

                {/* 4. Inner Ring (White) */}
                <div className="absolute inset-6 rounded-full border border-white/10 border-r-white/50 animate-spin" style={{ animationDuration: '1.5s' }}></div>

                {/* 5. Center Logo/Icon Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping" />
                </div>
            </div>

            {/* Text with Gradient */}
            {text && (
                <div className="flex flex-col items-center gap-3">
                    <span className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
                        {text}
                    </span>
                    {/* Progress Bar Line */}
                    <div className="w-24 h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] w-full animate-[shimmer_2s_infinite] -translate-x-full"
                            style={{ animation: 'shimmer 2s infinite linear' }}
                        />
                        <style>{`
                            @keyframes shimmer {
                                0% { transform: translateX(-100%); }
                                100% { transform: translateX(100%); }
                            }
                        `}</style>
                    </div>
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050B14]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />

                {/* Ambient Light */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <LoaderContent />
            </div>
        );
    }

    return <LoaderContent />;
};

export default PremiumLoader;
