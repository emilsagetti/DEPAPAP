import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * Animated counter that counts up from 0 to target value
 */
const AnimatedCounter = ({ value, duration = 1.5, prefix = '', suffix = '', className = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Parse value to number (handle strings with commas, currency symbols, etc.)
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0
        : value;

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function (ease out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);

            setDisplayValue(Math.floor(numericValue * eased));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setDisplayValue(numericValue);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [numericValue, duration]);

    // Format the number with thousand separators
    const formatNumber = (num) => {
        return new Intl.NumberFormat('ru-RU').format(num);
    };

    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {prefix}{formatNumber(displayValue)}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
