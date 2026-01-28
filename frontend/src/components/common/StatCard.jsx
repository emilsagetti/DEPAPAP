import React from 'react';

const StatCard = ({ title, value, subtext, icon, trend, delay = 0 }) => {
    return (
        <div
            className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-premium duration-500 animate-scale-in opacity-0"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#06B6D4]/10 rounded-full blur-2xl group-hover:bg-[#06B6D4]/20 transition-colors duration-500"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h3 className="text-white/50 text-xs font-semibold mb-2 uppercase tracking-widest">{title}</h3>
                    <div className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-[#06B6D4] transition-colors duration-300">{value}</div>
                    {subtext && <div className="text-sm text-white/40">{subtext}</div>}
                    {trend && (
                        <div className={`text-xs mt-3 flex items-center gap-1 font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/5">
                                {trend === 'up' ? '↗ +12%' : '↘ -5%'}
                            </span>
                            <span className="opacity-70">за прошлый месяц</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-[#06B6D4] group-hover:scale-110 group-hover:rotate-3 transition-premium duration-500 group-hover:bg-[#06B6D4]/20 group-hover:text-white shadow-lg">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
