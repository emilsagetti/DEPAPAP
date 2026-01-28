import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

const Hero = () => {
    return (
        <section className="relative bg-white pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-5xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6"
                        >
                            Юридическая защита <span className="text-accent">нового времени</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg lg:text-xl text-secondary mb-10 leading-relaxed"
                        >
                            Мы объединили опыт лучших юристов и современные технологии,
                            чтобы вы могли сосредоточиться на бизнесе, а не на проблемах.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="#consultation"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                Получить консультацию
                            </a>
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary bg-gray-50 rounded-full hover:bg-gray-100 transition-all duration-300"
                            >
                                Наши услуги
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* 3D Scene */}
                    <div className="relative h-[500px] w-full hidden lg:block">
                        <Scene3D />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
