import React from 'react';
import { motion } from 'framer-motion';

const BlogFilters = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-10 max-w-4xl mx-auto">

            {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                relative px-6 py-3 rounded-full text-sm font-bold transition-colors duration-200
                border
                ${isActive
                                ? 'text-[#0F2837] border-transparent' // Active: Dark text, No border (White Blob handles bg)
                                : 'text-[#9EACB7] border-white/10 bg-white/5 hover:border-white/20 hover:text-white' // Inactive: Glass
                            }
            `}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {/* 1. TEXT LAYER (Always on top) */}
                        <span className="relative z-10">{cat}</span>

                        {/* 2. ACTIVE BLOB LAYER (The Liquid Pill) */}
                        {isActive && (
                            <motion.div
                                layoutId="activeBlob"
                                className="absolute inset-0 bg-white rounded-full z-0"
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            />
                        )}
                    </button>
                );
            })}

        </div>
    );
};

export default BlogFilters;
