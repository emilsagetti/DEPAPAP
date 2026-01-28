import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Logo = ({ asLink = true, collapsed = false, light = false, className }) => {
    const logoContent = (
        <div className={twMerge("flex items-center overflow-hidden cursor-pointer px-4", className?.includes('block') ? 'block' : '')}>
            <AnimatePresence mode="wait">
                {collapsed ? (
                    // Collapsed: show only "D" letter
                    <motion.div
                        key="logo-collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="flex items-center justify-center"
                    >
                        <span className={`text-2xl font-bold ${light ? 'text-white' : 'text-depa-brand'}`}>
                            D
                        </span>
                    </motion.div>
                ) : (
                    // Expanded: show full logo image
                    <motion.img
                        key="logo-full"
                        src="/logo-depa-fixed.png"
                        alt="Depa"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className={twMerge(
                            "h-10 w-auto object-contain max-w-none",
                            className
                        )}
                    />
                )}
            </AnimatePresence>
        </div>
    );

    if (asLink) {
        return <Link to="/">{logoContent}</Link>;
    }

    return logoContent;
};

export default Logo;
