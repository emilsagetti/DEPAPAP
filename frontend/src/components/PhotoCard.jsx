import React from 'react';
import { motion } from 'framer-motion';

const PhotoCard = ({ image, title, description, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className="relative group h-[420px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
        >
            <motion.div
                className="absolute inset-0 w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            <motion.div
                className="absolute bottom-0 left-0 p-8 w-full"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <h3 className="text-2xl text-white mb-3 border-l-4 border-gold-500 pl-4">
                    {title}
                </h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed pl-4 border-l-4 border-transparent">
                    {description}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default PhotoCard;
