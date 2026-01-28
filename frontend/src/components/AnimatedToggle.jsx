import React from 'react';
import { motion } from 'framer-motion';

const AnimatedToggle = ({ enabled, onChange, size = 'md' }) => {
    const sizes = {
        sm: { track: 'h-5 w-9', xOn: 18, xOff: 3 },
        md: { track: 'h-6 w-11', xOn: 24, xOff: 4 },
        lg: { track: 'h-7 w-14', xOn: 32, xOff: 5 }
    };

    const s = sizes[size] || sizes.md;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange?.(!enabled)}
            className={`relative inline-flex ${s.track} items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${enabled ? 'bg-depa-cta' : 'bg-slate-300'
                }`}
        >
            <motion.span
                animate={{ x: enabled ? s.xOn : s.xOff }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                className="absolute h-4 w-4 bg-white rounded-full shadow-sm"
            />
        </button>
    );
};

export default AnimatedToggle;
