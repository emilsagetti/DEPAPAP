import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const AppBootstrap = ({ children }) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#050B14] z-[9999] flex flex-col items-center justify-center">
                <div className="animate-pulse">
                    <Logo asLink={false} className="h-16 w-auto" />
                </div>
                <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#06B6D4]/30 border-t-[#06B6D4] animate-spin"></div>
                    <p className="text-[#06B6D4]/60 text-sm font-medium">Загрузка...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AppBootstrap;
