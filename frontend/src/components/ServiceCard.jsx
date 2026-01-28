import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, price, features, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 border border-slate-100 hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-depa-cta rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Icon */}
            <div className="mb-6 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <Icon strokeWidth={1.5} size={28} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>

            <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Стоимость услуг</p>
                <p className="text-2xl font-bold text-slate-800">{price}</p>
            </div>

            {/* Feature List */}
            <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="text-blue-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300 group-hover:bg-blue-50">
                Подробнее
            </button>
        </motion.div>
    );
};

export default ServiceCard;
