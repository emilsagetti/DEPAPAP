import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Clock, Award } from "lucide-react";
import { Link } from 'react-router-dom';

const TrustSection = () => {
  return (
    <section className="relative py-20 bg-transparent overflow-hidden">

      {/* 1. BACKGROUND ORBS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#023A55]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* 2. THE MAIN GLASS PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            relative rounded-3xl p-8 md:p-16
            bg-white/[0.03]
            backdrop-blur-2xl 
            border border-white/[0.08]
            shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]
            overflow-hidden
          "
        >
          {/* Glass Glare */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>


          {/* GRID CONTENT */}
          <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.05] rounded-full border border-white/10 backdrop-blur-md mb-6 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Надежность</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Почему нам доверяют <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  500+ компаний
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                Мы объединили лучшие практики классического консалтинга с современными IT-решениями.
                Наши процессы автоматизированы там, где это ускоряет работу, и персонализированы там, где нужен экспертный подход.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Clock size={16} />
                    <span className="text-xs uppercase tracking-wider font-semibold">Скорость</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 tabular-nums">2 часа</div>
                  <div className="text-sm text-slate-500">Среднее время ответа юриста</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Award size={16} />
                    <span className="text-xs uppercase tracking-wider font-semibold">Результат</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 tabular-nums">98%</div>
                  <div className="text-sm text-slate-500">Выигранных споров и дел</div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#023A55] to-[#06B6D4] text-white font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-0.5"
                >
                  Получить консультацию
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Right: Visual Element (Floating Card) */}
            <div className="relative h-full min-h-[400px] flex items-center justify-center">
              {/* Background Glow for Card */}
              <div className="absolute w-64 h-64 bg-[#06B6D4]/20 rounded-full blur-[80px]"></div>

              {/* Abstract Floating Element */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [-12, 12],
                  rotate: [1, -1],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5,
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.8 }
                }}
                style={{ willChange: 'transform' }}
                className="relative p-6 rounded-2xl bg-[#050B14] border border-white/10 shadow-2xl max-w-sm w-full group hover:border-[#06B6D4]/30 transition-colors"
              >
                {/* Decorative Elements on Card */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/[0.05] rounded-full blur-md border border-white/5"></div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-[#023A55]/30 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                        <Check size={24} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg leading-tight">Договор<br />согласован</div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Только что • DEPA AI
                        </div>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-500 border border-white/5">
                      #8291
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Проверка рисков</span>
                      <span className="text-[#10B981] font-bold">100%</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-500">Юридически значимый документ</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
