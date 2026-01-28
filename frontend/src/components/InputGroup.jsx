import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputGroup = ({ label, type, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className="relative mb-6">
            <motion.label
                initial={{ y: 0, scale: 1, color: "#9ca3af" }}
                animate={{
                    y: isFocused || value ? -28 : 0,
                    scale: isFocused || value ? 0.85 : 1,
                    color: isFocused ? "#D4AF37" : "#9ca3af",
                    x: isFocused || value ? -10 : 0
                }}
                className="absolute left-4 top-3 pointer-events-none origin-left transition-colors"
            >
                {label}
            </motion.label>

            <motion.input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                animate={{
                    borderColor: isFocused ? "#D4AF37" : "rgba(255,255,255,0.1)",
                    boxShadow: isFocused ? "0 0 15px rgba(212, 175, 55, 0.15)" : "none"
                }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

export default InputGroup;
