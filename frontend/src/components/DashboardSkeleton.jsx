import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-pulse">
            {/* Widget 1: Welcome Card (Large) */}
            <div className="md:col-span-2 bg-gray-200 rounded-[32px] p-8 h-48">
                <div className="h-8 bg-gray-300 rounded-full w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-full w-3/4"></div>
            </div>

            {/* Widget 2: Stats Card (Small Square) */}
            <div className="bg-gray-200 rounded-[32px] p-6 h-48">
                <div className="h-4 bg-gray-300 rounded-full w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded-full w-1/3"></div>
            </div>

            {/* Widget 3: Action Card */}
            <div className="bg-gray-200 rounded-[32px] p-8 h-32 md:col-span-3">
                <div className="h-6 bg-gray-300 rounded-full w-1/4 mb-2"></div>
            </div>

            {/* Orders List Skeleton */}
            <div className="md:col-span-3 mt-6">
                <div className="h-6 bg-gray-200 rounded-full w-1/6 mb-4"></div>

                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100 h-24 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10"></div>
                        <div className="w-full">
                            <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;
